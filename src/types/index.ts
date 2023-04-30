import { Request } from 'express';
import { Types } from 'mongoose';
import { Role } from './user';

interface RequestUser {
    _id: Types.ObjectId;
    role: Role;
    createdAt: Date;
    version: number;
    name: string;
}

export interface IRequestWithUser extends Request {
    user?: RequestUser;
}
