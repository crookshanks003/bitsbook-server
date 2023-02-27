import { NextFunction, Request, Response } from 'express';
import { Normal } from '../utils/response';
import adminService from '../services/admin';

class AdminController {
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            await adminService.deleteUser(req.params.id);
            res.status(200).json(Normal('User deleted'));
        } catch (error) {
            next(error);
        }
    }
}

const adminController = new AdminController();
Object.freeze(adminController);
export default adminController;
