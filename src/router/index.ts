import { Router } from 'express';
import { adminAuth, auth } from '../middleware/auth';
import adminRouter from './admin';
import userRouter from './user';
import clubRouter from './club';
import authRouter from './auth';
import postRouter from './post';
import { AppError, AppErrorName } from '../utils/error';

const router = Router();

router.use('/auth', authRouter);
router.use(auth);
router.use('/user', userRouter);
router.use('/club', clubRouter);
router.use('/post', postRouter);
router.use('/admin', adminAuth, adminRouter);

//404 for all invalid routes
router.all('*', (req, _, next) => {
    next(
        new AppError(AppErrorName.App, `Can't find ${req.originalUrl} on this Server`, 404, {
            tags: ['unknown-api'],
        }),
    );
});

export default router;
