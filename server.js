import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import {errorHandler} from "./middleware/errorHandler.js";
import {connectDB} from "./util/db.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Welcome to the Task Manager API");
})

app.use('/tasks', taskRoutes);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server running on port ${process.env.PORT}`);
});