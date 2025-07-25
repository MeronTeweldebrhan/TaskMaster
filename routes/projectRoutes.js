import express from 'express'
import { authMiddleware } from '../utils/auth.js'
import { createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject, } from '../controller/ProjectController.js'
  import taskRoutes from './taskRoutes.js'

const router =express.Router()

router.use(authMiddleware)

//Create New project
router.post('/',createProject);
// Get all projects owned by the current user
router.get('/',getProjects);
// Get a single project by ID (ownership required)
router.get('/:id',getProjectById);
// Update a project (ownership required)
router.put('/:id',updateProject);
//Delete project
router.delete('/id',deleteProject)

router.use('/:projectId/tasks', taskRoutes)
export default router