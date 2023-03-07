import { Router } from 'express';
import { validateBody } from '../middleware/validation';
import { LoginDto } from '../types/dto/auth';
import authController from '../controllers/auth';
import { CreateUserDto } from '../types/dto/user';
import userController from '../controllers/user';

const router = Router();

router.post('/login', validateBody(LoginDto), authController.login);
router.post('/register', validateBody(CreateUserDto), authController.register);
router.post('/logout', authController.logOut);
router.get('/get-role', authController.getRole);
router.get('/profile', userController.getProfile);

export default router;
