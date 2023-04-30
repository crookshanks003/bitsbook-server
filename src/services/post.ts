import { Types } from 'mongoose';
import { PostModel } from '../models/posts';
import { CreatePostDto } from '../types/dto/post';
import { DatabaseError } from '../utils/error';

class PostService {
    createPost(author: Types.ObjectId, dto: CreatePostDto) {
        try {
            const post = new PostModel();
            post.author = author;
            post.title = dto.title;
            post.content = dto.content;
            post.createdAt = new Date();
            post.visibility = dto.visibility;

            return post.save();
        } catch (error) {
            throw new DatabaseError('Could not create post', 500, { error, tags: ['createPost'] });
        }
    }

    async getAllPosts() {
        try {
            return await PostModel.find({});
        } catch (error) {
            throw new DatabaseError('Could not get all posts', 500, {
                error,
                tags: ['getAllPosts'],
            });
        }
    }
}

const postService = new PostService();
Object.freeze(postService);
export { postService };
