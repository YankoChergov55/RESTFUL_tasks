import Task from '../models/taskModel.js';
import { validateTask } from '../middleware/taskValidation.js';

export const getTasks = async (req, res, next) => {
	try {
		const tasks = await Task.find();
		res.status(200).json({
			success: true,
			data: tasks,
		});
	} catch (error) {
		next(error);
	}
};

export const createTask = async (req, res, next) => {
	const { error, value } = validateTask(req.body);
	if (error) {
		return next(error, {
			success: false,
			error: 'Validation Error',
			details: error.details[0].message,
		});
	}

	try {
		const task = await Task.create(value);
		res.status(201).json({
			success: true,
			data: task,
		});
	} catch (error) {
		next(error);
	}
};

export const getTask = async (req, res, next) => {
	try {
		const { id } = req.params;
		const task = await Task.findById(id);
		res.status(200).json({
			success: true,
			data: task,
		});
	} catch (error) {
		next(error);
	}
};

export const updateTask = async (req, res, next) => {
	const { error, value } = validateTask(req.body);
	if (error) {
		return next(error, {
			success: false,
			error: 'Validation Error',
			details: error.details[0].message,
		});
	}

	try {
		const { id } = req.params;
		const task = await Task.findByIdAndUpdate(id, value, {
			new: true,
		});

		if (!task) {
			return res.status(404).json({
				success: false,
				error: 'Task not found',
			});
		}

		res.status(200).json({
			success: true,
			data: task,
		});
	} catch (error) {
		next(error);
	}
};

export const filterTasks = async (req, res, next) => {
	try {
		const {
			status,
			search,
			sortBy,
			page = 1,
			limit = 10,
			startDate,
			endDate,
			dueDate,
			tags,
			priority,
		} = req.query;
		const query = {};

		if (status) query.status = status;

		if (startDate && endDate) {
			query.dueDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
		} else if (dueDate) {
			query.dueDate = { $eq: new Date(dueDate) };
		}

		if (tags) query.tags = { $in: tags.split(',') };

		if (priority) query.priority = { $eq: priority };

		if (search)
			query.$or = [
				{ title: { $regex: search, $options: 'i' } },
				{ description: { $regex: search, $options: 'i' } },
			];

		const sortOptions = {};
		if (sortBy) {
			const [field, order] = sortBy.split(':');
			sortOptions[field] = order === 'desc' ? -1 : 1;
		}

		const skip = (page - 1) * limit;

		const tasks = await Task.find(query).sort(sortOptions).skip(skip).limit(Number(limit));

		const total = await Task.countDocuments(query);

		res.status(200).json({
			success: true,
			data: tasks,
			pagination: {
				page: Number(page),
				limit: Number(limit),
				total,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const deleteTask = async (req, res, next) => {
	try {
		const { id } = req.params;
		const task = await Task.findByIdAndDelete(id);
		if (!task) {
			return res.status(404).json({
				success: false,
				error: 'Task not found',
			});
		}

		res.status(200).json({
			success: true,
			data: task,
		});
	} catch (error) {
		next(error);
	}
};
