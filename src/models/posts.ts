import mongoose from 'mongoose';
import { Post, Visibility } from '../types/post';

const postSchema = new mongoose.Schema<Post>({
    title: String,
    content: String,
    createdAt: Date,
    version: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'clubs' },
    visibility: { type: String, enum: Visibility, default: Visibility.PUBLIC },
    comments: {
        type: [
            {
                name: String,
                userId: mongoose.Schema.Types.ObjectId,
                content: String,
                createdAt: { type: Date, default: Date.now },
            },
        ],
        default: [],
    },
    interested: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], default: [] },
});

export const PostModel = mongoose.model<Post>('posts', postSchema);
