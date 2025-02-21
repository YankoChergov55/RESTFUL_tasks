import app from '../../../server.js';
import request from 'supertest';
import User from '../../../models/userModel.js';

describe('user retrieval', () => {
	const testUser = {
		username: 'testuser',
		email: 'test@example.com',
		password: 'Test1234!',
	};

	describe('GET /api/users', () => {
		let adminToken;
		const adminUser = {
			username: 'admin',
			email: 'admin@test.com',
			password: 'Admin123!',
			role: 'admin',
		};

		beforeEach(async () => {
			// Create an admin user
			await request(app).post('/api/users/register').send(adminUser);
			// Login as admin
			const loginResponse = await request(app)
				.post('/api/users/login')
				.send({ email: adminUser.email, password: adminUser.password });
			adminToken = loginResponse.body.token;

			// Create a regular test user
			await request(app).post('/api/users/register').send(testUser);
		});

		it('should get all users when authenticated as admin', async () => {
			const response = await request(app)
				.get('/api/users')
				.set('Authorization', `Bearer ${adminToken}`);

			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toBeGreaterThanOrEqual(2); // Admin + test user
			const foundTestUser = response.body.find((user) => user.email === testUser.email);
			expect(foundTestUser.username).toBe(testUser.username);
			expect(foundTestUser.email).toBe(testUser.email);
			expect(foundTestUser.password).toBeUndefined();
		});

		it('should return 401 when not authenticated', async () => {
			const response = await request(app).get('/api/users');
			expect(response.status).toBe(401);
		});

		it('should return 403 when authenticated as non-admin user', async () => {
			// Login as regular user
			const loginResponse = await request(app)
				.post('/api/users/login')
				.send({ email: testUser.email, password: testUser.password });
			const userToken = loginResponse.body.token;

			const response = await request(app)
				.get('/api/users')
				.set('Authorization', `Bearer ${userToken}`);
			expect(response.status).toBe(403);
		});
	});

	it('should not allow access to other user profiles', async () => {
		// Create another user
		const otherUser = await request(app).post('/api/users/register').send({
			username: 'other',
			email: 'other@test.com',
			password: 'Other123!',
		});

		// Login as test user
		const loginResponse = await request(app)
			.post('/api/users/login')
			.send({ email: testUser.email, password: testUser.password });

		const userToken = loginResponse.body.token;

		// Try to access other user's profile
		const response = await request(app)
			.get(`/api/users/${otherUser.body._id}`)
			.set('Authorization', `Bearer ${userToken}`);

		expect(response.status).toBe(403);
	});
});
