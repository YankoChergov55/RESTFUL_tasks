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

For debugging:

```bash
npm run debug
```

## License

This project is licensed under the ISC License.
