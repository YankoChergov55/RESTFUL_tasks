import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../server.js';
import Task from '../../../models/taskModel.js';
import User from '../../../models/userModel.js';
import mongoose from 'mongoose';

describe('DELETE /api/tasks/:id', () => {
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
			title: 'Task to Delete',
			description: 'This task will be deleted',
			status: 'TODO',
			priority: 'LOW',
			user: user._id,
		});
	});

	afterEach(async () => {
		await Task.deleteMany({});
		await User.deleteMany({});
	});

	it('should delete an existing task', async () => {
		const response = await request(app)
			.delete(`/api/tasks/${task._id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200);

		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe('Task deleted successfully');

		const deletedTask = await Task.findById(task._id);
		expect(deletedTask).toBeNull();
	});

	it('should maintain database integrity after deletion', async () => {
		const otherTask = await Task.create({
			title: 'Other Task',
			description: 'This task should remain',
			status: 'TODO',
			priority: 'MEDIUM',
			user: user._id,
		});

		await request(app)
			.delete(`/api/tasks/${task._id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(200);

		const remainingTask = await Task.findById(otherTask._id);
		expect(remainingTask).toBeTruthy();
		expect(remainingTask.title).toBe('Other Task');
	});

	it('should return 404 when deleting non-existent task', async () => {
		const nonExistentId = new mongoose.Types.ObjectId();

		const response = await request(app)
			.delete(`/api/tasks/${nonExistentId}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(404);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBe('Task not found');
	});

	it('should return 401 if no authentication token is provided', async () => {
		const response = await request(app).delete(`/api/tasks/${task._id}`).expect(401);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBe('No token provided');
	});
});
