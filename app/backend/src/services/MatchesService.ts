import db from '../database/models';
import Match from '../database/models/match';
import IMatch from '../interfaces/IMatch';

class MatchesService {
  static async list(inProgress: any): Promise<IMatch[]> {
    if (inProgress === undefined) {
      const matches: IMatch[] = await Match.findAll({
        include: [{ model: db.models.teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: db.models.teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
      });
      return matches;
    }
    const result: IMatch[] = await Match.findAll({
      include: [{ model: db.models.teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: db.models.teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
      where: {
        inProgress: (inProgress === 'true' ? 1 : 0),
      },
    });

    return result;
  }

  static async create(payload: IMatch): Promise<IMatch> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = payload;
    const match = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return match;
  }

  static async endGame(id: string): Promise<string> {
    await Match.update({ inProgress: 0 }, {
      where: {
        id: Number(id),
      },
    });

    return 'Finished';
  }

  static async updateScore(id: string, payload: IMatch): Promise<number> {
    const { homeTeamGoals, awayTeamGoals } = payload;
    const [result] = await Match.update({
      homeTeamGoals: Number(homeTeamGoals),
      awayTeamGoals: Number(awayTeamGoals),
    }, {
      where: {
        id: Number(id),
      },
    });

    return result;
  }
}

export default MatchesService;
