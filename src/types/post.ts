import { Document, Types } from 'mongoose';

export interface Post extends Document<Types.ObjectId> {
    title: string;
    content: string;
    createdAt: Date;
    version: number;
    author: Types.ObjectId;
    visibility: Visibility;
}

export enum Visibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
}
