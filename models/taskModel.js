import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
      default: "TODO",
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "LOW",
    },
    tags: {
      type: [String],
      default: [],
    },
    subtasks: {
      type: [
        {
          title: {
            type: String,
            required: [true, "Subtask title is required"],
            trim: true,
          },
          status: {
            type: String,
            enum: ["TODO", "IN_PROGRESS", "DONE"],
            default: "TODO",
          },
        },
      ],
      default: [],
    },
    dueDate: Date,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Task", taskSchema);
