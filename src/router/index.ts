import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth';
import adminRouter from './admin';
import userRouter from './user';
import { AppError, AppErrorName } from '../utils/error';

const router = Router();

router.use('/admin', adminAuth, adminRouter);
router.use('/user', userRouter);

//404 for all invalid routes
router.all('*', (req, _, next) => {
    next(
        new AppError(AppErrorName.App, `Can't find ${req.originalUrl} on this Server`, 404, {
            tags: ['unknown-api'],
        }),
    );
});

export default router;
