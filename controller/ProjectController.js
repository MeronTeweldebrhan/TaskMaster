import Project from "../models/Project.js";
import Task from "../models/Task.js";

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
    const projects = await Project.find({ createdBy: req.user._id }).populate("tasks","username");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("createdBy", "username")
      .populate("tasks");

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    if (project.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to view this project." });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const existing = await Project.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ message: "Project not found." });
    }

    if (existing.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized." });
    }

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
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "No project found with this id!" });
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete." });
    }

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
