import { Reply, Request, MakeRouters, Get, OpenAPI } from '@cogup/fastapi';
import fs from 'fs';
import mime from 'mime-types';

interface File {
  content: string;
  contentType: string;
}

export class PublicRoutes extends MakeRouters {
  openAPISpec?: string;

  setOpenAPISpec(openAPISpec: OpenAPI) {
    this.openAPISpec = JSON.stringify(openAPISpec);
  }

  @Get('/api/*')
  async apiRouter(request: Request, reply: Reply): Promise<Reply> {
    return reply.code(404).send({
      error: {
        code: 404,
        message: 'Not found'
      }
    });
  }

  @Get('/*')
  async publicRouter(request: Request, reply: Reply): Promise<Reply> {
    const path = request.url.split('?')[0].split('#')[0];
    const filename =
      path === '/' || path === '/"index.html"'
        ? 'index.html'
        : path.replace('//', '');

    if (filename === 'index.html' || !this.fileExists(`./public/${filename}`)) {
      const file = this.loadFile(`./public/index.html`);

      const content = file.content.replace(
        '</head>',
        `<script>window.specification=${this.openAPISpec}</script></head>`
      );

      return reply.header('Content-Type', file.contentType).send(content);
    } else if (filename === 'manifest.json') {
      return reply.header('Content-Type', 'application/json').send({
        short_name: 'FastApi',
        name: 'FastApi Template API',
        icons: [
          {
            src: '/icons/64.png',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          },
          {
            src: '/icons/192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: '/icons/512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ],
        start_url: '/admin',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff'
      });
    }

    const file = this.loadFile(`./public/${filename}`);
    return reply.header('Content-Type', file.contentType).send(file.content);
  }

  fileExists(filename: string): boolean {
    try {
      fs.accessSync(filename);
      return true;
    } catch {
      return false;
    }
  }

  loadFile(filename: string): File {
    const content = fs.readFileSync(filename, 'utf-8');
    const contentType = mime.lookup(filename);

    if (!contentType) {
      return {
        content,
        contentType: 'text/plain'
      };
    }

    return {
      content,
      contentType
    };
  }
}
