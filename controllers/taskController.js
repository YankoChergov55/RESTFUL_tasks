import Task from "../models/taskModel.js";
import validateTask from "../middleware/taskValidation.js";

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
}

export const createTask = async (req, res, next) => {
    const {error, value} = validateTask(req.body);
    if (error) {
        return next(error, {
            success: false,
            error: 'Validation Error',
            details: error.details[0].message
        });
    }
    
    try {
        const task = await Task.create(value);
        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
}

export const getTask = async (req, res, next) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        res.status(200).json({
            success: true,
            data: task
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async(req, res, next) => {
    const {error, value} = validateTask(req.body);
    if (error) {
        return next(error, {
            success: false,
            error: 'Validation Error',
            details: error.details[0].message
        });
    }

    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(id, value, {
            new: true
        });
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try{
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
}