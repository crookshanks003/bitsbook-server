import mongoose from 'mongoose';
import { Club } from '../types/club';

const clubSchema = new mongoose.Schema<Club>({
    name: String,
    userName: String,
    description: String,
    password: String,
    createdAt: Date,
    members: [
        {
            userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            role: String,
        },
    ],
});

export const ClubModel = mongoose.model<Club>('clubs', clubSchema);
