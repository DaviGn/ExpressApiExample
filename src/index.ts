import { seed } from 'seed';
import { runServer } from 'server';

seed().then(() => {
  runServer();
});
