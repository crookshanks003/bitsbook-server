import { Router } from 'express';
import { clubAuth } from '../middleware/auth';
import { postController } from '../controllers/post';
import { validateBody } from '../middleware/validation';
import { CreatePostDto } from '../types/dto/post';

const router = Router();

router.post('/create', clubAuth, validateBody(CreatePostDto), postController.createPost);
router.get('/all', postController.getPosts);

export default router;
