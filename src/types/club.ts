import { Types, Document } from 'mongoose';

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
    password: string;
    description: string;
    createdAt: Date;
    members: ClubUser[];
}
