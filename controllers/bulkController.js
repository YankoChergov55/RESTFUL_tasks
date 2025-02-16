import Task from '../models/taskModel.js';
import { validateTask } from '../middleware/taskValidation.js';

export const bulkCreateTasks = async (req, res, next) => {
	try {
		const tasks = req.body;
		if (!Array.isArray(tasks)) {
			return res.status(400).json({
				success: false,
				error: 'Request body must be an array of tasks',
			});
		}

		// Validate each task
		const validatedTasks = [];
		for (const task of tasks) {
			const { error, value } = validateTask(task);
			if (error) {
				return next(error, {
					success: false,
					error: 'Validation Error',
					details: error.details[0].message,
					task: task,
				});
			}
			validatedTasks.push(value);
		}

		const createdTasks = await Task.insertMany(validatedTasks);
		res.status(201).json({
			success: true,
			data: createdTasks,
		});
	} catch (error) {
		next(error);
	}
};

export const bulkUpdateTasks = async (req, res, next) => {
	try {
		const { filter, update } = req.body;

		if (!filter || !update) {
			return res.status(400).json({
				success: false,
				error: 'Both filter and update objects are required',
			});
		}

		// Validate the update object
		const allowedUpdateFields = ['title', 'description', 'status', 'priority', 'tags', 'dueDate'];
		const updateFields = Object.keys(update);
		const isValidUpdate = updateFields.every((field) => allowedUpdateFields.includes(field));

		if (!isValidUpdate) {
			return res.status(400).json({
				success: false,
				error: 'Invalid update fields',
			});
		}

		const result = await Task.updateMany(filter, { $set: update }, { new: true });

		res.status(200).json({
			success: true,
			data: {
				matchedCount: result.matchedCount,
				modifiedCount: result.modifiedCount,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const bulkDeleteTasks = async (req, res, next) => {
	try {
		const { filter } = req.body;

		if (!filter) {
			return res.status(400).json({
				success: false,
				error: 'Filter object is required',
			});
		}

		const result = await Task.deleteMany(filter);

		res.status(200).json({
			success: true,
			data: {
				deletedCount: result.deletedCount,
			},
		});
	} catch (error) {
		next(error);
	}
};
