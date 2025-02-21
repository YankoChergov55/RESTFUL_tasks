import jwt from 'jsonwebtoken';

const TOKEN_EXPIRATION = '1h';

export const generateToken = (user) => {
	return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
		expiresIn: TOKEN_EXPIRATION,
	});
};

export const verifyToken = (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return null;
	}
};
