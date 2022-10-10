import Match from './IMatch';

export default interface IMatches extends Match {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}
