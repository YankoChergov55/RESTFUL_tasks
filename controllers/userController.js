import User from '../models/userModel.js';
import { validateUser } from '../middleware/userValidation.js';

export const createUser = async (req, res, next) => {
	try {
		const { error, value } = validateUser(req.body);
		if (error) {
			return next(error);
		}

		const { email } = value;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({
				success: false,
				error: 'Email already in use',
			});
		}

		const user = await User.create(value);
		res.status(201).json({
			success: true,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};
