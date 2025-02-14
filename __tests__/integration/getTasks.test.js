import request from 'supertest';
import app from '../../server.js';
import Task from '../../models/taskModel.js';

describe('GET /api/tasks', () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  it('should get all tasks', async () => {
    // Create test tasks
    const testTasks = [
      {
        title: 'Test Task 1',
        description: 'First test task',
        status: 'TODO',
        priority: 'HIGH',
        tags: ['test'],
        dueDate: '2023-12-31',
      },
      {
        title: 'Test Task 2',
        description: 'Second test task',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        tags: ['test', 'important'],
        dueDate: '2024-01-15',
      },
    ];

    await Task.insertMany(testTasks);

    const response = await request(app).get('/api/tasks').expect(200);

    expect(response.body).toMatchObject({
      success: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          description: expect.any(String),
          status: expect.any(String),
          priority: expect.any(String),
          tags: expect.any(Array),
          dueDate: expect.any(String),
        }),
      ]),
    });
  });
});
//   it("should get a single task by ID", async () => {
//     const task = await Task.create({
//       title: "Single Test Task",
//       description: "Test task for single get",
//       status: "TODO",
//       priority: "HIGH",
//       tags: ["test"],
//       dueDate: "2023-12-31",
//     });

//     const response = await request(app)
//       .get(`/api/tasks/${task._id}`)
//       .expect(200);

//     expect(response.body).toHaveProperty("title", "Single Test Task");
//     expect(response.body).toHaveProperty("_id", task._id.toString());
//   });

//   it("should return 404 for non-existent task ID", async () => {
//     const nonExistentId = "507f1f77bcf86cd799439011";

//     await request(app).get(`/api/tasks/${nonExistentId}`).expect(404);
//   });

//   it("should filter tasks by status", async () => {
//     await Task.create([
//       {
//         title: "Todo Task",
//         description: "Task in TODO",
//         status: "TODO",
//         priority: "HIGH",
//         dueDate: "2023-12-31",
//       },
//       {
//         title: "Done Task",
//         description: "Task in DONE",
//         status: "DONE",
//         priority: "LOW",
//         dueDate: "2023-12-31",
//       },
//     ]);

//     const response = await request(app)
//       .get("/api/tasks")
//       .query({ status: "TODO" })
//       .expect(200);

//     expect(response.body).toHaveLength(1);
//     expect(response.body[0]).toHaveProperty("status", "TODO");
//   });
// });
