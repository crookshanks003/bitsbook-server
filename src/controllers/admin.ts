import { NextFunction, Request, Response } from 'express';
import { Normal } from '../utils/response';
import { clubService, userService } from '../services';
import { CreateUserDto, UpdateUserClubDto, UpdateUserRoleDto } from '../types/dto/user';
import { UserError } from '../utils/error';
import { CreateClubDto } from '../types/dto/club';

class AdminController {
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(200).json(Normal('User deleted'));
        } catch (error) {
            if (!error.meta) error.meta = { tags: [] };
            error.tags.push('admin');
            next(error);
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const createUserDto: CreateUserDto = req.body;
            const user = await userService.getUserWithEmail(createUserDto.email);
            if (user) {
                throw new UserError(`User with email ${createUserDto.email} already exists`, 400, {
                    tags: ['createUser'],
                });
            }
            const createdUser = await userService.createUser(createUserDto);
            createdUser.password = undefined;
            res.status(200).json(Normal('User created', createdUser));
        } catch (error) {
            if (!error.meta) error.meta = { tags: [] };
            error.tags.push('admin');
            next(error);
        }
    }

    async updateUserRole(req: Request, res: Response, next: NextFunction) {
        try {
            const updateRoleDto: UpdateUserRoleDto = req.body;
            const user = await userService.getUserWithId(updateRoleDto.userId);
            if (!user) {
                throw new UserError(`User with id ${updateRoleDto.userId} does not exist`, 400, {
                    tags: ['updateUserRole'],
                });
            }
            userService.updateUserRole(updateRoleDto);
            return res.status(200).json(Normal('User role updated', updateRoleDto));
        } catch (error) {
            if (!error.meta) error.meta = { tags: [] };
            error.tags.push('admin');
            next(error);
        }
    }

    async addUserToClub(req: Request, res: Response, next: NextFunction) {
        try {
            const dto: UpdateUserClubDto = req.body;
            const user = await userService.getUserWithId(dto.userId);
            if (!user) {
                throw new UserError(`User with id ${dto.userId} does not exist`, 400, {
                    tags: ['addUserToClub'],
                });
            }
            if (user.clubs.find((club) => club.clubId.toString() === dto.clubId)) {
                throw new UserError(
                    `User with id ${dto.userId} is already a member of club ${dto.clubId}`,
                    400,
                    {
                        tags: ['addUserToClub'],
                    },
                );
            }
            const club = await clubService.getClubWithId(dto.clubId);
            if (!club) {
                throw new UserError(`Club with id ${dto.clubId} does not exist`, 400, {
                    tags: ['addUserToClub'],
                });
            }

            await userService.addUserToClubs(dto);
            res.status(200).json(Normal('Updated clubs for user'));
        } catch (error) {
            if (!error.meta) error.meta = { tags: [] };
            error.meta.tags.push('admin');
            next(error);
        }
    }

    async createClub(req: Request, res: Response, next: NextFunction) {
        try {
            const dto: CreateClubDto = req.body;
            const club = await clubService.getClubWithUserName(dto.userName);
            if (club) {
                throw new UserError(`UserName ${dto.userName} is already taken`, 400, {
                    tags: ['createClub'],
                });
            }
            const newClub = await clubService.createClub(dto);
            newClub.password = undefined;
            res.status(201).json(Normal('Club created', newClub));
        } catch (error) {
            if (!error.meta) error.meta = { tags: [] };
            error.tags.push('admin');
            next(error);
        }
    }
}

const adminController = new AdminController();
Object.freeze(adminController);
export default adminController;
