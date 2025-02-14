import { errorHandler } from '../middleware/errorHandler.js';
import Joi from 'joi';
import { jest } from '@jest/globals';

describe('Error Handler Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    // Mock request object
    mockReq = {};

    // Mock response object with jest mock functions
    mockRes = {
      status: jest.fn().mockReturnThis(), // chainable
      json: jest.fn().mockReturnThis(), // chainable
    };

    // Mock next function
    mockNext = jest.fn();
  });

  it('should handle Joi validation errors', () => {
    // Create a Joi validation error
    const joiError = new Joi.ValidationError('Validation failed', [
      {
        message: 'Field is required',
      },
    ]);
    joiError.isJoi = true;

    // Call error handler with mocked objects
    errorHandler(joiError, mockReq, mockRes, mockNext);

    // Verify response
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: 'Joi Validation Error',
      details: 'Field is required',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle Mongoose validation errors', () => {
    // Create a Mongoose validation error
    const mongooseError = new Error('Invalid field value');
    mongooseError.name = 'ValidationError';

    // Call error handler with mocked objects
    errorHandler(mongooseError, mockReq, mockRes, mockNext);

    // Verify response
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: 'Mongoose Validation Error',
      details: 'Invalid field value',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle general errors', () => {
    // Create a general error
    const generalError = new Error('Something went wrong');

    // Call error handler with mocked objects
    errorHandler(generalError, mockReq, mockRes, mockNext);

    // Verify response
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: 'Server Error',
      details: 'Something went wrong',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
