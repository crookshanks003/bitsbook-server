import { Types } from 'mongoose';
import { Visibility, PostComment } from '../types/post';
import { PostModel } from '../models/posts';
import { AddCommentDto, CreatePostDto } from '../types/dto/post';
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

    async getPrivatePosts(clubs: string[]) {
        try {
            return await PostModel.find({
                author: { $in: clubs },
                visibility: Visibility.PRIVATE,
            }).lean();
        } catch (error) {
            throw new DatabaseError('Could not get feed post', 500, {
                error,
                tags: ['getPrivatePosts'],
            });
        }
    }

    async getPublicPosts() {
        try {
            return await PostModel.find({ visibility: Visibility.PUBLIC })
                .populate({
                    path: 'author',
                    select: 'name _id',
                })
                .lean();
        } catch (error) {
            throw new DatabaseError('Could not get feed post', 500, {
                error,
                tags: ['getPublicPosts'],
            });
        }
    }

    async getClubPosts(clubId: string) {
        try {
            return await PostModel.find({ author: clubId }).populate({
                path: 'author',
                select: 'name _id',
            });
        } catch (error) {
            throw new DatabaseError('Could not get feed post', 500, {
                error,
                tags: ['getClubPosts'],
            });
        }
    }

    async addComment(
        postId: string,
        userId: Types.ObjectId,
        name: string,
        commentDto: AddCommentDto,
    ) {
        try {
            const post = await PostModel.findById(postId);
            const comment: PostComment = { content: commentDto.content, userId, name };
            post.comments.push(comment);
            await post.save();
        } catch (error) {
            throw new DatabaseError('Failed to comment', 500, {
                error,
                tags: ['addComment'],
            });
        }
    }

    async markInterested(postId: string, userId: Types.ObjectId) {
        try {
            const post = await PostModel.findById(postId);
            post.interested.push(userId);
            await post.save();
        } catch (error) {
            throw new DatabaseError('Failed to mark interested', 500, {
                error,
                tags: ['markInterested'],
            });
        }
    }

    async markUnInterested(postId: string, userId: Types.ObjectId) {
        try {
            const post = await PostModel.findById(postId);
            post.interested = post.interested.filter((id) => id.toString() !== userId.toString());
            await post.save();
        } catch (error) {
            throw new DatabaseError('Failed to mark interested', 500, {
                error,
                tags: ['markUnInterested'],
            });
        }
    }
}

const postService = new PostService();
Object.freeze(postService);
export { postService };
