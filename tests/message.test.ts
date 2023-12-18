import 'dotenv/config';
import { FastAPI } from '@cogup/fastapi';
import { schema, sequelize } from 'models';
import { MessageRouters } from 'routes/messages';

if (process.env.DATABASE_URL === undefined) {
  throw new Error('DATABASE_URL required.');
}

describe('chat', () => {
  let fastAPI: any;

  beforeAll(async () => {
    fastAPI = new FastAPI({
      schema,
      routes: [MessageRouters],
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
});
