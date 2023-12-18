import { Message } from 'models/message';

export class MessageRepository {
  static async createMessageFake(user: number) {
    return await Message.create({ message: 'Fake message!', userId: user });
  }
}
