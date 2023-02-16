import { logger } from '../utils/logger';
import { RequestHandler } from 'express';

export const httpLogger: RequestHandler = (req, _, next) => {
    logger.info('Incoming Request', {
        time: new Date().toString(),
        method: req.method,
        body: { ...req.body },
        query: { ...req.query },
        url: req.originalUrl,
    });

    next();
};
