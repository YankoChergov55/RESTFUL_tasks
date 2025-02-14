import { jest } from "@jest/globals";
import mongoose from "mongoose";
import Task from "../../models/taskModel.js";
import dotenv from "dotenv";
dotenv.config();

// Increase timeout for integration tests
jest.setTimeout(30000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Task.deleteMany({});
});
