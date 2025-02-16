import { jest } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Task from '../../models/taskModel.js';
import User from '../../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

// Increase timeout for integration tests
jest.setTimeout(30000);

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = mongoServer.getUri();
	await mongoose.connect(mongoUri);
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

beforeEach(async () => {
	await Task.deleteMany({});
	await User.deleteMany({});
});
