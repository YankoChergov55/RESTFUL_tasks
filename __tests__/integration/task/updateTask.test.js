import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../server.js';
import Task from '../../../models/taskModel.js';
import User from '../../../models/userModel.js';
import mongoose from 'mongoose';

describe('PUT /api/tasks/:id', () => {
	let task;
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

		// Create a test task
		task = await Task.create({
			title: 'Original Task',
			description: 'Original description',
			status: 'TODO',
			priority: 'LOW',
			user: user._id,
		});
	});

	afterEach(async () => {
		await Task.deleteMany({});
		await User.deleteMany({});
	});

	it('should update an existing task', async () => {
		const updateData = {
			title: 'Updated Task',
			description: 'Updated description',
			status: 'IN_PROGRESS',
			priority: 'HIGH',
		};

		const response = await request(app)
			.put(`/api/tasks/${task._id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(updateData)
			.expect(200);

		expect(response.body.success).toBe(true);
		expect(response.body.data.title).toBe(updateData.title);
		expect(response.body.data.description).toBe(updateData.description);
		expect(response.body.data.status).toBe(updateData.status);
		expect(response.body.data.priority).toBe(updateData.priority);
		expect(response.body.data.user.toString()).toBe(user._id.toString());
	});

	it('should allow partial updates', async () => {
		const updateData = {
			title: 'Only Title Updated',
		};

		const response = await request(app)
			.put(`/api/tasks/${task._id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(updateData)
			.expect(200);

		expect(response.body.success).toBe(true);
		expect(response.body.data.title).toBe(updateData.title);
		expect(response.body.data.description).toBe(task.description);
		expect(response.body.data.status).toBe(task.status);
		expect(response.body.data.priority).toBe(task.priority);
		expect(response.body.data.user.toString()).toBe(user._id.toString());
	});

	it('should return 404 when updating non-existent task', async () => {
		const nonExistentId = new mongoose.Types.ObjectId();
		const updateData = {
			title: 'Updated Task',
		};

		const response = await request(app)
			.put(`/api/tasks/${nonExistentId}`)
			.set('Authorization', `Bearer ${token}`)
			.send(updateData)
			.expect(404);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBe('Task not found');
	});

	it('should return 401 if no authentication token is provided', async () => {
		const updateData = {
			title: 'Updated Task',
		};

		const response = await request(app).put(`/api/tasks/${task._id}`).send(updateData).expect(401);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBe('No token provided');
	});
});
