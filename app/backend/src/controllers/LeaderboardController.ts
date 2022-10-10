import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  endedHome = async (req: Request, res: Response): Promise<void> => {
    const homeEndedBoard = await LeaderboardService.endedHome();

    res.status(StatusCodes.OK).json(homeEndedBoard);
  };

  endedAway = async (req: Request, res: Response): Promise<void> => {
    const awayEndedBoard = await LeaderboardService.endedAway();

    res.status(StatusCodes.OK).json(awayEndedBoard);
  };

  general = async (req: Request, res: Response): Promise<void> => {
    const generalBoard = await LeaderboardService.general();

    res.status(StatusCodes.OK).json(generalBoard);
  };
}

export default LeaderboardController;
