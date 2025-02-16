import { errorHandler } from '../../middleware/errorHandler.js';
import Joi from 'joi';
import { jest } from '@jest/globals';

describe('Error Handler Middleware', () => {
	let mockReq;
	let mockRes;
	let mockNext;
	const originalNodeEnv = process.env.NODE_ENV;

	beforeEach(() => {
		mockReq = {};
		mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		};
		mockNext = jest.fn();
		console.error = jest.fn();
	});

	afterEach(() => {
		process.env.NODE_ENV = originalNodeEnv;
		jest.clearAllMocks();
	});

	describe('Joi Validation Errors', () => {
		it('should handle Joi validation errors with proper formatting', () => {
			const joiError = new Joi.ValidationError('Validation failed', [
				{
					message: 'Field is required',
				},
			]);
			joiError.isJoi = true;
			joiError.stack =
				'    at RESTful_TaskManager/test.js:1:1\n    at node_modules/package/file.js';

			errorHandler(joiError, mockReq, mockRes, mockNext);

			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({
				success: false,
				error: 'Joi Validation Error',
				details: 'Field is required',
				stack: '    at RESTful_TaskManager/test.js:1:1',
			});
			expect(mockNext).not.toHaveBeenCalled();
			expect(console.error).toHaveBeenCalledWith('Error details:', {
				name: joiError.name,
				message: joiError.message,
				stack: '    at RESTful_TaskManager/test.js:1:1',
			});
		});
	});

	describe('Mongoose Validation Errors', () => {
		it('should handle Mongoose validation errors with proper formatting', () => {
			const mongooseError = new Error('Invalid field value');
			mongooseError.name = 'ValidationError';
			mongooseError.stack =
				'    at RESTful_TaskManager/model.js:1:1\n    at node_modules/package/file.js';

			errorHandler(mongooseError, mockReq, mockRes, mockNext);

			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({
				success: false,
				error: 'Mongoose Validation Error',
				details: 'Invalid field value',
				stack: '    at RESTful_TaskManager/model.js:1:1',
			});
			expect(mockNext).not.toHaveBeenCalled();
			expect(console.error).toHaveBeenCalledWith('Error details:', {
				name: mongooseError.name,
				message: mongooseError.message,
				stack: '    at RESTful_TaskManager/model.js:1:1',
			});
		});
	});

	describe('Generic Server Errors', () => {
		it('should handle generic server errors in development mode', () => {
			process.env.NODE_ENV = 'development';
			const genericError = new Error('Something went wrong');
			genericError.stack =
				'    at RESTful_TaskManager/server.js:1:1\n    at node_modules/package/file.js';

			errorHandler(genericError, mockReq, mockRes, mockNext);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				success: false,
				error: 'Server Error',
				details: 'Something went wrong',
				stack: '    at RESTful_TaskManager/server.js:1:1',
			});
			expect(mockNext).not.toHaveBeenCalled();
			expect(console.error).toHaveBeenCalledWith('Error details:', {
				name: genericError.name,
				message: genericError.message,
				stack: '    at RESTful_TaskManager/server.js:1:1',
			});
		});

		it('should hide stack trace in production mode', () => {
			process.env.NODE_ENV = 'production';
			const genericError = new Error('Something went wrong');
			genericError.stack =
				'    at RESTful_TaskManager/server.js:1:1\n    at node_modules/package/file.js';

			errorHandler(genericError, mockReq, mockRes, mockNext);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				success: false,
				error: 'Server Error',
				details: 'Something went wrong',
			});
			expect(mockNext).not.toHaveBeenCalled();
			expect(console.error).toHaveBeenCalledWith('Error details:', {
				name: genericError.name,
				message: genericError.message,
				stack: '    at RESTful_TaskManager/server.js:1:1',
			});
		});

		it('should handle errors without stack trace', () => {
			const errorWithoutStack = new Error('No stack trace');
			errorWithoutStack.stack = undefined;

			errorHandler(errorWithoutStack, mockReq, mockRes, mockNext);

			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				success: false,
				error: 'Server Error',
				details: 'No stack trace',
			});
			expect(console.error).toHaveBeenCalledWith('Error details:', {
				name: errorWithoutStack.name,
				message: errorWithoutStack.message,
				stack: '',
			});
		});
	});
});
