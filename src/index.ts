import { seed } from './startup/seed';
import { runServer } from './startup/server';

seed().then(() => {
  runServer();
});
