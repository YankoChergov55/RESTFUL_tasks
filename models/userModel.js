import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Task',
			},
		],
	},
	{ timestamps: true, collection: 'users' }
);

const User = mongoose.model('User', userSchema);

export default User;
