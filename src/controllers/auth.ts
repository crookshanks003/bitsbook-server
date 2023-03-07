import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';
import { CreateUserDto } from '../types/dto/user';
import { UserError } from '../utils/error';
import authService from '../services/auth';
import { LoginDto } from '../types/dto/auth';
import { Normal } from '../utils/response';
import { Role } from '../types/user';
import { IRequestWithUser } from '../types/';

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: LoginDto = req.body;
            const { token, role } = await authService.login(email, password);
            res.status(200)
                .cookie('token', token, { httpOnly: true })
                .json(Normal('logged in', { role }));
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const userDto: CreateUserDto = req.body;
            const user = await userService.getUserWithEmail(userDto.email);
            if (user) {
                throw new UserError(`User with email ${userDto.email} already exists`, 400, {
                    tags: ['register', 'validation'],
                });
            }
            userDto.role = Role.USER;
            const { token, role } = await authService.register(userDto);
            res.status(200)
                .cookie('token', token, { httpOnly: true })
                .json(Normal('logged in', { role }));
        } catch (error) {
            next(error);
        }
    }

    async logOut(_: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('token').status(200).json(Normal('Logged out'));
        } catch (error) {
            next(error);
        }
    }

    async getRole(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            res.status(200).send(req.user.role || Role.USER);
        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController();
Object.freeze(authController);
export default authController;
