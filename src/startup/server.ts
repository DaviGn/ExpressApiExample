import 'reflect-metadata';
import '@di/container';
import 'express-async-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';

import logs from '@middlewares/logs';
import errors from '@middlewares/errors';
import routes from '@routes/index';

const port = process.env.PORT ?? 3333;

const appRootPath = path.join(__dirname, '../');

export function runServer() {
    const server = express();
    server.use(cors());
    server.use(
        '/images',
        express.static(path.join(appRootPath, 'content', 'images'))
    );
    server.use(express.json());
    server.use(logs);
    server.use(routes);
    server.use(errors);

    server.listen(port, () => {
        console.log(`Server is running on port ${port}!`);
    });
}
