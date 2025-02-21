import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../../../../server.js';
import User from '../../../../models/userModel.js';
import { generateToken } from '../../../../util/auth.js';

describe('Authentication Integration Tests', () => {
	const mockUser = {
		username: 'testuser',
		email: 'test@example.com',
		password: 'Password123!',
		role: 'user',
	};

	const mockAdmin = {
		username: 'admin',
		email: 'admin@example.com',
		password: 'Admin123!',
		role: 'admin',
	};

	describe('POST /api/users/register', () => {
		it('should register a new user', async () => {
			const res = await request(app).post('/api/users/register').send(mockUser);
			expect(res.status).toBe(201);
			expect(res.body.user).toHaveProperty('username', mockUser.username);
			expect(res.body.user).not.toHaveProperty('password');
		});

		it('should not register user with existing email', async () => {
			await User.create(mockUser);
			const res = await request(app).post('/api/users/register').send(mockUser);
			expect(res.status).toBe(400);
		});
	});

	describe('POST /api/users/login', () => {
		beforeEach(async () => {
			await User.create(mockUser);
		});

		it('should login with valid credentials', async () => {
			const res = await request(app)
				.post('/api/users/login')
				.send({ email: mockUser.email, password: mockUser.password });
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('token');
			expect(res.body.user).toHaveProperty('email', mockUser.email);
		});

		it('should not login with invalid password', async () => {
			const res = await request(app)
				.post('/api/users/login')
				.send({ email: mockUser.email, password: 'wrongpassword' });
			expect(res.status).toBe(401);
		});
	});

	describe('Protected Routes', () => {
		let userToken, adminToken;

		beforeEach(async () => {
			const user = await User.create(mockUser);
			const admin = await User.create(mockAdmin);
			userToken = generateToken(user);
			adminToken = generateToken(admin);
		});

		describe('GET /api/users', () => {
			it('should allow admin to get all users', async () => {
				const res = await request(app)
					.get('/api/users')
					.set('Authorization', `Bearer ${adminToken}`);
				expect(res.status).toBe(200);
				expect(Array.isArray(res.body)).toBe(true);
			});

			it('should not allow regular user to get all users', async () => {
				const res = await request(app)
					.get('/api/users')
					.set('Authorization', `Bearer ${userToken}`);
				expect(res.status).toBe(403);
			});
		});

		describe('GET /api/users/:id', () => {
			it('should get user by id with valid token', async () => {
				const user = await User.create({
					...mockUser,
					email: 'another@example.com',
					username: 'another',
				});
				const res = await request(app)
					.get(`/api/users/${user._id}`)
					.set('Authorization', `Bearer ${userToken}`);
				expect(res.status).toBe(200);
				expect(res.body).toHaveProperty('username', 'another');
			});

			it('should not get user without token', async () => {
				const user = await User.create({
					...mockUser,
					email: 'another@example.com',
					username: 'another',
				});
				const res = await request(app).get(`/api/users/${user._id}`);
				expect(res.status).toBe(401);
			});
		});
	});
});
