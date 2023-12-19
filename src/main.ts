import 'dotenv/config';
import packageJson from '../package.json';
const version = packageJson.version;
import { FastAPI } from '@cogup/fastapi';
import { schema, sequelize } from 'models';
import { MessageRouters } from 'routes/messages';
import { PublicRoutes } from 'routes/public';

async function main() {
  const publicRoutes = new PublicRoutes();

  const fastAPI = new FastAPI({
    info: {
      title: 'CoFastApi Template API',
      description: 'FastApi Template API.',
      version: version
    },
    schema,
    routes: [MessageRouters, publicRoutes],
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

  publicRoutes.setOpenAPISpec(fastAPI.getOpenAPISpec());

  await fastAPI.listen();
}

main();
