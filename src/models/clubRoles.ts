import mongoose, { Schema } from 'mongoose';

const clubRolesSchema = new mongoose.Schema({
    clubId: {
        type: Schema.Types.ObjectId,
        ref: 'clubs',
    },
    roles: { type: [String], default: ['member'] },
});

export const ClubRolesModel = mongoose.model('clubRoles', clubRolesSchema);
