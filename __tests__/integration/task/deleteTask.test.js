import request from 'supertest';
import app from '../../../server.js';
import Task from '../../../models/taskModel.js';

describe('DELETE /api/tasks/:id', () => {
	beforeEach(async () => {
		await Task.deleteMany({});
	});

	it('should delete an existing task', async () => {
		const task = await Task.create({
			title: 'Task to Delete',
			description: 'This task will be deleted',
			status: 'TODO',
			priority: 'LOW',
			tags: ['test'],
			dueDate: '2023-12-31',
		});

		await request(app).delete(`/api/tasks/${task._id}`).expect(200);

		// Verify task is deleted
		const deletedTask = await Task.findById(task._id);
		expect(deletedTask).toBeNull();
	});

	it('should return 404 when deleting non-existent task', async () => {
		const nonExistentId = '507f1f77bcf86cd799439011';

		await request(app).delete(`/api/tasks/${nonExistentId}`).expect(404);
	});

	it('should maintain database integrity after deletion', async () => {
		// Create multiple tasks
		const tasks = await Task.insertMany([
			{
				title: 'Task 1',
				description: 'First task',
				status: 'TODO',
				priority: 'HIGH',
				dueDate: '2023-12-31',
			},
			{
				title: 'Task 2',
				description: 'Second task',
				status: 'IN_PROGRESS',
				priority: 'MEDIUM',
				dueDate: '2023-12-31',
			},
		]);

		await request(app).delete(`/api/tasks/${tasks[0]._id}`).expect(200);

		// Verify only the specified task was deleted
		const remainingTasks = await Task.find({});
		expect(remainingTasks).toHaveLength(1);
		expect(remainingTasks[0]._id.toString()).toBe(tasks[1]._id.toString());
	});
});
