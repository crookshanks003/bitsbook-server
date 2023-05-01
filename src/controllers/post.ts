import { NextFunction, Response } from 'express';
import { userService } from '../services';
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

    async getPosts(_: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const posts = await postService.getAllPosts();
            res.status(200).json(Normal('All posts', posts));
        } catch (error) {
            next(error);
        }
    }

    async getFeedPosts(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserWithId(req.user._id.toString());
            const clubs = user.clubs.map((cl) => cl.clubId);
            const privatePosts = await postService.getPrivatePosts(clubs);
            const publicPosts = await postService.getPublicPosts();
            const posts = [...privatePosts, ...publicPosts];

            posts.forEach((p) => {
                const interested = p.interested.map((id) => id.toString());
                p.liked = interested.includes(user._id.toString());
            });

            res.status(200).json(Normal('Feed Posts', posts));
        } catch (error) {
            next(error);
        }
    }

    async getClubPosts(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const posts = await postService.getClubPosts(req.user._id.toString());
            posts.forEach((p) => (p.liked = false));
            res.status(200).json(Normal('Feed Posts', posts));
        } catch (error) {
            next(error);
        }
    }

    async markInterested(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            await postService.markInterested(req.params['id'], req.user._id);
            res.status(200).json(Normal('Marked Interested'));
        } catch (error) {
            next(error);
        }
    }

    async markUnInterested(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            await postService.markUnInterested(req.params['id'], req.user._id);
            res.status(200).json(Normal('Marked Uninterested'));
        } catch (error) {
            next(error);
        }
    }

    async addComment(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            await postService.addComment(req.params['id'], req.user._id, req.user.name, req.body);
            res.status(200).json(Normal('Comment added'));
        } catch (error) {
            next(error);
        }
    }
}

const postController = new PostsController();
Object.freeze(postController);
export { postController };
