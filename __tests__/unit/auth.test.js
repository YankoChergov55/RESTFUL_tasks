import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { generateToken, verifyToken } from '../../util/auth.js';

describe('Auth Utils', () => {
	const mockUser = {
		_id: '507f1f77bcf86cd799439011',
		email: 'test@example.com',
	};

	const JWT_SECRET = 'test-secret';

	beforeEach(() => {
		process.env.JWT_SECRET = JWT_SECRET;
	});

	describe('generateToken', () => {
		it('should generate a valid JWT token', () => {
			const token = generateToken(mockUser);
			expect(token).toBeDefined();
			expect(typeof token).toBe('string');

			const decoded = jwt.verify(token, JWT_SECRET);
			expect(decoded).toHaveProperty('id', mockUser._id);
			expect(decoded).toHaveProperty('email', mockUser.email);
		});
	});

	describe('verifyToken', () => {
		it('should verify a valid token', () => {
			const token = generateToken(mockUser);
			const decoded = verifyToken(token);
			expect(decoded).toBeDefined();
			expect(decoded.id).toBe(mockUser._id);
		});

		it('should return null for invalid token', () => {
			const result = verifyToken('invalid-token');
			expect(result).toBeNull();
		});

		it('should return null for expired token', () => {
			const expiredToken = jwt.sign({ id: mockUser._id, email: mockUser.email }, JWT_SECRET, {
				expiresIn: 0,
			});
			const result = verifyToken(expiredToken);
			expect(result).toBeNull();
		});
	});
});
