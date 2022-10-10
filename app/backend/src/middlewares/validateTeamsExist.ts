import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases } from 'http-status-codes';
import TeamsService from '../services/TeamService';

const validateTeamsExist = async (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const existingTeams = await TeamsService.list();
  const homeTeamExists = existingTeams.some((team) => team.id === homeTeam);
  const awayTeamExists = existingTeams.some((team) => team.id === awayTeam);
  if (!homeTeamExists || !awayTeamExists) {
    const err = new Error('There is no team with such id!');
    err.name = ReasonPhrases.NOT_FOUND;
    throw err;
  }

  next();
};

export default validateTeamsExist;
