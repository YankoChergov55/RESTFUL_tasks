import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../server.js';
import Task from '../../../models/taskModel.js';
import User from '../../../models/userModel.js';
import mongoose from 'mongoose';

describe('GET /api/tasks', () => {
	let token;
	let user;

	beforeEach(async () => {
		// Create a test user directly
		user = await User.create({
			username: 'testuser',
			email: 'test@example.com',
			password: 'password123',
			name: 'Test User',
		});

		// Generate token directly
		token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

		// Create some test tasks
		await Task.create([
			{
				title: 'Task 1',
				description: 'Description 1',
				status: 'TODO',
				priority: 'LOW',
				user: user._id,
			},
			{
				title: 'Task 2',
				description: 'Description 2',
				status: 'IN_PROGRESS',
				priority: 'MEDIUM',
				user: user._id,
			},
		]);
	});

	afterEach(async () => {
		await Task.deleteMany({});
		await User.deleteMany({});
	});

	it('should get all tasks for the authenticated user', async () => {
		const response = await request(app)
			.get('/api/tasks')
			.set('Authorization', `Bearer ${token}`)
			.expect(200);

		expect(response.body.success).toBe(true);
		expect(response.body.data[0].user.toString()).toBe(user._id.toString());
		expect(response.body.data).toHaveLength(2);
	});

	it('should return 401 if no authentication token is provided', async () => {
		const response = await request(app).get('/api/tasks').expect(401);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBe('No token provided');
	});
});
