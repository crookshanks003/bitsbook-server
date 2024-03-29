import { DatabaseError } from '../utils/error';
import { UserModel } from '../models';
import { CreateUserDto, UpdateUserRoleDto } from '../types/dto/user';
import bcrypt from 'bcrypt';
import config from '../config';
import { PopulatedClubForUser, User } from '../types/user';
import { Types } from 'mongoose';

class UserService {
    async deleteUser(id: string) {
        try {
            await UserModel.findByIdAndRemove(id);
        } catch (error) {
            throw new DatabaseError('Could not delete user', 500, {
                error,
                tags: ['deleteUser'],
            });
        }
    }

    async getAllUsers() {
        try {
            return await UserModel.find();
        } catch (error) {
            throw new DatabaseError('Could not get all users', 500, {
                error,
                tags: ['getAllUsers'],
            });
        }
    }

    async createUser({ email, password, name, role }: CreateUserDto): Promise<User> {
        try {
            const hash = bcrypt.hash(password, config.BCRYPT_SALT_ROUNDS);
            const newUser = new UserModel();
            newUser.email = email;
            newUser.name = name;
            newUser.role = role;
            newUser.password = await hash;
            newUser.createdAt = new Date();
            newUser.updatedAt = new Date();

            return newUser.save();
        } catch (error) {
            throw new DatabaseError('Could not create user', 500, {
                error,
                tags: ['createUser'],
            });
        }
    }

    async updateUserRole({ role, userId }: UpdateUserRoleDto) {
        try {
            await UserModel.updateOne({ _id: userId }, { role });
        } catch (error) {
            throw new DatabaseError('Could not update user role', 500, {
                error,
                tags: ['updateUserRole'],
            });
        }
    }

    async getUserWithEmail(email: string) {
        try {
            return await UserModel.findOne({ email });
        } catch (err) {
            throw new DatabaseError('Could not find user', 500, {
                error: err,
                tags: ['getUserWithEmail'],
            });
        }
    }

    async getUserForLogin(email: string) {
        try {
            return await UserModel.findOne({ email }).select('+password');
        } catch (err) {
            throw new DatabaseError('Could not find user', 500, {
                error: err,
                tags: ['getUserWithEmail'],
            });
        }
    }

    async getUserWithId(id: string) {
        try {
            return await UserModel.findById(id);
        } catch (error) {
            throw new DatabaseError('Could not find user', 500, {
                error,
                tags: ['getUserWithId'],
            });
        }
    }

    async getPopulatedUser(id: Types.ObjectId) {
        try {
            return await UserModel.findById(id).populate<{ clubs: PopulatedClubForUser[] }>({
                path: 'clubs.clubId',
                select: '-members',
            });
        } catch (err) {
            throw new DatabaseError('Could not find user', 500, {
                error: err,
                tags: ['getPopulatedUser'],
            });
        }
    }
}

const userService = new UserService();
Object.freeze(userService);
export { userService };
