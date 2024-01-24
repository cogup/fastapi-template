import 'dotenv/config';
import { FastAPI } from '@cogup/fastapi';
import { schema, sequelize } from 'models';
import { MessageRouters } from 'routes/messages';
import { MessageHandlers } from 'services/handlers/message';

describe('chat', () => {
  let fastAPI: any;

  beforeAll(async () => {
    fastAPI = new FastAPI({
      schema,
      routes: [MessageRouters],
      handlers: [MessageHandlers],
      sequelize
    });
  });

  test('should be able to create a chat', async () => {
    const users = await fastAPI.api.inject({
      method: 'GET',
      url: '/api/users'
    });

    expect(users.statusCode).toBe(200);
  });

  test('should be able to create a fake', async () => {
    const message = await fastAPI.api.inject({
      method: 'POST',
      url: '/api/messages/fake',
      payload: {
        userId: 1
      }
    });

    expect(message.statusCode).toBe(200);
  });

  test('should be able to handler get one', async () => {
    const message = await fastAPI.api.inject({
      method: 'POST',
      url: '/api/messages',
      payload: {
        userId: 1
      }
    });

    expect(message.statusCode).toBe(201);
    expect(message.json()).toEqual({
      message: 'Hello World',
      status: 'pending'
    });
  });
});
