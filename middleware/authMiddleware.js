import { verifyToken } from '../util/auth.js';
import User from '../models/userModel.js';

export const authenticateUser = (req, res, next) => {
	const token = req.header('Authorization')?.split(' ')[1];
	if (!token)
		return res.status(401).json({
			success: false,
			error: 'No token provided',
		});

	const decoded = verifyToken(token);
	if (!decoded)
		return res.status(403).json({
			success: false,
			error: 'Invalid or Expired token',
		});

	req.user = decoded;
	next();
};

export const authorizeAdmin = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user || user.role !== 'admin') {
			return res.status(403).json({
				success: false,
				error: 'Access denied. Admin privileges required',
			});
		}
		next();
	} catch (error) {
		res.status(500).json({ success: false, error: 'Server error' });
	}
};
