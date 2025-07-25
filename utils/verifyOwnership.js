import Project from '../models/Project.js';

// Middleware to check project ownership
export  const verifyProjectOwnership = async (userId, projectId) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error('Project not found');
  if (project.createdBy.toString() !== userId.toString()) throw new Error('Not authorized');
  return project;
};