import { ReasonPhrases } from 'http-status-codes';
import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam';

class TeamsService {
  static async list(): Promise<ITeam[]> {
    const teams: ITeam[] = await Team.findAll();

    return teams;
  }

  static async getById(id: string): Promise<ITeam> {
    const team: ITeam | null = await Team.findByPk(Number(id));
    if (!team) {
      const err = new Error('Not a valid team');
      err.name = ReasonPhrases.BAD_REQUEST;
      throw err;
    }

    return team;
  }
}

export default TeamsService;
