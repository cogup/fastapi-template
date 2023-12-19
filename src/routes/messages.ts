import { MakeRouters, Post, Reply, Request } from '@cogup/fastapi';
import { MessageRepository } from 'repositories/message';

interface PostMessageSlugRequest {
  userId: number;
}

export class MessageRouters extends MakeRouters {
  constructor() {
    super();

    this.messageRepository = MessageRepository;
  }

  @Post({
    path: '/api/messages/fake',
    summary: 'Create a fake message',
    description: 'Create a fake message',
    body: {
      type: 'object',
      properties: {
        userId: {
          type: 'number',
          description: 'User id'
        }
      }
    },
    responses: {
      200: {
        description: 'Message created',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'number'
                    },
                    message: {
                      type: 'string'
                    },
                    status: {
                      type: 'string'
                    },
                    userId: {
                      type: 'number'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  async postMessageFake(req: Request, reply: Reply) {
    const { userId } = req.body as PostMessageSlugRequest;

    const message = await this.messageRepository.createMessageFake(userId);

    reply.send({ message });
  }
}
