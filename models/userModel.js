import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
