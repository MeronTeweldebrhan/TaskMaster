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


router.post('/:projectId', createTask);    //@Checked
router.get('/:projectId', getAllTasks);     

// Flat routes: /api/tasks/:taskId
router.put('/:taskId', updateTask);     //@Checked
router.delete('/:taskId', deleteTask);   //@Checked

export default router;
