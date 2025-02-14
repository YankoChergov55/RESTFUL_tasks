import { Router } from 'express';
import {
  getTasks,
  getTask,
  filterTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const taskRouter = Router();

taskRouter.get('/', (req, res, next) => getTasks(req, res, next));
taskRouter.get('/filter', (req, res, next) => filterTasks(req, res, next));
taskRouter.get('/:id', (req, res, next) => getTask(req, res, next));
taskRouter.post('/', (req, res, next) => createTask(req, res, next));
taskRouter.put('/:id', (req, res, next) => updateTask(req, res, next));
taskRouter.delete('/:id', (req, res, next) => deleteTask(req, res, next));

export default taskRouter;
