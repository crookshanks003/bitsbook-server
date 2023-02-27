import { Router } from 'express';
import adminController from '../controllers/admin';

const router = Router();

router.post('/delete/:id', adminController.deleteUser);

export default router;
