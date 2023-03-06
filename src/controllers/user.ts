import { Request, Response, NextFunction } from 'express';
import { UserError } from '../utils/error';
import { userService } from '../services';
import { Normal } from '../utils/response';

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
}

const userController = new UserController();
Object.freeze(userController);
export default userController;
