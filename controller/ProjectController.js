import Project from "../models/Project.js";
import Task from "../models/Task.js";
import { verifyProjectOwnership } from '../utils/verifyOwnership.js'; 


// Create project
const createProject = async (req, res) => {
  try {

    const newProject = await Project.create({
      ...req.body,
      createdBy: req.user._id,
    });

    const populatedProject = await Project.findById(newProject._id)
      .populate("createdBy", "username")
      .populate({
        path: "tasks",
        select: "title status",
      });

    res.json(populatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get projects for current user
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user._id }).populate("createdBy", "username")
      .populate("tasks");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await verifyProjectOwnership(req.user._id, req.params.id);

    const populated = await Project.findById(project._id)
      .populate("createdBy", "username")
      .populate("tasks");

    res.json(populated);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
// Update project
const updateProject = async (req, res) => {
  try {
     await verifyProjectOwnership(req.user._id, req.params.id);

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    await verifyProjectOwnership(req.user._id, req.params.id)

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
