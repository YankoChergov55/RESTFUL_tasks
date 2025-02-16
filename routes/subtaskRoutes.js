import express from 'express';
import {
	getSubtasks,
	getSubtask,
	createSubtask,
	updateSubtask,
	deleteSubtask,
} from '../controllers/subtasksController.js';

const subtaskRouter = express.Router();

subtaskRouter.get('/', (req, res, next) => getSubtasks(req, res, next));
subtaskRouter.get('/:subtaskId', (req, res, next) => getSubtask(req, res, next));
subtaskRouter.post('/', (req, res, next) => createSubtask(req, res, next));
subtaskRouter.put('/:subtaskId', (req, res, next) => updateSubtask(req, res, next));
subtaskRouter.delete('/:subtaskId', (req, res, next) => deleteSubtask(req, res, next));

export default subtaskRouter;
