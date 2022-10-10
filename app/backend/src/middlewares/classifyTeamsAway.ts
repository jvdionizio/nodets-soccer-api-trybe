import ILeaderboard from '../interfaces/ILeaderboard';
import Match from '../database/models/match';
import Team from '../database/models/team';

const totalPoints = (payload: Match[]) => {
  let tp = 0;
  payload.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      tp += 3;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      tp += 1;
    }
    return tp;
  });
  return tp;
};

const totalVictories = (payload: Match[]) => {
  let tv = 0;
  payload.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      tv += 1;
    }
    return tv;
  });
  return tv;
};

const totalDraws = (payload: Match[]) => {
  let td = 0;
  payload.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      td += 1;
    }
    return td;
  });
  return td;
};

const totalLosses = (payload: Match[]) => {
  let tl = 0;
  payload.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      tl += 1;
    }
    return tl;
  });
  return tl;
};

const goalsFavor = (payload: Match[]) => {
  const gf = payload.reduce((acc, cur) => {
    const result = acc + cur.awayTeamGoals;
    return result;
  }, 0);
  return gf;
};

const goalsOwn = (payload: Match[]) => {
  const go = payload.reduce((acc, cur) => {
    const result = acc + cur.homeTeamGoals;
    return result;
  }, 0);
  return go;
};

const goalsBalance = (payload: Match[]) => (goalsFavor(payload) - goalsOwn(payload));

const efficiency = (payload: Match[]) => Number(((totalPoints(payload)
  / (payload.length * 3)) * 100).toFixed(2));

const putInOrder = (payload: ILeaderboard[]) => {
  const result = payload
    .sort((a, b) => b.goalsOwn - a.goalsOwn)
    .sort((a, b) => b.goalsFavor - a.goalsFavor)
    .sort((a, b) => b.goalsBalance - a.goalsBalance)
    .sort((a, b) => b.totalVictories - a.totalVictories)
    .sort((a, b) => b.totalPoints - a.totalPoints);
  return result;
};

const classifyTeamsAway = (payload: Match[], data: Team[]) => {
  const teamsResults: ILeaderboard[] = data.map((team) => {
    const teamMatches = payload.filter((match) => match.awayTeam === team.id);
    return {
      name: team.teamName,
      totalPoints: totalPoints(teamMatches),
      totalGames: teamMatches.length,
      totalVictories: totalVictories(teamMatches),
      totalDraws: totalDraws(teamMatches),
      totalLosses: totalLosses(teamMatches),
      goalsFavor: goalsFavor(teamMatches),
      goalsOwn: goalsOwn(teamMatches),
      goalsBalance: goalsBalance(teamMatches),
      efficiency: efficiency(teamMatches),
    };
  });
  const result = putInOrder(teamsResults);

  return result;
};

export default classifyTeamsAway;
