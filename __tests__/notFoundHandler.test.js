import { jest } from '@jest/globals';
import { notFoundHandler } from '../middleware/notFoundHandler.js';

describe('Not Found Handler Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      originalUrl: '/api/subtasks',
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it('should set status to 404 and pass error to next middleware', () => {
    notFoundHandler(mockReq, mockRes, mockNext);

    // Verify status was set to 404
    expect(mockRes.status).toHaveBeenCalledWith(404);

    // Verify next was called with an error
    expect(mockNext).toHaveBeenCalled();
    const error = mockNext.mock.calls[0][0];
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Not Found - /api/subtasks');

    // Verify json was not called since we're passing to error handler
    expect(mockRes.json).not.toHaveBeenCalled();
  });
});
