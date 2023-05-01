import { NextFunction, Request, Response } from 'express';
import { IRequestWithUser } from '../types';
import { clubService, postService, userService } from '../services';
import { Normal } from '../utils/response';
import { UpdateClubMemberDto } from '../types/dto/user';
import { UserError } from '../utils/error';

class ClubController {
    async getClubList(_: Request, res: Response, next: NextFunction) {
        try {
            const clubs = await clubService.getAllClubs();
            res.status(200).json(Normal('Clubs fetched', clubs));
        } catch (error) {
            next(error);
        }
    }

    async getClub(req: Request, res: Response, next: NextFunction) {
        try {
            const club = await clubService.getClubWithId(req.params.id);
            res.status(200).json(Normal('Club fetched', club));
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const club = await clubService.getClubWithId(req.user._id.toString());
            res.status(200).json(Normal('Club', club));
        } catch (error) {
            next(error);
        }
    }

    async getClubMembers(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const club = await clubService.getClubWithMembers(req.user._id);
            res.status(200).json(Normal('Members', club.members));
        } catch (error) {
            next(error);
        }
    }

    async getDashboardData(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const club = await clubService.getClubWithId(req.user._id.toString());
            const posts = await postService.getClubPosts(req.user._id.toString());

            const interactions = posts.reduce((sum, p) => sum + p.interested.length, 0);

            const data = { members: club.members.length, interactions, posts: posts.length };
            res.status(200).json(Normal('Dashboard data', data));
        } catch (error) {
            next(error);
        }
    }

    async addClubMember(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const dto: UpdateClubMemberDto = req.body;
            const user = await userService.getUserWithId(dto.userId);
            if (!user) {
                throw new UserError(`User with id ${dto.userId} does not exist`, 400, {
                    tags: ['addUserToClub'],
                });
            }
            if (user.clubs.find((club) => club.clubId.toString() === req.user._id.toString())) {
                throw new UserError(`User is already a member of club`, 400, {
                    tags: ['addUserToClub'],
                });
            }
            const club = await clubService.getClubWithId(req.user._id.toString());
            if (!club) {
                throw new UserError(`Club does not exist`, 400, {
                    tags: ['addUserToClub'],
                });
            }

            await clubService.addMemberToClub(dto, req.user._id.toString());
            res.status(200).json(Normal('Updated clubs for user'));
        } catch (error) {
            if (!error.meta) error.meta = { tags: [] };
            error.meta.tags.push('admin');
            next(error);
        }
    }

    async removeClubMember(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const dto: UpdateClubMemberDto = req.body;
            const user = await userService.getUserWithId(dto.userId);
            if (!user) {
                throw new UserError(`User with id ${dto.userId} does not exist`, 400, {
                    tags: ['removeUserFromClub'],
                });
            }
            const club = await clubService.getClubWithId(req.user._id.toString());
            if (!club) {
                throw new UserError(`Club with id ${req.user._id} does not exist`, 400, {
                    tags: ['removeUserFromClub'],
                });
            }
            await clubService.removeMemberFromClub(dto, req.user._id.toString());
            res.status(200).json(Normal('Removed member from club'));
        } catch (error) {
            if (!error.meta) error.meta = { tags: [] };
            error.meta.tags.push('admin');
            next(error);
        }
    }

    async getUsersForAddMembers(req: IRequestWithUser, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            const club = await clubService.getClubWithId(req.user._id.toString());
            const clubMembers = club.members.map((m) => m.userId.toString());

            const response = users.filter((u) => !clubMembers.includes(u._id.toString()));
            res.status(200).json(Normal('Users', response));
        } catch (error) {
            next(error);
        }
    }
}

const clubController = new ClubController();
Object.freeze(clubController);
export default clubController;
