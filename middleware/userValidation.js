import joi from 'joi';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

const baseUserSchema = {
	username: joi.string().alphanum().min(3).max(30).messages({
		'string.min': 'Username must be at least 3 characters long',
		'string.max': 'Username cannot exceed 30 characters',
		'string.alphanum': 'Username must only contain alphanumeric characters',
	}),
	email: joi.string().email({ minDomainSegments: 2 }).messages({
		'string.email': 'Please enter a valid email address',
	}),
	password: joi.string().min(8).pattern(passwordPattern).messages({
		'string.min': 'Password must be at least 8 characters long',
		'string.pattern.base':
			'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
	}),
	role: joi.string().valid('admin', 'user').default('user'),
};

const createUserSchema = joi.object({
	...baseUserSchema,
	username: baseUserSchema.username.required(),
	email: baseUserSchema.email.required(),
	password: baseUserSchema.password.required(),
});

const updateUserSchema = joi
	.object({
		...baseUserSchema,
		username: baseUserSchema.username.optional(),
		email: baseUserSchema.email.optional(),
		password: baseUserSchema.password.optional(),
	})
	.min(1); // Require at least one field to be present

export function validateUser(user, isUpdate = false) {
	return isUpdate ? updateUserSchema.validate(user) : createUserSchema.validate(user);
}
