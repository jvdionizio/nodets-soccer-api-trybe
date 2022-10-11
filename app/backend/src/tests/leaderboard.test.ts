import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import {
  teamsMock,
  matchesFinishedWithoutID,
  leaderboardAtHome,
  leaderboardAway,
  leaderboardGeneral,
} from './data'
import { afterEach, beforeEach } from 'mocha';
import { StatusCodes } from 'http-status-codes';
import Match from '../database/models/match';
import Team from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  describe('1 - Quando for feita a requisiçao GET na rota "/leaderboard"', () => {
    beforeEach(() => {
      sinon.stub(Match, 'findAll').resolves(matchesFinishedWithoutID as unknown as Match[])
      sinon.stub(Team, 'findAll').resolves(teamsMock as Team[])
    })

    afterEach(() => {
      sinon.restore()
    })

    it('retorna status 200', async () => {
      const response = await chai.request(app)
      .get('/leaderboard')

    expect(response.status).to.be.eq(StatusCodes.OK)
    })

    it('retorna um array com a classificação de todos os times', async () => {
      const response = await chai.request(app)
      .get('/leaderboard')

    expect(response.body).to.be.eql(leaderboardGeneral)
    })

    it('acessando com "/leaderboard/home" retorna status 200', async () => {
      const response = await chai.request(app)
      .get('/leaderboard/home')

    expect(response.status).to.be.eq(StatusCodes.OK)
    })

    it('retorna um array com a classificação de todos os times jogando em casa', async () => {
      const response = await chai.request(app)
      .get('/leaderboard/home')

    expect(response.body).to.be.eql(leaderboardAtHome)
    })

    it('acessando com "/leaderboard/home" retorna status 200', async () => {
      const response = await chai.request(app)
      .get('/leaderboard/away')

    expect(response.status).to.be.eq(StatusCodes.OK)
    })

    it('retorna um array com a classificação de todos os times jogando fora', async () => {
      const response = await chai.request(app)
      .get('/leaderboard/away')

    expect(response.body).to.be.eql(leaderboardAway)
    })
  })
})
