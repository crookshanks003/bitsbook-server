import { Types, Document } from 'mongoose';
import { Role } from './user';

export interface UserClub {
    clubId: string;
    role: string;
}

export interface ClubUser {
    userId: string;
    role: string;
}

export interface Club extends Document {
    _id: Types.ObjectId;
    name: string;
    userName: string;
    password?: string;
    description: string;
    createdAt: Date;
    roles: string[];
    version: number;
    members: ClubUser[];
    role: Role;
}
