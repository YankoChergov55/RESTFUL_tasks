import express from 'express';
import {
  bulkCreateTasks,
  bulkUpdateTasks,
  bulkDeleteTasks,
} from '../controllers/bulkController.js';

const router = express.Router();

router.post('/tasks', bulkCreateTasks);
router.put('/tasks', bulkUpdateTasks);
router.delete('/tasks', bulkDeleteTasks);

export default router;
