import express from "express";
import {
  getSubtasks,
  getSubtask,
  createSubtask,
} from "../controllers/subtasksController.js";

const subtaskRouter = express.Router();

subtaskRouter.get("/", (req, res, next) => getSubtasks(req, res, next));
subtaskRouter.get("/:subtaskId", (req, res, next) =>
  getSubtask(req, res, next),
);
subtaskRouter.post("/", (req, res, next) => createSubtask(req, res, next));

export default subtaskRouter;
