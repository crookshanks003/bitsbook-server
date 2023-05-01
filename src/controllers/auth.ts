import { Request, Response, NextFunction } from 'express';
import { clubService, userService } from '../services';
import { CreateUserDto } from '../types/dto/user';
import { UserError } from '../utils/error';
import authService from '../services/auth';
import { ClubLoginDto, LoginDto } from '../types/dto/auth';
import { Normal } from '../utils/response';
import { Role } from '../types/user';
import { IRequestWithUser } from '../types';

class AuthController {
    async getProfile(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const profile =
                req.user.role === Role.CLUB
                    ? await clubService.getClubWithId(req.user._id.toString())
                    : await userService.getUserWithId(req.user._id.toString());
            const response = {
                _id: profile._id,
                role: profile.role,
                createdAt: profile.createdAt,
                name: profile.name,
                version: profile.version,
            };
            res.status(200).json(Normal('profile', response));
        } catch (error) {
            next(error);
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: LoginDto = req.body;
            const { token, role } = await authService.login(email, password);
            res.status(200)
                .cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    domain: 'bitsbook-server.onrender.com',
                })
                .cookie('role', role, {
                    secure: true,
                    sameSite: 'none',
                    domain: 'bitsbook-server.onrender.com',
                })
                .json(Normal('logged in', { role, token }));
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
                .cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    domain: 'bitsbook-server.onrender.com',
                })
                .cookie('role', role, {
                    secure: true,
                    sameSite: 'none',
                    domain: 'bitsbook-server.onrender.com',
                })
                .json(Normal('logged in', { role, token }));
        } catch (error) {
            next(error);
        }
    }

    async clubLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { userName, password }: ClubLoginDto = req.body;
            const { token, role } = await authService.clubLogin(userName, password);
            res.status(200)
                .cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    domain: 'bitsbook-server.onrender.com',
                })
                .cookie('role', role, {
                    secure: true,
                    sameSite: 'none',
                    domain: 'bitsbook-server.onrender.com',
                })
                .json(Normal('logged in', { role, token }));
        } catch (error) {
            next(error);
        }
    }

    async logOut(_: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('token').clearCookie('role').status(200).json(Normal('Logged out'));
        } catch (error) {
            next(error);
        }
    }

    getRole(req: IRequestWithUser, res: Response) {
        res.status(200).send(req.user.role);
    }
}

const authController = new AuthController();
Object.freeze(authController);
export default authController;
