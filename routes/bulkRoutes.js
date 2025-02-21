import express from 'express';
import {
	bulkCreateTasks,
	bulkUpdateTasks,
	bulkDeleteTasks,
} from '../controllers/bulkController.js';

const router = express.Router();

/**
 * @swagger
 * /api/bulk/tasks:
 *   post:
 *     summary: Create multiple tasks at once
 *     tags: [Bulk Operations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tasks
 *             properties:
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - title
 *                     - description
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [pending, in-progress, completed]
 *                     priority:
 *                       type: string
 *                       enum: [low, medium, high]
 *     responses:
 *       201:
 *         description: Tasks created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
router.post('/tasks', bulkCreateTasks);

/**
 * @swagger
 * /api/bulk/tasks:
 *   put:
 *     summary: Update multiple tasks at once
 *     tags: [Bulk Operations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tasks
 *             properties:
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [pending, in-progress, completed]
 *                     priority:
 *                       type: string
 *                       enum: [low, medium, high]
 *     responses:
 *       200:
 *         description: Tasks updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 */
router.put('/tasks', bulkUpdateTasks);

/**
 * @swagger
 * /api/bulk/tasks:
 *   delete:
 *     summary: Delete multiple tasks at once
 *     tags: [Bulk Operations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskIds
 *             properties:
 *               taskIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of task IDs to delete
 *     responses:
 *       200:
 *         description: Tasks deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.delete('/tasks', bulkDeleteTasks);

export default router;
