import { validateBody } from '../middleware/validation';
import { Router } from 'express';
import adminController from '../controllers/admin';
import { CreateUserDto, UpdateClubMemberDto, UpdateUserRoleDto } from '../types/dto/user';
import { CreateClubDto, UpdateClubDto } from '../types/dto/club';

const router = Router();

router.post('/delete-user/:id', adminController.deleteUser);
router.post('/create-user', validateBody(CreateUserDto), adminController.createUser);
router.post('/update-user-role', validateBody(UpdateUserRoleDto), adminController.updateUserRole);

router.post('/create-club', validateBody(CreateClubDto), adminController.createClub);
router.post(
    '/update-club/:id',
    validateBody(UpdateClubDto, { skipMissingProperties: true }),
    adminController.updateClub,
);
router.post('/add-club-member', validateBody(UpdateClubMemberDto), adminController.addClubMember);
router.post(
    '/remove-club-member',
    validateBody(UpdateClubMemberDto),
    adminController.removeClubMember,
);
router.post('/delete-club/:id', adminController.deleteClub);

export default router;
