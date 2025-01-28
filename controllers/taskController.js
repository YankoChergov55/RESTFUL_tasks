import Task from "../models/taskModel.js";

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
    try {
        const {title, description} = req.body;
        const task = await Task.create({title, description});
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
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body, {
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