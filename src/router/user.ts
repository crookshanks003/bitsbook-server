import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth';
import userController from '../controllers/user';

const router = Router();

router.get('/all', adminAuth, userController.getAllUsers);
router.get('/:id', userController.getUserDetails);

export default router;
