import joi from "joi";

const taskSchema = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  status: joi.string().valid("TODO", "IN_PROGRESS", "DONE").default("TODO"),
  dueDate: joi.date(),
  tags: joi.array().items(joi.string()),
  priority: joi
    .string()
    .valid("LOW", "MEDIUM", "HIGH", "CRITICAL")
    .default("LOW"),
  subtasks: joi.array().items(
    joi.object({
      title: joi.string().required(),
      status: joi.string().valid("TODO", "IN_PROGRESS", "DONE").default("TODO"),
    }),
  ),
});

export default function validateTask(task) {
  return taskSchema.validate(task);
}
