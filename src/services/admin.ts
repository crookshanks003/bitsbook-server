import { DatabaseError } from '../utils/error';
import { UserModel } from '../models';
import { CreateUserDto } from '../types/dto/user';
import bcrypt from 'bcrypt';
import config from '../config';
import { User } from '../types/user';

class AdminService {
    async deleteUser(id: string) {
        try {
            await UserModel.findByIdAndRemove(id);
        } catch (error) {
            throw new DatabaseError('Could not delete user', 500, {
                error,
                tags: ['admin', 'deleteUser'],
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
                tags: ['admin', 'createUser'],
            });
        }
    }

    getUserWithEmail(email: string) {
        return UserModel.findOne({ email });
    }
}

const adminService = new AdminService();
Object.freeze(adminService);
export default adminService;
