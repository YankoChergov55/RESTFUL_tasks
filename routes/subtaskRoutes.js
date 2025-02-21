import express from 'express';
import {
	getSubtasks,
	getSubtask,
	createSubtask,
	updateSubtask,
	deleteSubtask,
} from '../controllers/subtasksController.js';

const subtaskRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Subtask:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - taskId
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         title:
 *           type: string
 *           description: Subtask title
 *         description:
 *           type: string
 *           description: Detailed subtask description
 *         status:
 *           type: string
 *           enum: [pending, in-progress, completed]
 *           default: pending
 *         taskId:
 *           type: string
 *           description: ID of the parent task
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/tasks/{taskId}/subtasks:
 *   get:
 *     summary: Get all subtasks for a task
 *     tags: [Subtasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: List of subtasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subtask'
 *       404:
 *         description: Task not found
 */
subtaskRouter.get('/', (req, res, next) => getSubtasks(req, res, next));

/**
 * @swagger
 * /api/tasks/{taskId}/subtasks/{subtaskId}:
 *   get:
 *     summary: Get a subtask by ID
 *     tags: [Subtasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *       - in: path
 *         name: subtaskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subtask ID
 *     responses:
 *       200:
 *         description: Subtask details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subtask'
 *       404:
 *         description: Subtask not found
 */
subtaskRouter.get('/:subtaskId', (req, res, next) => getSubtask(req, res, next));

/**
 * @swagger
 * /api/tasks/{taskId}/subtasks:
 *   post:
 *     summary: Create a new subtask
 *     tags: [Subtasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *     responses:
 *       201:
 *         description: Subtask created successfully
 *       404:
 *         description: Task not found
 */
subtaskRouter.post('/', (req, res, next) => createSubtask(req, res, next));

/**
 * @swagger
 * /api/tasks/{taskId}/subtasks/{subtaskId}:
 *   put:
 *     summary: Update a subtask
 *     tags: [Subtasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *       - in: path
 *         name: subtaskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subtask ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *     responses:
 *       200:
 *         description: Subtask updated successfully
 *       404:
 *         description: Subtask not found
 */
subtaskRouter.put('/:subtaskId', (req, res, next) => updateSubtask(req, res, next));

/**
 * @swagger
 * /api/tasks/{taskId}/subtasks/{subtaskId}:
 *   delete:
 *     summary: Delete a subtask
 *     tags: [Subtasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *       - in: path
 *         name: subtaskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subtask ID
 *     responses:
 *       200:
 *         description: Subtask deleted successfully
 *       404:
 *         description: Subtask not found
 */
subtaskRouter.delete('/:subtaskId', (req, res, next) => deleteSubtask(req, res, next));

export default subtaskRouter;
