import { Request } from 'express';
import { User } from './user';

export interface IRequestWithUser extends Request {
    user?: User;
}
