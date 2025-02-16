# RESTful Task Manager

## Overview

The RESTful Task Manager is a Node.js-based application designed to manage tasks efficiently using a RESTful API. It leverages modern web technologies to provide a robust and scalable solution for task management.

## Tech Stack

- **Node.js**: Runtime environment for executing JavaScript code server-side.
- **Express**: Web application framework for building the RESTful API.
- **Mongoose**: ODM library for MongoDB and Node.js, used to manage data.
- **Joi**: Validation library for JavaScript, ensuring data integrity.
- **Morgan**: HTTP request logger middleware for logging requests.
- **Dotenv**: Module for loading environment variables from a .env file.

## Features Implemented

1. **Task Management**:

   - Create, read, update, and delete tasks.
   - Manage task statuses (TODO, IN_PROGRESS, DONE) and priorities (LOW, MEDIUM, HIGH, CRITICAL).
   - Support for task descriptions, tags, and due dates.

2. **Subtasks**:

   - Tasks can have subtasks.
   - Subtasks have their own title and status.

3. **API Endpoints**:
   **_Tasks Endpoints_**

   - `GET /api/tasks`: Retrieve all tasks.
   - `GET /api/tasks/:id`: Retrieve a specific task by ID.
   - `POST /api/tasks`: Create a new task.
   - `PUT /api/tasks/:id`: Update an existing task by ID.
   - `DELETE /api/tasks/:id`: Delete a task by ID.
   - `GET /api/tasks/filter`: Filter tasks based on query parameters (status, priority, tags, due date range).

   **_Subtasks Endpoints_**

   - `GET /api/tasks/:taskId/subtasks`: Retrieve all subtasks for a specific task.
   - `POST /api/tasks/:taskId/subtasks`: Add a new subtask to a specific task.
   - `PUT /api/tasks/:taskId/subtasks/:subtaskId`: Update a specific subtask.
   - `DELETE /api/tasks/:taskId/subtasks/:subtaskId`: Delete a specific subtask.

   **_Bulk Operations Endpoints_**

   - `POST /api/tasks/bulk`: Create multiple tasks in a single request.
   - `PUT /api/tasks/bulk`: Update multiple tasks in a single request.
   - `DELETE /api/tasks/bulk`: Delete multiple tasks in a single request.

4. **Data Validation**:

   - Use Joi for request payload validation to ensure data integrity.

5. **Logging**:

   - Log HTTP requests to the console using Morgan.

6. **Error Handling**:

   - Implement custom error handling middleware for consistent error responses.

7. **Environment Configuration**:

   - Use dotenv for managing environment-specific configurations.

8. **Testing Suite**:
   - Comprehensive Jest-based test suite
   - Integration tests for all CRUD operations
   - Unit tests for middleware and validation
   - In-memory MongoDB for testing
   - Test coverage reporting

## Development Tools

The project uses modern development tools to ensure code quality and maintainability:

1. **ESLint**:

   - JavaScript linting with custom configuration
   - Integration with Prettier
   - Node.js specific rules
   - Automatic code style enforcement

2. **Prettier**:
   - Consistent code formatting
   - Integrated with ESLint
   - Automatic code formatting on save
   - Configuration aligned with project standards

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in a `.env` file:
   - `PORT`: The port number for the server to listen on
   - `MONGODB_URI`: The connection string for your MongoDB database
   - `NODE_ENV`: The environment mode (e.g., "development", "production")
4. Start the server:
   ```bash
   npm run server
   ```

### Development Commands

```bash
# Start server in debug mode
npm run debug

# Run tests
npm test                  # Run all tests
npm run watch            # Run tests in watch mode
npm run coverage         # Generate test coverage report

# Code Quality
npm run lint             # Check for linting issues
npm run lint:fix         # Fix linting issues automatically
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

## Changelog

All notable changes to this project will be documented in this section.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [1.0.0] - 2025-02-14

#### Added

- Core Task Management with CRUD operations
- Status management (TODO, IN_PROGRESS, DONE)
- Priority levels (LOW, MEDIUM, HIGH, CRITICAL)
- Subtasks Management
- API Endpoints for tasks, subtasks, and bulk operations
- Data Validation with Joi
- HTTP Request Logging with Morgan
- Custom Error Handling
- Environment Configuration with dotenv
- Comprehensive Testing Suite with Jest
- ESLint with Prettier integration
- Code formatting standards
- Automated quality checks
- MongoDB indexes for optimized query performance

## Future Features

The following features are planned for future implementation to enhance the functionality and robustness of the RESTful Task Manager:

1. **Rate Limiting**: Implement request rate limiting to prevent API abuse and ensure fair usage.
2. **API Versioning**: Add versioning support to maintain backwards compatibility.
3. **Caching Layer**: Integrate Redis or similar caching solution for frequently accessed tasks.
4. **API Documentation**: Implement Swagger/OpenAPI documentation.
5. **Request Compression**: Add gzip/deflate compression for optimized data transfer.
6. **Authentication & Authorization**: Implement JWT Authentication and Role-based access control.
7. **Health Check**: Add API health check endpoint for monitoring.
8. **Analytics**: Implement task statistics and analytics endpoints.
9. **Recurring Tasks**: Add batch job scheduling for recurring tasks.
10. **Soft Delete**: Implement soft delete functionality for tasks.
11. **Audit Trail**: Add task history tracking for audit purposes.
12. **Real-time Updates**: Integrate WebSocket for real-time task updates.
13. **File Attachments**: Add support for file attachments in tasks.
14. **Export Functionality**: Implement task export features (CSV/PDF).
15. **Response Standardization**: Standardize API response envelope.
16. **CORS**: Configure Cross-Origin Resource Sharing.
17. **Request Monitoring**: Enhance request logging and monitoring capabilities.

#User Authentication implementation in progress

### Project Folder Structure with auth implemented

/RESTful_TaskManager
│── server.js # Main server file
│── .env # Environment variables
│── .gitignore # Git ignore rules
│── .prettierrc # Prettier configuration
│── .vscode/ # VS Code settings
│── README.md # Project documentation
│── eslint.config.mjs # ESLint configuration
│── jest.config.mjs # Jest test configuration
│── package.json # Project dependencies and scripts
│
│── **tests**/ # Test files
│ ├── integration/ # Integration tests
│ │ ├── setup.js
│ │ ├── createUser.test.js
│ │ ├── deleteUser.test.js
│ │ ├── getUsers.test.js
│ │ └── updateUser.test.js
│ ├── errorHandler.test.js
│ ├── notFoundHandler.test.js
│ └── validation.test.js
│
│── middleware/ # Express middleware
│ ├── authMiddleware.js # Middleware to protect routes
│ ├── errorHandler.js
│ ├── notFoundHandler.js
│ └── userValidation.js # Validation middleware for user operations
│
│── models/ # Database models
│ └── userModel.js # User schema/model
│
│── routes/ # API routes
│ ├── userRoutes.js # User-related routes (registration, login, etc.)
│
│── util/ # Utility functions
│ ├── db.js # Database connection
│ └── hash.js # Utility functions for password hashing

## User Auth Endpoints

GET /api/users: Retrieve all users.

GET /api/users/:id: Retrieve a specific user by ID.

POST /api/users/register: Register a new user.

POST /api/users/login: Log in an existing user.

POST /api/users/logout: Log out a user.

PUT /api/users/:id: Update an existing user by ID.

DELETE /api/users/:id: Delete a user by ID.

GET /api/users/validate: Validate a user's authentication token.

## User Auth functionality

### User Registration (POST /api/users/register)

Should successfully register a user with valid details.

Should return 400 if required fields are missing.

Should return 409 if the email is already registered.

### User Login (POST /api/users/login)

Should log in a user with valid credentials and return a JWT.

Should return 400 for missing fields.

Should return 401 for incorrect email or password.

### Retrieve Users (GET /api/users)

Should return all users.

Should return 401 if not authenticated.

### Retrieve User (GET /api/users/:id)

Should return the requested user by ID.

Should return 404 if the user is not found.

### Update User (PUT /api/users/:id)

Should update a user’s details.

Should return 400 if invalid data is provided.

Should return 404 if the user is not found.

### Delete User (DELETE /api/users/:id)

Should delete a user by ID.

Should return 404 if the user is not found.

### Logout (POST /api/users/logout)

Should clear the authentication token.

Should return 200 on successful logout.

### Token Validation (GET /api/users/validate)

Should return 200 if the token is valid.

Should return 401 if the token is expired or invalid.
