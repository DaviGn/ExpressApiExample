import * as dotenv from 'dotenv';

import { seed } from './startup/seed';
import { runServer } from './startup/server';

dotenv.config();

seed().then(() => {
  runServer();
});
