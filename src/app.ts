import express from 'express';
import helmet from 'helmet';
import { httpLogger } from './middleware';
import { globalErrorHandler } from './middleware/error';
import router from './router';

export function createApp() {
    const app = express();

    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(httpLogger);

    app.use('/health', (_, res) => {
        res.status(200).send('health: OK!');
    });

    app.use(router);

    app.use(globalErrorHandler);

    return app;
}
