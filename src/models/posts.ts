import mongoose from 'mongoose';
import { Post, Visibility } from '../types/post';

const postSchema = new mongoose.Schema<Post>({
    title: String,
    content: String,
    createdAt: Date,
    version: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'clubs' },
    visibility: { type: String, enum: Visibility, default: Visibility.PUBLIC },
});

export const PostModel = mongoose.model<Post>('posts', postSchema);
