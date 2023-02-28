import { validateBody } from '../middleware/validation';
import { Router } from 'express';
import adminController from '../controllers/admin';
import { CreateUserDto } from '../types/dto/user';

const router = Router();

router.post('/delete-user/:id', adminController.deleteUser);
router.post('/create-user', validateBody(CreateUserDto), adminController.createUser);

export default router;
