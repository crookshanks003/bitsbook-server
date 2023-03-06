import { Router } from 'express';
import authController from '../controllers/auth';

const router = Router();

router.post('/login', authController.login);
router.get('/get-role', authController.getRole);

export default router;
