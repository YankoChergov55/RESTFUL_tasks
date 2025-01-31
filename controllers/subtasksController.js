import Task from "../models/taskModel.js";

export const getSubtasks = async (req, res, next) => {
  try {
    const params = req.baseUrl.split("/");
    const taskId = params[2];

    const task = await Task.findById(taskId);
    if (!task) {
      return next(error, "Task not found");
    }

    const subtasks = task.subtasks;
    if (!subtasks) {
      return next(error, "No subtasks found for this task");
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
    const params = req.originalUrl.split("/");
    console.log(params);
    const taskId = params[2];
    const subtaskId = params[4];
    console.log(`taskId: ${taskId}, subtaskId: ${subtaskId}`);

    const task = await Task.findById(taskId);
    console.log(`task: ${task}`);

    const subtasks = task.subtasks;
    console.log(`subtasks: ${subtasks}`);

    const targetSubtask = subtasks.find((subtask) => {
      let IDstring = subtask._id.toString();
      console.log(`IDstring ${IDstring} ${typeof IDstring}`);
      console.log(`subtaskId ${subtaskId} ${typeof subtaskId}`);
      return IDstring === subtaskId;
    });
    console.log(`targetSubtask: ${targetSubtask}`);

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
    const params = req.originalUrl.split("/");
    const taskId = params[2];
    console.log(params);
    console.log(taskId);

    const task = await Task.findById(taskId);
    console.log(task);

    const newSubtask = await Task.findByIdAndUpdate(taskId, {
      $push: {
        subtasks: req.body,
      },
    });

    res.status(200).json({
      success: true,
      data: newSubtask,
    });
  } catch (error) {
    next(error);
  }
};
