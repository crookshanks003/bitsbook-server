import mongoose from 'mongoose';
import { Club } from '../types/club';

const clubSchema = new mongoose.Schema<Club>({
    name: String,
    userName: String,
    description: String,
    password: { type: String, select: false },
    createdAt: Date,
    members: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            role: String,
        },
    ],
});

export const ClubModel = mongoose.model<Club>('clubs', clubSchema);
