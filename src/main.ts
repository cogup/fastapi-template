import 'dotenv/config';
import packageJson from '../package.json';
const version = packageJson.version;
import { FastAPI } from '@cogup/fastapi';
import { schema, sequelize } from 'models';
import { MessageRouters } from 'routes/messages';
import { AdminRouters } from '@cogup/fastapi-x-admin';
import { MessageHandlers } from 'handlers/message';

async function main() {
  const fastAPI = new FastAPI({
    info: {
      title: 'FastApi',
      description: 'FastApi API.',
      version: version
    },
    schema,
    routes: [MessageRouters, AdminRouters],
    handlers: [MessageHandlers],
    sequelize,
    listen: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
      host: process.env.HOST ?? '0.0.0.0'
    },
    servers: [
      {
        url:
          process.env.SERVER_URL ??
          `http://${process.env.HOST ?? 'localhost'}:${
            process.env.PORT ?? 3000
          }`
      }
    ]
  });

  await fastAPI.listen();
}

main();
