import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../server.js';
import Task from '../../../models/taskModel.js';
import User from '../../../models/userModel.js';
import mongoose from 'mongoose';

describe('POST /api/tasks', () => {
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
	});

	afterEach(async () => {
		await Task.deleteMany({});
		await User.deleteMany({});
	});

	it('should create a new task', async () => {
		const taskData = {
			title: 'New Task',
			description: 'Task Description',
			status: 'TODO',
			priority: 'MEDIUM',
		};

		const response = await request(app)
			.post('/api/tasks')
			.set('Authorization', `Bearer ${token}`)
			.send(taskData)
			.expect(201);

		expect(response.body.success).toBe(true);
		expect(response.body.data.title).toBe(taskData.title);
		expect(response.body.data.description).toBe(taskData.description);
		expect(response.body.data.status).toBe(taskData.status);
		expect(response.body.data.user.toString()).toBe(user._id.toString());

		const savedTask = await Task.findById(response.body.data._id);
		expect(savedTask).toBeTruthy();
		expect(savedTask.title).toBe(taskData.title);
	});

	it('should return 400 for invalid task data', async () => {
		const taskData = {
			description: 'Missing title field',
			status: 'INVALID_STATUS',
		};

		const response = await request(app)
			.post('/api/tasks')
			.set('Authorization', `Bearer ${token}`)
			.send(taskData)
			.expect(400);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBeTruthy();
	});
});
