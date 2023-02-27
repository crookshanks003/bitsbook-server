import { DatabaseError, UserError } from '../utils/error';
import { UserModel } from '../models';

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

    async createUser(email: string, password: string, name: string, role: string) {
        try {
            const user = await this.getUserWithEmail(email);
            if (user) {
                throw new UserError('User already exists', 400, { tags: ['admin', 'createUser'] });
            }

            const newUser = new UserModel({
                email,
                password,
                name,
                role,
            });
            await newUser.save();
        } catch (error) {
            throw new DatabaseError('Could not create user', 500, {
                error,
                tags: ['admin', 'createUser'],
            });
        }
    }

    private getUserWithEmail(email: string) {
        return UserModel.findOne({ email });
    }
}

const adminService = new AdminService();
Object.freeze(adminService);
export default adminService;
