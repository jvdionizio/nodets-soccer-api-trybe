import ILeaderboard from '../interfaces/ILeaderboard';
import Match from '../database/models/match';
import Team from '../database/models/team';
import classifyTeamsHome from './classifyTeamsHome';
import classifyTeamsAway from './classifyTeamsAway';

const efficiency = (t1: ILeaderboard[], t2: ILeaderboard[]) =>
  Number((((t1[0].totalPoints + t2[0].totalPoints)
  / ((t1[0].totalGames + t2[0].totalGames) * 3)) * 100).toFixed(2));

const putInOrder = (payload: ILeaderboard[]) => {
  const result = payload
    .sort((a, b) => b.goalsOwn - a.goalsOwn)
    .sort((a, b) => b.goalsFavor - a.goalsFavor)
    .sort((a, b) => b.goalsBalance - a.goalsBalance)
    .sort((a, b) => b.totalVictories - a.totalVictories)
    .sort((a, b) => b.totalPoints - a.totalPoints);
  return result;
};

const classifyTeams = (payload: Match[], data: Team[]) => {
  const homeTeams = classifyTeamsHome(payload, data);
  const awayTeams = classifyTeamsAway(payload, data);
  const teamsResults: ILeaderboard[] = data.map((team) => {
    const teamHome = homeTeams.filter((hometeam) => hometeam.name === team.teamName);
    const teamAway = awayTeams.filter((awayteam) => awayteam.name === team.teamName);
    return { name: team.teamName,
      totalPoints: teamHome[0].totalPoints + teamAway[0].totalPoints,
      totalGames: teamHome[0].totalGames + teamAway[0].totalGames,
      totalVictories: teamHome[0].totalVictories + teamAway[0].totalVictories,
      totalDraws: teamHome[0].totalDraws + teamAway[0].totalDraws,
      totalLosses: teamHome[0].totalLosses + teamAway[0].totalLosses,
      goalsFavor: teamHome[0].goalsFavor + teamAway[0].goalsFavor,
      goalsOwn: teamHome[0].goalsOwn + teamAway[0].goalsOwn,
      goalsBalance: teamHome[0].goalsBalance + teamAway[0].goalsBalance,
      efficiency: efficiency(teamHome, teamAway),
    };
  });
  return putInOrder(teamsResults);
};

export default classifyTeams;
