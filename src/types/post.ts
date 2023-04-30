import { Document, Types } from 'mongoose';

export interface PostComment {
    userId: Types.ObjectId;
    name: string;
    content: string;
    createdAt?: string;
}

export interface Post extends Document<Types.ObjectId> {
    title: string;
    content: string;
    createdAt: Date;
    version: number;
    author: Types.ObjectId;
    visibility: Visibility;
    comments: PostComment[];
    interested: Types.ObjectId[];
    liked: boolean;
}

export enum Visibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
}
