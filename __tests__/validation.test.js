import taskSchema, { validateTask } from "../middleware/taskValidation";

describe("task validation", () => {
  it("should validate a task", () => {});

  describe("Task Validation Schema", () => {
    it("should validate a valid task with all fields", () => {
      const validTask = {
        title: "Complete project",
        description: "Finish the RESTful API project",
        status: "IN_PROGRESS",
        dueDate: "2025-03-01",
        tags: ["coding", "project"],
        priority: "HIGH",
        subtasks: [
          {
            title: "Write tests",
            status: "TODO",
          },
        ],
      };

      const { error } = validateTask(validTask);
      expect(error).toBeUndefined();
    });

    it("should validate a task with minimum required fields", () => {
      const minimalTask = {
        title: "Basic Task",
      };

      const { error, value } = validateTask(minimalTask);
      expect(error).toBeUndefined();
      expect(value.status).toBe("TODO");
      expect(value.priority).toBe("LOW");
    });

    it("should fail validation when title is missing", () => {
      const invalidTask = {
        description: "Task without title",
        status: "TODO",
      };

      const { error } = validateTask(invalidTask);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('"title" is required');
    });

    it("should fail validation with invalid status", () => {
      const taskWithInvalidStatus = {
        title: "Test Task",
        status: "PENDING", // Invalid status
      };

      const { error } = validateTask(taskWithInvalidStatus);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('"status" must be one of');
    });

    it("should fail validation with invalid priority", () => {
      const taskWithInvalidPriority = {
        title: "Test Task",
        priority: "URGENT", // Invalid priority
      };

      const { error } = validateTask(taskWithInvalidPriority);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('"priority" must be one of');
    });

    it("should validate subtasks correctly", () => {
      const taskWithSubtasks = {
        title: "Main Task",
        subtasks: [
          { title: "Subtask 1", status: "TODO" },
          { title: "Subtask 2", status: "IN_PROGRESS" },
        ],
      };

      const { error } = validateTask(taskWithSubtasks);
      expect(error).toBeUndefined();
    });

    it("should fail validation with invalid subtask", () => {
      const taskWithInvalidSubtask = {
        title: "Main Task",
        subtasks: [
          { status: "TODO" }, // Missing title in subtask
        ],
      };

      const { error } = validateTask(taskWithInvalidSubtask);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain(
        '"subtasks[0].title" is required',
      );
    });
  });
});
