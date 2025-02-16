import app from '../../../server.js';
import request from 'supertest';
import { User } from '../../../models/user.js';

describe('user deletion', () => {
    const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Test1234!'
    };

    beforeEach(async () => {
        await User.deleteMany({});
        await request(app).post('/api/users/register').send(testUser);
    });

    it('should delete a user', async () => {
        const users = await User.find({});
        const userId = users[0]._id;

        const response = await request(app).delete(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');

        const deletedUser = await User.findById(userId);
        expect(deletedUser).toBeNull();
    });

    it('should return 404 when deleting non-existent user', async () => {
        const nonExistentId = '507f1f77bcf86cd799439011';
        const response = await request(app).delete(`/api/users/${nonExistentId}`);
        expect(response.status).toBe(404);
    });
});
