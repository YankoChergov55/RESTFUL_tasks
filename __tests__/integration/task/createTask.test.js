import request from 'supertest';
import app from '../../../server.js';
import Task from '../../../models/taskModel.js';

describe('POST /api/tasks', () => {
	it('should create a new task', async () => {
		const taskData = {
			title: 'Test Task',
			description: 'This is a test task',
			status: 'TODO',
			priority: 'MEDIUM',
			tags: ['test', 'integration'],
			dueDate: '2023-12-31',
		};

		const response = await request(app).post('/api/tasks').send(taskData).expect(201);

		expect(response.body.success).toBe(true);
		expect(response.body.data).toHaveProperty('_id');
		expect(response.body.data.title).toBe(taskData.title);
		expect(response.body.data.description).toBe(taskData.description);
		expect(response.body.data.status).toBe(taskData.status);
		expect(response.body.data.priority).toBe(taskData.priority);
		expect(response.body.data.tags).toEqual(expect.arrayContaining(taskData.tags));
		expect(new Date(response.body.data.dueDate)).toEqual(new Date(taskData.dueDate));

		const savedTask = await Task.findById(response.body.data._id);
		expect(savedTask).toBeTruthy();
		expect(savedTask.title).toBe(taskData.title);
	});

	it('should return 400 if required fields are missing', async () => {
		const invalidTaskData = {
			description: 'This task is missing a title',
		};

		const response = await request(app).post('/api/tasks').send(invalidTaskData).expect(400);

		expect(response.body.success).toBe(false);
		expect(response.body.error).toBe('Joi Validation Error');
		expect(response.body.details).toContain('"title" is required');
	});
});
