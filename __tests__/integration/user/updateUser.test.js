import app from '../../../server.js';
import request from 'supertest';
import User from '../../../models/userModel.js';

describe('user update', () => {
	const testUser = {
		username: 'testuser',
		email: 'test@example.com',
		password: 'Test1234!',
	};
	let authToken;

	beforeEach(async () => {
		await User.deleteMany({});
		const registerResponse = await request(app).post('/api/users/register').send(testUser);
		const loginResponse = await request(app)
			.post('/api/users/login')
			.send({ email: testUser.email, password: testUser.password });
		authToken = loginResponse.body.token;
	});

	it('should update user details', async () => {
		const users = await User.find({});
		const userId = users[0]._id;

		const updatedData = {
			username: 'updateduser',
			email: 'updated@example.com',
			password: 'UpdatedTest1234!',
		};

		const response = await request(app)
			.put(`/api/users/${userId}`)
			.set('Authorization', `Bearer ${authToken}`)
			.send(updatedData);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			id: userId.toString(),
			username: updatedData.username,
			email: updatedData.email,
		});
	});

	it('should return 404 when updating non-existent user', async () => {
		const nonExistentId = '507f1f77bcf86cd799439011';
		const updatedData = {
			username: 'newname',
			email: 'new@example.com',
			password: 'NewTest1234!',
		};

		const response = await request(app)
			.put(`/api/users/${nonExistentId}`)
			.set('Authorization', `Bearer ${authToken}`)
			.send(updatedData);

		expect(response.status).toBe(404);
	});

	it('should return 400 when update data is invalid', async () => {
		const users = await User.find({});
		const userId = users[0]._id;

		const response = await request(app)
			.put(`/api/users/${userId}`)
			.set('Authorization', `Bearer ${authToken}`)
			.send({ email: 'invalid-email' });

		expect(response.status).toBe(400);
	});
});
