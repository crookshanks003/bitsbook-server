import { plainToInstance } from 'class-transformer';
import {
    ValidationError as ClassValidationError,
    validate,
    ValidatorOptions,
} from 'class-validator';
import { RequestHandler } from 'express';
import { ValidationError } from '../utils/error';

export function validateBody(type: any, opts?: ValidatorOptions): RequestHandler {
    return (req, _, next) => {
        const output = plainToInstance(type, req.body);
        validate(output, opts).then((errors: ClassValidationError[]) => {
            if (errors.length > 0) {
                const err = errors.map((e) => {
                    return { property: e.property, constraints: Object.values(e.constraints) };
                });
                return next(
                    new ValidationError('Invalid request body', 400, {
                        errors: err,
                        tags: ['validation'],
                    }),
                );
            }
            req.body = output;
            next();
        });
    };
}
