import swaggerJsdoc from 'swagger-jsdoc';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Task Manager API',
			version: '1.0.0',
			description: 'A RESTful API for managing tasks and subtasks',
			contact: {
				name: 'API Support',
				url: 'https://github.com/YankoChergov55/RESTFUL_tasks',
			},
		},
		servers: [
			{
				url: process.env.API_URL || 'http://localhost:3000',
				description: 'Development server',
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
			responses: {
				UnauthorizedError: {
					description: 'Access token is missing or invalid',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									success: {
										type: 'boolean',
										example: false,
									},
									error: {
										type: 'string',
										example: 'Unauthorized access',
									},
								},
							},
						},
					},
				},
				NotFoundError: {
					description: 'The requested resource was not found',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									success: {
										type: 'boolean',
										example: false,
									},
									error: {
										type: 'string',
										example: 'Resource not found',
									},
								},
							},
						},
					},
				},
				ValidationError: {
					description: 'Invalid input data',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									success: {
										type: 'boolean',
										example: false,
									},
									error: {
										type: 'string',
										example: 'Validation failed',
									},
								},
							},
						},
					},
				},
				TooManyRequests: {
					description: 'Too many requests, please try again later',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									success: {
										type: 'boolean',
										example: false,
									},
									error: {
										type: 'string',
										example: 'Too many requests from this IP, please try again after 15 minutes',
									},
								},
							},
						},
					},
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ['./routes/*.js'], // Path to the API routes
};

export const specs = swaggerJsdoc(options);
