import { Router } from 'express';
import userController from 'src/controllers/user';

const router = Router();

router.get('/:id', userController.getUserDetails);

export default router;
