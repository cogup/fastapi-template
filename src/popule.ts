import 'dotenv/config';
import { Message, User } from 'models';

export async function popule() {
  await User.create({
    name: 'John Doe'
  });

  await Message.create({
    message: 'Hello, world!',
    userId: 1
  });
}

popule();
