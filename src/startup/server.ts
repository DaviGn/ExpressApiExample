import 'reflect-metadata';
import '@di/container';
import 'express-async-errors';
import express from 'express';

import logs from '@middlewares/logs';
import errors from '@middlewares/errors';
import routes from '@routes/index';

const port = process.env.PORT ?? 3333;

export function runServer() {
  const server = express();
  server.use(express.json());
  server.use(logs);
  server.use(routes);
  server.use(errors);

  server.listen(port, () => {
    console.log('Server is running!');
  });
}
