import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamService from '../services/TeamService';

class TeamsController {
  list = async (_req: Request, res: Response): Promise<void> => {
    const teamsList = await TeamService.list();

    res.status(StatusCodes.OK).json(teamsList);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const team = await TeamService.getById(id);

    res.status(StatusCodes.OK).json(team);
  };
}

export default TeamsController;
