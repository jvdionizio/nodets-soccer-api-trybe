import * as bcrypt from 'bcryptjs';
import ILogin from '../interfaces/ILogin'
import IMatch from '../interfaces/IMatch';
import IMatches from '../interfaces/IMatches';
import ITeam from '../interfaces/ITeam';
import IUser from '../interfaces/IUser'

export const usersMock: IUser[] = [
  {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'email@email.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393umDaBmjKccSa.pIehlSJgkdMPLy5BNhm',
  },
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@email.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393uobLruTGFq82Mpi1xhy5iqbRfbyzhinK',
  },
]

export const loginMock: ILogin = {
  email: 'email@email.com',
  password: 'senha123',
}

export const emailLessMock: ILogin = {
  email: '',
  password: 'senha123',
}

export const passwordLessMock: ILogin = {
  email: 'email@email.com',
  password: '',
}

export const invalidEmail = {
  email: 9,
  password: 'senha123',
}

export const invalidPassword = {
  email: 'email@email.com',
  password: 1234567,
}

export const wrongEmail: ILogin = {
  email: 'wrong@email.com',
  password: 'senha123',
}

export const wrongPassword: ILogin = {
  email: 'email@email.com',
  password: 'wrongSenha',
}

export const tokenMock: string = 'some_token'

export const invalidToken: string = 'invalid_token'

export const noTokenProvided: string = 'No token provided'

export const tokenMustBeValid: string = 'Token must be a valid token'

export const teamsMock: ITeam[] = [
  {
    id: 1,
    teamName: "Águia do Vale"
  },
  {
    id: 2,
    teamName: "Burro da Central"
  },
  {
    id: 3,
    teamName: "Xis Vê"
  },
]

export const matchesMock: IMatches[] = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Águia do Vale"
    },
    teamAway: {
      teamName: "Burro da Central"
    },
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 3,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: {
      teamName: "Burro da Central"
    },
    teamAway: {
      teamName: "Xis Vê"
    },
  },
  {
    id: 3,
    homeTeam: 3,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Xis Vê"
    },
    teamAway: {
      teamName: "Águia do Vale"
    },
  },
  {
    id: 4,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Águia do Vale"
    },
    teamAway: {
      teamName: "Xis Vê"
    },
  },
  {
    id: 5,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: "Burro da Central"
    },
    teamAway: {
      teamName: "Águia do Vale"
    },
  },
  {
    id: 6,
    homeTeam: 3,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "Xis Vê"
    },
    teamAway: {
      teamName: "Burro da Central"
    },
  },
]

export const matchesInProgress: IMatches[] = [
  {
    id: 5,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: "Burro da Central"
    },
    teamAway: {
      teamName: "Águia do Vale"
    },
  },
  {
    id: 6,
    homeTeam: 3,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "Xis Vê"
    },
    teamAway: {
      teamName: "Burro da Central"
    },
  },
]

export const matchesNotInProgress: IMatches[] = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Águia do Vale"
    },
    teamAway: {
      teamName: "Burro da Central"
    },
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 3,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: {
      teamName: "Burro da Central"
    },
    teamAway: {
      teamName: "Xis Vê"
    },
  },
  {
    id: 3,
    homeTeam: 3,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Xis Vê"
    },
    teamAway: {
      teamName: "Águia do Vale"
    },
  },
  {
    id: 4,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Águia do Vale"
    },
    teamAway: {
      teamName: "Xis Vê"
    },
  },
]

export const matchesFinishedWithoutID = [
  {
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Águia do Vale"
    },
    teamAway: {
      teamName: "Burro da Central"
    },
  },
  {
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 3,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: {
      teamName: "Burro da Central"
    },
    teamAway: {
      teamName: "Xis Vê"
    },
  },
  {
    homeTeam: 3,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Xis Vê"
    },
    teamAway: {
      teamName: "Águia do Vale"
    },
  },
  {
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Águia do Vale"
    },
    teamAway: {
      teamName: "Xis Vê"
    },
  },
]

export const matchToBeInserted = {
  homeTeam: 1,
  awayTeam: 2,
  homeTeamGoals: 0,
  awayTeamGoals: 0
}

export const matchInserted: IMatch = {
  awayTeam: 2,
  awayTeamGoals: 0,
  homeTeam: 1,
  homeTeamGoals: 0,
  id: 7,
  inProgress: true
}

export const twoEqualTeams: IMatch = {
  awayTeam: 2,
  awayTeamGoals: 0,
  homeTeam: 2,
  homeTeamGoals: 0,
  id: 7,
  inProgress: true
}

export const teamDoesNotExist: IMatch = {
  awayTeam: 999,
  awayTeamGoals: 0,
  homeTeam: 2,
  homeTeamGoals: 0,
  id: 7,
  inProgress: true
}

export const matchToBeUpdated = {
  homeTeamGoals: 4,
  awayTeamGoals: 2
}

export const matchUpdated: IMatch[] = [
  {
  id: 6,
  homeTeam: 3,
  homeTeamGoals: 1,
  awayTeam: 2,
  awayTeamGoals: 0,
  inProgress: true,
}
]

export const leaderboardAtHome = [
  {
    name: "Águia do Vale",
    totalPoints: 4,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 2,
    goalsBalance: 1,
    efficiency: 66.67
  },
  {
    name: "Xis Vê",
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: 33.33
  },
  {
    name: "Burro da Central",
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 0,
    goalsOwn: 2,
    goalsBalance: -2,
    efficiency: 0
  }
]

export const leaderboardAway = [
  {
    name: "Xis Vê",
    totalPoints: 3,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 3,
    goalsOwn: 2,
    goalsBalance: 1,
    efficiency: 50.00
  },
  {
    name: "Águia do Vale",
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: 33.33
  },
  {
    name: "Burro da Central",
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: 33.33
  }
]

export const leaderboardGeneral = [
  {
    name: "Águia do Vale",
    totalPoints: 5,
    totalGames: 3,
    totalVictories: 1,
    totalDraws: 2,
    totalLosses: 0,
    goalsFavor: 4,
    goalsOwn: 3,
    goalsBalance: 1,
    efficiency: 55.56
  },
  {
    name: "Xis Vê",
    totalPoints: 4,
    totalGames: 3,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 4,
    goalsOwn: 3,
    goalsBalance: 1,
    efficiency: 44.44
  },
  {
    name: "Burro da Central",
    totalPoints: 1,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 3,
    goalsBalance: -2,
    efficiency: 16.67
  }
]

export const allFieldsMustBeFilled: string = 'All fields must be filled'

export const incorrectEmailOrPassword: string = 'Incorrect email or password'

export const notTwoEqualTeams: string = 'It is not possible to create a match with two equal teams'

export const thereIsNoTeam: string = 'There is no team with such id!'

export const finished: string = 'Finished'
