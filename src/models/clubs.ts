import mongoose from 'mongoose';
import { Role } from '../types/user';
import { Club } from '../types/club';

const clubSchema = new mongoose.Schema<Club>({
    name: String,
    userName: String,
    description: String,
    password: { type: String, select: false },
    createdAt: Date,
    version: { type: Number, default: 0 },
    roles: { type: [String], default: ['member'] },
    role: {
        type: String,
        enum: Role,
        default: Role.CLUB,
    },
    members: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            role: String,
        },
    ],
});

export const ClubModel = mongoose.model<Club>('clubs', clubSchema);
