import { Router } from 'express';
import { adminAuth } from '../middleware/auth';
import clubController from '../controllers/club';

const router = Router();

router.get('/all', adminAuth, clubController.getClubList);
router.get('/:id', clubController.getClub);
router.get('/profile', clubController.getProfile);

export default router;
