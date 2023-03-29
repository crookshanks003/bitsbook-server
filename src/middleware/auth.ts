import { Response, NextFunction } from 'express';
import { AuthorizationError } from '../utils/error';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { userService } from '../services';
import { IRequestWithUser } from '../types';
import { Role } from '../types/user';

export const auth = async (req: IRequestWithUser, _: Response, next: NextFunction) => {
    if (req.originalUrl === '/auth/login' || req.originalUrl === '/auth/register') {
        return next();
    }

    const { token } = req.cookies;
    if (!token) {
        return next(new AuthorizationError('No authorization header', 401, { tags: ['auth'] }));
    }

    try {
        const payload = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
        const id: string = payload['id'];
        const user = await userService.getUserWithId(id);
        if (!user) {
            return next(new AuthorizationError('Not authorized', 401, { tags: ['auth'] }));
        }
        if (payload['version'] !== user.version) {
            return next(
                new AuthorizationError('Not authorized', 401, { tags: ['vesrionMismatch'] }),
            );
        }
        req.user = user;
        next();
    } catch (error) {
        return next(new AuthorizationError('Failed to authorize', 403, { tags: ['auth'] }));
    }
};

export const adminAuth = async (req: IRequestWithUser, _: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== Role.ADMIN) {
        return next(new AuthorizationError('Not Authorized', 401, { tags: ['adminAuth'] }));
    }

    next();
};
