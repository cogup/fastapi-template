import { MessageRepository } from 'repositories/message';

export class MessageService {
  static async createMessageFake(user: number) {
    return await MessageRepository.createMessageFake(user);
  }
}
