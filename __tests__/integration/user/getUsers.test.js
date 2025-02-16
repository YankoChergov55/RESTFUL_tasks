import app from '../../../server.js';
import request from 'supertest';
import { User } from '../../../models/user.js';

describe('user retrieval', () => {
	const testUser = {
		username: 'testuser',
		email: 'test@example.com',
		password: 'Test1234!',
	};

	beforeEach(async () => {
		await User.deleteMany({});
		await request(app).post('/api/users/register').send(testUser);
	});

	it('should get all users', async () => {
		const response = await request(app).get('/api/users');
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body[0].username).toBe(testUser.username);
		expect(response.body[0].email).toBe(testUser.email);
		expect(response.body[0].password).toBeUndefined();
	});

	it('should get a specific user by id', async () => {
		const users = await User.find({});
		const userId = users[0]._id;

		const response = await request(app).get(`/api/users/${userId}`);
		expect(response.status).toBe(200);
		expect(response.body.username).toBe(testUser.username);
		expect(response.body.email).toBe(testUser.email);
		expect(response.body.password).toBeUndefined();
	});

	it('should return 404 for non-existent user', async () => {
		const nonExistentId = '507f1f77bcf86cd799439011';
		const response = await request(app).get(`/api/users/${nonExistentId}`);
		expect(response.status).toBe(404);
	});
});
