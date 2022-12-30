import * as dotenv from 'dotenv';
dotenv.config();

import { seed } from './startup/seed';
import { runServer } from './startup/server';

seed().then(() => {
  runServer();
});
