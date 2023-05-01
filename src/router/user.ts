import { Router } from 'express';
import { adminAuth } from '../middleware/auth';
import userController from '../controllers/user';

const router = Router();

router.get('/all', adminAuth, userController.getAllUsers);
router.get('/get-role', userController.getRole);
router.get('/profile', userController.getProfile);
router.get('/populated-profile', userController.getProfileWithClubs);
router.get('/:id', userController.getUserDetails);

export default router;
