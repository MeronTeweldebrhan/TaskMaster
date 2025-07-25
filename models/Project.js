import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    
  },
  tasks: [
    {
        type :Schema.Types.ObjectId,
        ref:"Task"
    }
  ]
});

const Project = model("Project", projectSchema);

export default Project;
