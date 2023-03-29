import { Router } from 'express';
import { validateBody } from '../middleware/validation';
import { ClubLoginDto, LoginDto } from '../types/dto/auth';
import authController from '../controllers/auth';
import { CreateUserDto } from '../types/dto/user';

const router = Router();

router.post('/login', validateBody(LoginDto), authController.login);
router.post('/club-login', validateBody(ClubLoginDto), authController.clubLogin);
router.post('/register', validateBody(CreateUserDto), authController.register);
router.post('/logout', authController.logOut);

export default router;
