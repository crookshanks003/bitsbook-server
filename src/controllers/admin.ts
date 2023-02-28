import { NextFunction, Request, Response } from 'express';
import { Normal } from '../utils/response';
import adminService from '../services/admin';
import { CreateUserDto } from '../types/dto/user';
import { UserError } from '../utils/error';

class AdminController {
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            await adminService.deleteUser(req.params.id);
            res.status(200).json(Normal('User deleted'));
        } catch (error) {
            next(error);
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const createUserDto: CreateUserDto = req.body;
            const user = await adminService.getUserWithEmail(createUserDto.email);
            if (user) {
                throw new UserError(`User with email ${createUserDto.email} already exists`, 400, {
                    tags: ['admin', 'createUser'],
                });
            }
            const createdUser = await adminService.createUser(createUserDto);
            createdUser.password = undefined;
            res.status(200).json(Normal('User created', createdUser));
        } catch (error) {
            next(error);
        }
    }
}

const adminController = new AdminController();
Object.freeze(adminController);
export default adminController;
