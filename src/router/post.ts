import { Router } from 'express';
import { clubAuth } from '../middleware/auth';
import { postController } from '../controllers/post';
import { validateBody } from '../middleware/validation';
import { AddCommentDto, CreatePostDto } from '../types/dto/post';

const router = Router();

router.post('/create', clubAuth, validateBody(CreatePostDto), postController.createPost);
router.get('/all', postController.getPosts);
router.get('/feed', postController.getFeedPosts);
router.get('/club', clubAuth, postController.getClubPosts);
router.get('/club-posts/:id', postController.getClubPostsById);
router.get('/public', postController.getPublicPosts);
router.post('/comment/:id', validateBody(AddCommentDto), postController.addComment);
router.get('/interested', postController.getInterestedPosts);
router.post('/interested/:id', postController.markInterested);
router.post('/un-interested/:id', postController.markUnInterested);
router.get('/likes/:id', postController.getPostInterested);
router.delete('/:id', clubAuth, postController.deletePost);

export default router;
