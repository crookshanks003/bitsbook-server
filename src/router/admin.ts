import { validateBody } from '../middleware/validation';
import { Router } from 'express';
import adminController from '../controllers/admin';
import { CreateUserDto, UpdateUserClubDto, UpdateUserRoleDto } from '../types/dto/user';
import { CreateClubDto } from '../types/dto/club';

const router = Router();

router.post('/delete-user/:id', adminController.deleteUser);
router.post('/create-user', validateBody(CreateUserDto), adminController.createUser);
router.post('/update-user-role', validateBody(UpdateUserRoleDto), adminController.updateUserRole);
router.post('/add-user-club', validateBody(UpdateUserClubDto), adminController.addUserToClub);

router.post('/create-club', validateBody(CreateClubDto), adminController.createClub);

export default router;
