import { Builder, Request, Reply, Create } from '@cogup/fastapi';
import { Message } from 'models';

export class MessageHandlers extends Builder {
  @Create(Message)
  getMessage(_request: Request, reply: Reply) {
    reply.status(201).send({
      message: 'Hello World'
    });
  }
}
