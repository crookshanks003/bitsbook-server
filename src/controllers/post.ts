import { NextFunction, Response } from 'express';
import { postService } from '../services/post';
import { IRequestWithUser } from '../types';
import { CreatePostDto } from '../types/dto/post';
import { Normal } from '../utils/response';

class PostsController {
    async createPost(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const dto: CreatePostDto = req.body;
            const response = await postService.createPost(req.user._id, dto);
            res.status(200).json(Normal('Post created', response));
        } catch (err) {
            next(err);
        }
    }
}

const postController = new PostsController();
Object.freeze(postController);
export { postController };
