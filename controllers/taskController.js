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