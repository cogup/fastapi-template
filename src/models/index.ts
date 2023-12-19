import { ResourceType, SchemaModelsBuilder } from '@cogup/fastapi';
import { Sequelize } from 'sequelize';

if (process.env.DATABASE_URL === undefined) {
  throw new Error('DATABASE_URL required.');
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
