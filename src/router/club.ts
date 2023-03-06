import { Router } from 'express';
import clubController from '../controllers/club';

const router = Router();

router.get('/all', clubController.getClubList);
router.get('/:id', clubController.getClub);

export default router;
