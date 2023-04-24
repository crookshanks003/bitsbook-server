import { NextFunction, Request, Response } from 'express';
import { IRequestWithUser } from 'src/types';
import { clubService } from '../services';
import { Normal } from '../utils/response';

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
            const club = await clubService.getClubWithMembers(req.user._id.toString());
            res.status(200).json(Normal('Club', club));
        } catch (error) {
            next(error);
        }
    }
}

const clubController = new ClubController();
Object.freeze(clubController);
export default clubController;
