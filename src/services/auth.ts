import { compare } from 'bcrypt';
import { Role } from '../types/user';
import { ServerError, UserError } from '../utils/error';
import { userService } from './user';
import jwt from 'jsonwebtoken';
import config from '../config';
import { CreateUserDto } from '../types/dto/user';

class AuthService {
    async login(email: string, password: string) {
        try {
            const user = await userService.getUserForLogin(email);
            if (!user || !user.password) {
                throw new UserError('Email does not exist', 400, { tags: ['login'] });
            }
            const token = this.getJwtToken(user.id, user.role, user.version);
            const match = await this.matchPassword(password, user.password);
            if (!match) {
                throw new UserError('Incorrect password', 400, { tags: ['login'] });
            }
            return { token, role: user.role };
        } catch (err) {
            throw err;
        }
    }

    async register(userDto: CreateUserDto) {
        try {
            const { email, role, version } = await userService.createUser(userDto);
            const token = this.getJwtToken(email, role, version);
            return { token, role };
        } catch (error) {
            throw error;
        }
    }

    private matchPassword(password: string, hash: string) {
        try {
            return compare(password, hash);
        } catch (error) {
            throw new ServerError('Something went wrong', { error, tags: ['matchPassword'] });
        }
    }

    private getJwtToken(id: string, role: Role, version: number) {
        try {
            return jwt.sign({ id, role, version }, config.JWT_SECRET);
        } catch (error) {
            throw new ServerError('Something went wrong', { error, tags: ['getJwtToken'] });
        }
    }
}

const authService = new AuthService();
Object.freeze(authService);
export default authService;
