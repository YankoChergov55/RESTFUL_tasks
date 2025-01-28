import joi from "joi";

const taskSchema = joi.object({
    title: joi.string().required(),
    description: joi.string(),
    status: joi.string().valid("TODO", "IN_PROGRESS", "DONE").default("TODO"),
    dueDate: joi.date()
});

export default function validateTask(task) {
    return taskSchema.validate(task);
};