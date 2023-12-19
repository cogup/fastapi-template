import { Model, DataTypes } from '@cogup/fastapi';
import { sequelize } from '.';

enum MessageStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ERROR = 'error',
  AWAIT = 'await'
}

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(
        MessageStatus.PENDING,
        MessageStatus.COMPLETED,
        MessageStatus.ERROR,
        MessageStatus.AWAIT
      ),
      defaultValue: MessageStatus.PENDING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Message'
  }
);

export { Message, MessageStatus };
