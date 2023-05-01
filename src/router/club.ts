import { Router } from 'express';
import { adminAuth, clubAuth } from '../middleware/auth';
import clubController from '../controllers/club';
import { UpdateClubMemberDto } from '../types/dto/user';
import { validateBody } from '../middleware/validation';

const router = Router();

router.get('/all', adminAuth, clubController.getClubList);
router.get('/profile', clubController.getProfile);
router.get('/dashboard', clubController.getDashboardData);
router.get('/members', clubController.getClubMembers);
router.post(
    '/add-club-member',
    clubAuth,
    validateBody(UpdateClubMemberDto),
    clubController.addClubMember,
);
router.post(
    '/remove-club-member',
    clubAuth,
    validateBody(UpdateClubMemberDto),
    clubController.removeClubMember,
);
router.get('/user-list', clubController.getUsersForAddMembers);
router.get('/:id', clubController.getClub);

export default router;
