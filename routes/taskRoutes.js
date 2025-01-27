import {Router} from "express";
import {getTasks} from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.get("/", (req, res, next) => {
    getTasks(req, res, next);
})
taskRouter.get("/:id", (req, res) => {})
taskRouter.post("/", (req, res) => {})
taskRouter.put("/:id", (req, res) => {})
taskRouter.delete("/:id", (req, res) => {})

export default taskRouter;