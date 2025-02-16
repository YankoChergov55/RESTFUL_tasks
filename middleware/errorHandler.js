// Filter stack trace to only show application code
const getCleanStack = (stack) => {
	if (!stack) return '';
	return stack
		.split('\n')
		.filter((line) => line.includes('RESTful_TaskManager') && !line.includes('node_modules'))
		.join('\n');
};

export const errorHandler = (err, req, res, next) => {
	// Log all errors to console with clean stack
	console.error('Error details:', {
		name: err.name,
		message: err.message,
		stack: getCleanStack(err.stack),
	});

	// Handle Joi validation errors
	if (err.isJoi) {
		return res.status(400).json({
			success: false,
			error: 'Joi Validation Error',
			details: err.details[0].message,
			stack: getCleanStack(err.stack),
		});
	}

	// Handle Mongoose validation errors
	if (err.name === 'ValidationError') {
		return res.status(400).json({
			success: false,
			error: 'Mongoose Validation Error',
			details: err.message,
			stack: getCleanStack(err.stack),
		});
	}

	// Handle other errors
	res.status(500).json({
		success: false,
		error: 'Server Error',
		details: err.message,
		stack: process.env.NODE_ENV === 'development' ? getCleanStack(err.stack) : undefined,
	});
};
