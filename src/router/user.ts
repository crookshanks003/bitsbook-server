import { Router } from 'express';
import { adminAuth } from '../middleware/auth';
import userController from '../controllers/user';

const router = Router();

router.get('/all', adminAuth, userController.getAllUsers);
router.get('/:id', userController.getUserDetails);
router.get('/get-role', userController.getRole);
router.get('/profile', userController.getProfile);
router.get('/populated-profile', userController.getProfileWithClubs);

export default router;
