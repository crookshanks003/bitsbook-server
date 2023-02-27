interface ErrorMeta {
    tags: string[];
    [key: string]: any;
}

export enum AppErrorName {
    App = 'App',
    Validation = 'Validation',
    Database = 'Database',
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
    constructor(
        message: string,
        statusCode: number,
        meta: ErrorMeta = { tags: [] },
    ) {
        super(AppErrorName.Validation, message, statusCode, meta);
    }
}

export class DatabaseError extends AppError {
    constructor(
        message: string,
        statusCode: number,
        meta: ErrorMeta = { tags: [] },
    ) {
        super(AppErrorName.Database, message, statusCode, meta);
    }
}
