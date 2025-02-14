import Task from '../models/taskModel.js';

export const getSubtasks = async (err, req, res, next) => {
  try {
    const params = req.baseUrl.split('/');
    const taskId = params[2];

    const task = await Task.findById(taskId);
    if (!task) {
      return next(err, 'Task not found');
    }

    const subtasks = task.subtasks;
    if (!subtasks) {
      return next(err, 'No subtasks found for this task');
    }

    res.status(200).json({
      success: true,
      data: subtasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubtask = async (req, res, next) => {
  try {
    const params = req.originalUrl.split('/');
    const taskId = params[2];
    const subtaskId = params[4];

    const task = await Task.findById(taskId);

    const subtasks = task.subtasks;

    const targetSubtask = subtasks.find((subtask) => {
      let IDstring = subtask._id.toString();
      return IDstring === subtaskId;
    });

    res.status(200).json({
      success: true,
      data: targetSubtask,
    });
  } catch (error) {
    next(error);
  }
};

export const createSubtask = async (req, res, next) => {
  try {
    const params = req.originalUrl.split('/');
    const taskId = params[2];

    await Task.findByIdAndUpdate(taskId, {
      $push: {
        subtasks: req.body,
      },
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubtask = async (err, req, res, next) => {
  try {
    const params = req.originalUrl.split('/');
    const taskId = params[2];
    const subtaskId = params[4];

    const task = await Task.findById(taskId);

    const subtasks = task.subtasks;

    const subtaskIndex = subtasks.findIndex((subtask) => subtask._id.toString() === subtaskId);
    if (subtaskIndex === -1) {
      return next(err, 'Subtask not found');
    }

    const updatedSubtask = subtasks[subtaskIndex];
    Object.assign(updatedSubtask, req.body);

    await task.save();

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubtask = async (err, req, res, next) => {
  try {
    const params = req.originalUrl.split('/');
    const taskId = params[2];
    const subtaskId = params[4];

    const task = await Task.findById(taskId);

    const subtasks = task.subtasks;

    const subtaskIndex = subtasks.findIndex((subtask) => subtask._id.toString() === subtaskId);
    if (subtaskIndex === -1) {
      return next(err, 'Subtask not found');
    }

    subtasks.splice(subtaskIndex, 1);

    await task.save();

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};
