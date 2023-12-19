import { ResourceType, SchemaModelsBuilder, Sequelize } from '@cogup/fastapi';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const sequelize = new Sequelize(process.env.DATABASE_URL);

import { Message } from './message';
import { User } from './user';

Message.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Message, { foreignKey: 'userId' });

const schema = new SchemaModelsBuilder();

schema.addResource(User, {
  user: {
    search: true
  }
});

schema.addResource(Message, {
  message: {
    search: true,
    type: ResourceType.CODE
  }
});

export { sequelize, schema, Message, User };
