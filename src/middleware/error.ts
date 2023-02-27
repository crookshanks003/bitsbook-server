import { ErrorRequestHandler } from 'express';
import { AppError } from 'src/utils/error';
import { logger } from '../utils/logger';
import { Error } from '../utils/response';

export const globalErrorHandler: ErrorRequestHandler = (
    err: AppError,
    req,
    res,
    _,
) => {
    logger.error(`${err.name}: ${err.message}`, {
        method: req.method,
        url: req.originalUrl,
        meta: { ...err.meta },
        stack: err.stack,
    });
    res.status(err.statusCode).json(Error(err.message, err));
};
