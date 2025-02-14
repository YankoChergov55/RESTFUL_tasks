import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'DONE'],
      default: 'TODO',
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      default: 'LOW',
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
            required: [true, 'Subtask title is required'],
            trim: true,
          },
          status: {
            type: String,
            enum: ['TODO', 'IN_PROGRESS', 'DONE'],
            default: 'TODO',
          },
        },
      ],
      default: [],
    },
    dueDate: Date,
  },
  {
    timestamps: true,
  }
);

// Add indexes for common query fields
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ tags: 1 });

// Add compound indexes for common query patterns
taskSchema.index({ status: 1, priority: 1 }); // For filtering by status and priority
taskSchema.index({ status: 1, dueDate: 1 }); // For filtering by status and sorting by due date
taskSchema.index({ tags: 1, status: 1 }); // For filtering by tags and status

// Create a compound index for status and priority
taskSchema.index({ status: 1, priority: 1 });

// Add text index for title and description to enable text search
taskSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Task', taskSchema);
