import express from 'express';
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask
} from '../controller/taskController.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

// All routes here assume user is authenticated
router.use(authMiddleware);

// Nested route: /api/projects/:projectId/tasks
router.post('/projects/:projectId/tasks', createTask);
router.get('/projects/:projectId/tasks', getAllTasks);

// Flat routes: /api/tasks/:taskId
router.put('/tasks/:taskId', updateTask);
router.delete('/tasks/:taskId', deleteTask);

export default router;
