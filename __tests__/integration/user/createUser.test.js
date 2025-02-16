import app from '../../../server.js';
import request from 'supertest';

describe('user creation', () => {
	const validUser = {
		username: 'testuser',
		email: 'test@example.com',
		password: 'Test1234!',
	};

	it('should create a new user', async () => {
		const response = await request(app).post('/api/users/register').send(validUser);
		expect(response.status).toBe(201);
		expect(response.body.success).toBe(true);
	});

	it('should return 400 if required fields are missing', async () => {
		const response = await request(app).post('/api/users/register').send({});
		expect(response.status).toBe(400);
		expect(response.body.error).toBe('Joi Validation Error');
		expect(response.body.details).toBe('"username" is required');
	});
});
