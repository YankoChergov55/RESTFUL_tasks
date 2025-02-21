# RESTful Task Manager

## Overview

The RESTful Task Manager is a Node.js-based application designed to manage tasks efficiently using a RESTful API. It leverages modern web technologies to provide a robust and scalable solution for task management.

## Tech Stack

- **Node.js**: Runtime environment for executing JavaScript code server-side.
- **Express**: Web application framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM library for MongoDB and Node.js, used to manage data.
- **Joi**: Validation library for JavaScript, ensuring data integrity.
- **Morgan**: HTTP request logger middleware for logging requests.
- **Dotenv**: Module for loading environment variables from a .env file.
- **Express Rate Limit**: Basic rate limiting for API protection.
- **CORS**: Cross-Origin Resource Sharing support.
- **Swagger/OpenAPI**: API documentation and testing interface.
- **Jest**: Testing framework for unit and integration tests.
- **Supertest**: HTTP assertions for API testing.

## Features Implemented

1. **Authentication & Authorization**:

   - User registration and login
   - JWT-based authentication
   - Role-based access control (User/Admin)

2. **Task Management**:

   - Create, read, update, and delete tasks
   - Filter tasks by status
   - Associate tasks with users
   - Task status tracking

3. **Subtasks**:

   - Hierarchical task organization
   - Full CRUD operations for subtasks
   - Link subtasks to parent tasks

4. **Bulk Operations**:

   - Create multiple tasks at once
   - Update multiple tasks simultaneously
   - Batch delete tasks

5. **Security Features**:

   - Rate limiting to prevent abuse
   - CORS configuration for secure cross-origin access
   - Protected routes with JWT authentication

6. **API Documentation**:
   - Interactive Swagger/OpenAPI documentation
   - Detailed endpoint descriptions
   - Request/response examples
   - Authentication documentation

## API Endpoints

### Authentication Endpoints

- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login user and get JWT token

### User Management

- `GET /api/users`: Get all users (Admin only)
- `GET /api/users/:id`: Get user by ID
- `PUT /api/users/:id`: Update user
- `DELETE /api/users/:id`: Delete user

### Tasks Endpoints

- `GET /api/tasks`: Get all tasks
- `GET /api/tasks/:id`: Get task by ID
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task
- `GET /api/tasks/filter`: Filter tasks by status

### Subtasks Endpoints

- `GET /api/tasks/:taskId/subtasks`: Get all subtasks for a task
- `GET /api/tasks/:taskId/subtasks/:subtaskId`: Get specific subtask
- `POST /api/tasks/:taskId/subtasks`: Create a subtask
- `PUT /api/tasks/:taskId/subtasks/:subtaskId`: Update a subtask
- `DELETE /api/tasks/:taskId/subtasks/:subtaskId`: Delete a subtask

### Bulk Operations

- `POST /api/bulk/tasks`: Create multiple tasks
- `PUT /api/bulk/tasks`: Update multiple tasks
- `DELETE /api/bulk/tasks`: Delete multiple tasks

## API Response Format

All API endpoints follow a consistent response format:

### Success Response

```json
{
	"success": true,
	"data": {
		// Response data here
	}
}
```

### Error Response

```json
{
	"success": false,
	"error": "Error message here"
}
```

### Common HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error

## Error Handling

The API implements comprehensive error handling:

1. **Validation Errors**:

   - Invalid input data
   - Missing required fields
   - Incorrect data types

2. **Authentication Errors**:

   - Missing or invalid JWT token
   - Expired tokens
   - Invalid credentials

3. **Authorization Errors**:

   - Insufficient permissions
   - Resource access denied
   - Admin-only route access

4. **Rate Limiting Errors**:

   - Too many requests from same IP
   - Cooldown period enforcement
   - Request quota exceeded

5. **Resource Errors**:
   - Not found errors
   - Duplicate resource errors
   - Resource conflicts

## Security Features

1. **Rate Limiting**:

   - Limits requests per IP address
   - Configurable window and max requests
   - Protection against DoS attacks

2. **CORS Configuration**:

   - Configurable origin restrictions
   - Support for credentials
   - Pre-flight request handling

3. **Authentication**:
   - JWT-based token authentication
   - Secure password handling
   - Protected routes

## Development Tools

1. **ESLint Configuration**:

   - ES2022 features enabled
   - Prettier integration
   - Node.js specific rules

2. **Prettier Settings**:
   - Tab-based indentation
   - Single quotes
   - Semicolon usage
   - ES5 trailing commas
   - 100 character line width

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=http://your-frontend-domain.com
   NODE_ENV=development
   ```

4. Start the server:

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Documentation

Access the interactive API documentation at `/api-docs` when the server is running. The Swagger UI provides:

- Complete endpoint listing
- Request/response schemas
- Authentication requirements
- Interactive API testing
- Example requests and responses

## Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```
