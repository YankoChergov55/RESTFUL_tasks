import app from '../../../server.js';
import request from 'supertest';
import { User } from '../../../models/user.js';

describe('user update', () => {
	const testUser = {
		username: 'testuser',
		email: 'test@example.com',
		password: 'Test1234!',
	};

	beforeEach(async () => {
		await User.deleteMany({});
		await request(app).post('/api/users/register').send(testUser);
	});

	it('should update user details', async () => {
		const users = await User.find({});
		const userId = users[0]._id;

		const updatedData = {
			username: 'updateduser',
			email: 'updated@example.com',
		};

		const response = await request(app).put(`/api/users/${userId}`).send(updatedData);

		expect(response.status).toBe(200);
		expect(response.body.username).toBe(updatedData.username);
		expect(response.body.email).toBe(updatedData.email);
	});

	it('should return 404 when updating non-existent user', async () => {
		const nonExistentId = '507f1f77bcf86cd799439011';
		const response = await request(app)
			.put(`/api/users/${nonExistentId}`)
			.send({ username: 'newname' });

		expect(response.status).toBe(404);
	});

	it('should return 400 when update data is invalid', async () => {
		const users = await User.find({});
		const userId = users[0]._id;

		const response = await request(app)
			.put(`/api/users/${userId}`)
			.send({ email: 'invalid-email' });

		expect(response.status).toBe(400);
	});
});
