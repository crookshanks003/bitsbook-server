import { Types } from 'mongoose';

export interface UserClub {
    clubID: Types.ObjectId;
    role: string;
}

export interface ClubUser {
    userID: Types.ObjectId;
    role: string;
}

export interface Club {
    _id: Types.ObjectId;
    name: string;
    userName: string;
    password: string;
    description: string;
    createdAt: Date;
    members: ClubUser[];
}
