import User from '../models/userModel.js';
import { validateUser } from '../middleware/userValidation.js';
import { generateToken } from '../util/auth.js';

export const createUser = async (req, res, next) => {
	try {
		const { error, value } = validateUser(req.body);
		if (error) {
			return res.status(400).json({
				success: false,
				error: 'Validation Error',
				details: error.details[0].message,
			});
		}

		const { email } = value;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				error: 'Email already in use',
			});
		}

		const user = await User.create(value);
		const token = generateToken(user);
		res.status(201).json({
			success: true,
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const getUsers = async (req, res, next) => {
	try {
		const users = await User.find({}, { password: 0 });
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id, { password: 0 });
		if (!user) {
			return res.status(404).json({
				success: false,
				error: 'User not found',
			});
		}
		res.status(200).json({
			id: user._id,
			username: user.username,
			email: user.email,
		});
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req, res, next) => {
	try {
		const { error, value } = validateUser(req.body, true);
		if (error) {
			return res.status(400).json({
				success: false,
				error: error.details[0].message,
			});
		}

		const user = await User.findByIdAndUpdate(req.params.id, value, {
			new: true,
			runValidators: true,
			select: '-password',
		});

		if (!user) {
			return res.status(404).json({
				success: false,
				error: 'User not found',
			});
		}

		res.status(200).json({
			id: user._id,
			username: user.username,
			email: user.email,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({
				success: false,
				error: 'User not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'User deleted successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				success: false,
				error: 'Invalid email or password',
			});
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				error: 'Invalid email or password',
			});
		}

		const token = generateToken(user);
		res.json({
			success: true,
			token,
			user: {
				id: user._id,
				email: user.email,
				username: user.username,
			},
		});
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};
