import mongoose, { Schema } from 'mongoose';
import { User, Role } from '../types/user';

const userSchema = new mongoose.Schema<User>({
    name: String,
    email: String,
    password: { type: String, select: false },
    createdAt: Date,
    updatedAt: Date,
    role: {
        type: String,
        enum: Role,
    },
    clubs: [
        {
            clubId: { type: Schema.Types.ObjectId, ref: 'clubs' },
            role: String,
        },
    ],
});

export const UserModel = mongoose.model<User>('users', userSchema);
