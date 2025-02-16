import express from 'express';
import { createUser } from '../controllers/userController.js';

const userRouter = express.Router();

// Public routes
userRouter.post('/register', (req, res, next) => {
	createUser(req, res, next);
});
userRouter.post('/login', (req, res, next) => {});

// Protected routes
userRouter.get('/profile', (req, res, next) => {});
userRouter.put('/profile', (req, res, next) => {});
userRouter.delete('/profile', (req, res, next) => {});

export default userRouter;
