import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../utils/error';

export const adminAuth = async (req: Request, _: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
        return next(
            new AuthorizationError('No authorization header', 401, { tags: ['adminAuth'] }),
        );
    }

    //only for first sprint, this will be changed to a token once we have a login system
    if (token !== 'admin') {
        return next(new AuthorizationError('Not authorized', 403, { tags: ['adminAuth'] }));
    }

    next();
};
