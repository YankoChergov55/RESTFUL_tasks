import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { connectDB } from './util/db.js';
import taskRoutes from './routes/taskRoutes.js';
import subtaskRoutes from './routes/subtaskRoutes.js';
import bulkRoutes from './routes/bulkRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

dotenv.config();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting configuration
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply rate limiting to all routes
app.use(limiter);

// CORS Configuration
app.use(
	cors({
		origin: process.env.CORS_ORIGIN || '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
		optionsSuccessStatus: 200,
	})
);

app.get('/', (req, res) => {
	res.send('Welcome to the Task Manager API');
});

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use('/api/tasks', taskRoutes);
app.use('/api/tasks/:taskId/subtasks', subtaskRoutes);
app.use('/api/bulk', bulkRoutes);
app.use('/api/users', userRoutes);

// Handle 404 errors for non-existent routes
app.use(notFoundHandler);
app.use(errorHandler);

// Only start the server if this file is run directly
if (process.env.NODE_ENV !== 'test') {
	app.listen(process.env.PORT, () => {
		connectDB();
		console.log(`Server is running on port ${process.env.PORT}`);
	});
}

export default app;
