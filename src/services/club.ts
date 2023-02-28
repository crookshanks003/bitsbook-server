import { DatabaseError } from '../utils/error';
import { ClubModel } from '../models';
import { Club } from '../types/club';
import { CreateClubDto } from '../types/dto/club';
import config from '../config';
import bcrypt from 'bcrypt';

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
