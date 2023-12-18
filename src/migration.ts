import 'dotenv/config';
import { sequelize } from './models';

async function migration() {
  await sequelize.sync({
    force: true
  });
}

migration();
