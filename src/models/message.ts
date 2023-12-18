import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';

enum MessageStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ERROR = 'error',
  AWAIT = 'await'
}

class /* The `Message` class is a Sequelize model representing a message entity in a database. It
defines the structure and properties of a message, including its id, message content, status,
and userId. The `Message` class also initializes the model using the `init` method provided by
Sequelize, specifying the data types and constraints for each property. The `MessageStatus`
enum is used to define the possible values for the `status` property. */
Message extends Model {}

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
      )
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
