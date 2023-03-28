import { Types, Document } from 'mongoose';
import { UserClub } from './club';

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    CLUB = 'club',
}

interface BaseUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
    version: number;
}

export interface User extends BaseUser {
    clubs: UserClub[];
}

export interface PopulatedClubForUser {
    clubId: {
        _id: string;
        name: string;
        userName: string;
        description: string;
        createdAt: Date;
        __v: 0;
    };
    role: string;
    createdAt: Date;
    _id: string;
}

export interface PopulatedUser extends BaseUser {
    clubs: PopulatedClubForUser[];
}
