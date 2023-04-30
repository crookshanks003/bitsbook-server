import { Response, NextFunction } from 'express';
import { AuthorizationError } from '../utils/error';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { clubService, userService } from '../services';
import { IRequestWithUser } from '../types';
import { Role } from '../types/user';

export const auth = async (req: IRequestWithUser, _: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new AuthorizationError('No authorization header', 401, { tags: ['auth'] }));
    }

    try {
        const payload = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
        const id: string = payload['id'];
        const role: Role = payload['role'];
        if (role === Role.CLUB) {
            const user = await clubService.getClubWithId(id);
            if (!user) {
                return next(new AuthorizationError('Not authorized', 401, { tags: ['auth'] }));
            }
            req.user = {
                role: Role.CLUB,
                _id: user._id,
                version: user.version,
                createdAt: user.createdAt,
                name: user.name,
            };
        } else if (role === Role.USER || role === Role.ADMIN) {
            const user = await userService.getUserWithId(id);
            if (!user) {
                return next(new AuthorizationError('Not authorized', 401, { tags: ['auth'] }));
            }

            req.user = {
                role: Role.USER,
                _id: user._id,
                version: user.version,
                createdAt: user.createdAt,
                name: user.name,
            };
        } else {
            return next(new AuthorizationError('Unknown Role', 401, { tags: ['unknownRole'] }));
        }
        if (payload['version'] !== req.user.version) {
            return next(
                new AuthorizationError('Not authorized', 401, { tags: ['vesrionMismatch'] }),
            );
        }
        next();
    } catch (error) {
        next(new AuthorizationError('Failed to authorize', 403, { error, tags: ['auth'] }));
    }
};

export const adminAuth = async (req: IRequestWithUser, _: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== Role.ADMIN) {
        next(new AuthorizationError('Not Authorized', 401, { tags: ['adminAuth'] }));
    }

    next();
};

export const clubAuth = async (req: IRequestWithUser, _: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== Role.CLUB) {
        return next(new AuthorizationError('Not Authorized', 401, { tags: ['clubAuth'] }));
    }

    next();
};
