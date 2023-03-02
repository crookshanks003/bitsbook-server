import { Request, Response, NextFunction } from 'express';
import { Normal } from '../utils/response';

class AuthController {
    //temporarily using cookies to store the role
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { role } = req.body;
            const token = role === 'admin' ? 'admin' : 'user';
            res.status(200).cookie('token', token).json(Normal('logged in'));
        } catch (error) {
            next(error);
        }
    }

    async getRole(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).send(req.cookies.token || 'user');
        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController();
Object.freeze(authController);
export default authController;
