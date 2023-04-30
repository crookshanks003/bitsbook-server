import { AppError } from './error';

interface Response {
    time: number;
    payload: any;
    message: string;
}

export function Normal(message: string, payload?: any): Response {
    return {
        time: Number(new Date()),
        message,
        payload,
    };
}

export function Error(message: string, err: AppError): Response {
    const { error: _, ...meta } = err.meta;
    return {
        time: Number(new Date()),
        message,
        payload: {
            message: err.message,
            meta: meta,
        },
    };
}
