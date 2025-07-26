import express from 'express'
import { authMiddleware } from '../utils/auth.js'
import { createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject, } from '../controller/ProjectController.js'
 

const router =express.Router()

router.use(authMiddleware)

//Create New project
router.post('/',createProject);                   //@Checked
// Get all projects owned by the current user
router.get('/',getProjects);                       //@Checked
// Get a single project by ID (ownership required)
router.get('/:id',getProjectById);                     //@Checked
// Update a project (ownership required)
router.put('/:id',updateProject);                       //@Checked
//Delete project
router.delete('/:id',deleteProject)                      //@Checked


export default router