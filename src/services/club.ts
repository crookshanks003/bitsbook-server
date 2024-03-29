import { DatabaseError } from '../utils/error';
import { Club } from '../types/club';
import { CreateClubDto, UpdateClubDto } from '../types/dto/club';
import { ClubUser, UserClub } from '../types/club';
import { ClubModel, UserModel } from '../models';
import { UpdateClubMemberDto } from '../types/dto/user';
import config from '../config';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';

class ClubService {
    async getClubWithId(id: string) {
        try {
            return ClubModel.findById(id);
        } catch (error) {
            throw new DatabaseError('Could not find club', 500, {
                error,
                tags: ['getClubWithId'],
            });
        }
    }

    async getClubWithMembers(id: Types.ObjectId) {
        {
            try {
                return ClubModel.findById(id).populate({
                    path: 'members.userId',
                    select: '-clubs',
                });
            } catch (error) {
                throw new DatabaseError('Could not find club', 500, {
                    error,
                    tags: ['getClubWithId'],
                });
            }
        }
    }

    async getAllClubs() {
        try {
            return await ClubModel.find();
        } catch (error) {
            throw new DatabaseError('Could not find clubs', 500, {
                error,
                tags: ['getAllClubs'],
            });
        }
    }

    async updateClub(clubId: string, updateObject: UpdateClubDto) {
        try {
            await ClubModel.updateOne({ _id: clubId }, updateObject);
        } catch (error) {
            throw new DatabaseError('Could not update club', 500, {
                error,
                tags: ['updateClub'],
            });
        }
    }

    async createClub(dto: CreateClubDto): Promise<Club> {
        try {
            const newClub = new ClubModel();
            const hash = bcrypt.hash(dto.password, config.BCRYPT_SALT_ROUNDS);

            newClub.name = dto.name;
            newClub.userName = dto.userName;
            newClub.description = dto.description;
            newClub.createdAt = new Date();
            newClub.password = await hash;

            return newClub.save();
        } catch (error) {
            throw new DatabaseError('Could not create club', 500, {
                error,
                tags: ['createClub'],
            });
        }
    }

    async deleteClub(clubId: string) {
        try {
            await ClubModel.findByIdAndRemove(clubId);
        } catch (error) {
            throw new DatabaseError('Could not delete club', 500, {
                error,
                tags: ['deleteClub'],
            });
        }
    }

    async addMemberToClub({ role, userId }: UpdateClubMemberDto, clubId: string) {
        try {
            const club: UserClub = { clubId, role };
            await UserModel.updateOne({ _id: userId }, { $push: { clubs: club } });
            const clubMember: ClubUser = { userId, role };
            await ClubModel.updateOne({ _id: clubId }, { $push: { members: clubMember } });
        } catch (error) {
            throw new DatabaseError('Could not update user clubs', 500, {
                error,
                tags: ['addMemberToClub'],
            });
        }
    }

    async removeMemberFromClub({ userId }: UpdateClubMemberDto, clubId: string) {
        try {
            await UserModel.updateOne({ _id: userId }, { $pull: { clubs: { clubId } } });
            await ClubModel.updateOne({ _id: clubId }, { $pull: { members: { userId } } });
        } catch (error) {
            throw new DatabaseError('Could not remove member from club', 500, {
                error,
                tags: ['removeMemberFromClub'],
            });
        }
    }

    async getClubForLogin(userName: string) {
        try {
            return await ClubModel.findOne({ userName }).select('+password');
        } catch (error) {
            throw new DatabaseError('Could not find club', 500, {
                error,
                tags: ['getClubForLogin'],
            });
        }
    }

    async getClubWithUserName(userName: string) {
        try {
            return await ClubModel.findOne({ userName });
        } catch (error) {
            throw new DatabaseError('Could not find club', 500, {
                error,
                tags: ['getClubWithUserName'],
            });
        }
    }
}

const clubService = new ClubService();
Object.freeze(clubService);
export { clubService };
