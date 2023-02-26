import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    studentID: String,
    email: String,
    role: {
        type: String,
        enum: ['admin', 'user', 'club_admin'],
    },
    clubs: [
        {
            clubID: String,
            name: String,
            role: {
                type: String,
                enum: ['member', 'club_admin'],
            },
        },
    ],
});

export const User = mongoose.model('users', userSchema);

module.exports = User;
