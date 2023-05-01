import mongoose, { Schema } from 'mongoose';
import { User, Role } from '../types/user';

const userSchema = new mongoose.Schema<User>({
    version: { type: Number, default: 0 },
    name: String,
    email: String,
    password: { type: String, select: false },
    createdAt: Date,
    updatedAt: Date,
    role: {
        type: String,
        enum: Role,
        default: Role.USER,
    },
    clubs: [
        {
            clubId: { type: Schema.Types.ObjectId, ref: 'clubs' },
            createdAt: { type: Date, default: Date.now },
            role: String,
        },
    ],
});

export const UserModel = mongoose.model<User>('users', userSchema);
