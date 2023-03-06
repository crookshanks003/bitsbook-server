import { Router } from 'express';
import { validateBody } from '../middleware/validation';
import { LoginDto } from '../types/dto/auth';
import authController from '../controllers/auth';
import { CreateUserDto } from '../types/dto/user';

const router = Router();

router.post('/login', validateBody(LoginDto), authController.login);
router.post('/register', validateBody(CreateUserDto), authController.register);
router.get('/get-role', authController.getRole);

export default router;
