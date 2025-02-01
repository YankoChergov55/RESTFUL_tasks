import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { connectDB } from "./util/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import subtaskRoutes from "./routes/subtaskRoutes.js";
import bulkRoutes from "./routes/bulkRoutes.js";

const app = express();

dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/tasks/:taskId/subtasks", subtaskRoutes);
app.use("/api/bulk", bulkRoutes);

// Handle 404 errors for non-existent routes
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server running on port ${process.env.PORT}`);
});
