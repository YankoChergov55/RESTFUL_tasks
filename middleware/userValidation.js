import joi from 'joi';

const userSchema = joi.object({
	username: joi.string().alphanum().min(3).max(30).required().messages({
		'string.min': 'Username must be at least 3 characters long',
		'string.max': 'Username cannot exceed 30 characters',
		'string.alphanum': 'Username must only contain alphanumeric characters',
	}),
	email: joi.string().email({ minDomainSegments: 2 }).required().messages({
		'string.email': 'Please enter a valid email address',
	}),
	password: joi
		.string()
		.min(8)
		.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
		.required()
		.messages({
			'string.min': 'Password must be at least 8 characters long',
			'string.pattern.base':
				'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
		}),
	role: joi.string().valid('admin', 'user').default('user'),
});

export function validateUser(user) {
	return userSchema.validate(user);
}
