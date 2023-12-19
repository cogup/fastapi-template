import { MakeHandlers, Request, Reply, Create } from '@cogup/fastapi';
import { Message } from 'models';

export class MessageHandlers extends MakeHandlers {
  @Create(Message)
  getMessage(_request: Request, reply: Reply) {
    reply.status(201).send({
      message: 'Hello World'
    });
  }
}
