import { Router } from 'express';
import { AppError, AppErrorName } from '../utils/error';

const router = Router();

//404 for all invalid routes
router.all('*', (req, _, next) => {
    next(
        new AppError(
            AppErrorName.App,
            `Can't find ${req.originalUrl} on this Server`,
            404,
            {
                tags: ['unknown-api'],
            },
        ),
    );
});

export default router;
