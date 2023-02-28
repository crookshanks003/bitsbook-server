import { Router } from 'express';
import userController from '../controllers/user';

const router = Router();

router.get('/:id', userController.getUserDetails);

export default router;
