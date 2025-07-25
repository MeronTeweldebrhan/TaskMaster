import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["To Do", "InProgress", "Done"],
    default: "To Do",
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

const Task=model("Task",taskSchema)

export default Task
