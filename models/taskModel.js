import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ["TODO", "IN_PROGRESS", "DONE"], 
        default: "TODO"
    }
}, {
    timestamps: true
})

export default mongoose.model("Task", taskSchema);