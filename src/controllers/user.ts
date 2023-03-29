import { Request, Response, NextFunction } from 'express';
import { UserError } from '../utils/error';
import { userService } from '../services';
import { Normal } from '../utils/response';
import { IRequestWithUser } from '../types';
import { Role } from '../types/user';

class UserController {
    async getAllUsers(_: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(Normal('All users', users));
        } catch (error) {
            next(error);
        }
    }
    async getUserDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const users = await userService.getUserWithId(id);
            if (!users) {
                throw new UserError(`User with id ${id} does not exist`, 400);
            }
            res.status(200).json(Normal('All users', users));
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const reqUser = req.user;
            const user = await userService.getUserWithId(reqUser._id.toString());
            res.status(200).json(Normal('User profile', user));
        } catch (error) {
            next(error);
        }
    }

    async getProfileWithClubs(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const id = req.user.id;
            const user = await userService.getPopulatedUser(id);
            res.status(200).json(Normal('Populated user', user));
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

const userController = new UserController();
Object.freeze(userController);
export default userController;
