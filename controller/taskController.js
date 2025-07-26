import Task from "../models/Task.js";
import Project from "../models/Project.js";
import { verifyProjectOwnership } from "../utils/verifyOwnership.js";

// POST: Create a task
const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    await verifyProjectOwnership(req.user._id, projectId);

    const task = await Task.create({ ...req.body, project: projectId });

    await Project.findByIdAndUpdate(projectId, {
      $push: { tasks: task._id },
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET: Get all tasks for a project
const getAllTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    await verifyProjectOwnership(req.user._id, projectId);

    const tasks = await Task.find({ project: projectId });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT: Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) throw new Error("Task not found");

    await verifyProjectOwnership(req.user._id, task.project);

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) throw new Error("Task not found");

    // Check if the user owns the related project
    await verifyProjectOwnership(req.user._id, task.project);

    // Remove task reference from project
    await Project.findByIdAndUpdate(task.project, {
      $pull: { tasks: task._id },
    });

    // Now delete the task
    await Task.findByIdAndDelete(task._id);

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { createTask, getAllTasks, updateTask, deleteTask };
