import { Types, Document } from 'mongoose';
import { UserClub } from './club';

export enum Role {
    ADIMIN = 'admin',
    USER = 'user',
}

export interface User extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
    clubs: UserClub[];
}
