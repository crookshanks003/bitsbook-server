import { logger } from './logger';

interface ErrorMeta {
    tags: string[];
    [key: string]: any;
}

export enum AppErrorName {
    App = 'App',
    Validation = 'Validation',
    Database = 'Database',
    User = 'User',
    Auth = 'Auth',
    Server = 'Server',
}

export class AppError extends Error {
    name: AppErrorName;
    message: string;
    statusCode: number;
    meta: ErrorMeta;

    constructor(
        name: AppErrorName = AppErrorName.App,
        message: string,
        statusCode: number,
        meta: ErrorMeta = { tags: [] },
    ) {
        super(message);
        this.statusCode = statusCode;
        this.meta = !meta.tags ? { tags: [] } : meta;
        this.name = name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string, statusCode: number, meta: ErrorMeta = { tags: [] }) {
        super(AppErrorName.Validation, message, statusCode, meta);
    }
}

export class DatabaseError extends AppError {
    constructor(message: string, statusCode: number, meta: ErrorMeta = { tags: [] }) {
        super(AppErrorName.Database, message, statusCode, meta);
    }
}

export class UserError extends AppError {
    constructor(message: string, statusCode: number, meta: ErrorMeta = { tags: [] }) {
        super(AppErrorName.User, message, statusCode, meta);
    }
}

export class AuthorizationError extends AppError {
    constructor(message: string, statusCode: number, meta: ErrorMeta = { tags: [] }) {
        super(AppErrorName.Auth, message, statusCode, meta);
    }
}

export class ServerError extends AppError {
    constructor(message: string, meta: ErrorMeta = { tags: [] }) {
        super(AppErrorName.Server, message, 500, meta);
    }
}

process.on('unhandledRejection', (error) => {
    logger.error('Unhandled Rejection', {
        error,
        tags: ['unhandled-rejection'],
    });

    process.exit(1);
});

process.on('uncaughtException', (error) => {
    logger.error(error.name, {
        error,
        tags: ['uncaught-exception'],
    });

    process.exit(1);
});
