import request from 'supertest';
import app from '../../server.js';
import Task from '../../models/taskModel.js';

describe('PUT /api/tasks/:id', () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  it('should update an existing task', async () => {
    const task = await Task.create({
      title: 'Original Task',
      description: 'Original description',
      status: 'TODO',
      priority: 'LOW',
      tags: ['original'],
      dueDate: '2023-12-31',
    });

    const updatedData = {
      title: 'Updated Task',
      description: 'Updated description',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      tags: ['updated'],
      dueDate: '2024-01-15',
    };

    const response = await request(app).put(`/api/tasks/${task._id}`).send(updatedData).expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data.title).toBe(updatedData.title);
    expect(response.body.data.description).toBe(updatedData.description);
    expect(response.body.data.status).toBe(updatedData.status);
    expect(response.body.data.priority).toBe(updatedData.priority);
    expect(response.body.data.tags).toEqual(expect.arrayContaining(updatedData.tags));
  });

  it('should return 404 when updating non-existent task', async () => {
    const nonExistentId = '507f1f77bcf86cd799439011';

    const updatedData = {
      title: 'Updated Task',
      status: 'IN_PROGRESS',
    };

    await request(app).put(`/api/tasks/${nonExistentId}`).send(updatedData).expect(404);
  });

  it('should keep existing fields when updating partially', async () => {
    const task = await Task.create({
      title: 'Original Task',
      description: 'Original description',
      status: 'TODO',
      priority: 'MEDIUM',
      tags: ['original'],
      dueDate: '2023-12-31',
    });

    const partialUpdate = {
      title: 'Updated Title',
      status: 'IN_PROGRESS',
    };

    const response = await request(app)
      .put(`/api/tasks/${task._id}`)
      .send(partialUpdate)
      .expect(200);

    expect(response.body).toMatchObject({
      success: true,
      data: expect.objectContaining({
        title: partialUpdate.title,
        status: partialUpdate.status,
      }),
    });
  });
});
