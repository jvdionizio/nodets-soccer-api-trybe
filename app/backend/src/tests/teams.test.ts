import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import {
  teamsMock,
} from './data'
import { afterEach, beforeEach } from 'mocha';
import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  describe('1 - Quando for feita a requisiçao na rota "/teams"', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findAll').resolves(teamsMock as Team[])
    })

    afterEach(() => {
      sinon.restore()
    })

    it('retorna status 200', async () => {
      const response = await chai.request(app)
      .get('/teams')

    expect(response.status).to.be.eq(StatusCodes.OK)
    })

    it('retorna um array com os times cadastrados', async () => {
      const response = await chai.request(app)
      .get('/teams')

      expect(response.body).to.be.eql(teamsMock)
    })
  })

  describe('2 - Quando for feita a requisição na rota "/teams/:id"', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('retorna status 200', async () => {
      sinon.stub(Team, 'findByPk').withArgs(2).resolves(teamsMock[1] as Team)
      const response = await chai.request(app)
      .get('/teams/2')

    expect(response.status).to.be.eq(StatusCodes.OK)
    })

    it('retorna um array com os times cadastrados', async () => {
      sinon.stub(Team, 'findByPk').withArgs(2).resolves(teamsMock[1] as Team)
      const response = await chai.request(app)
      .get('/teams/2')

      expect(response.body).to.be.eql(teamsMock[1])
    })

    it('retorna status 400 caso o time não esteja cadastrado', async () => {
      sinon.stub(Team, 'findByPk').withArgs(999).resolves(null)
      const response = await chai.request(app)
      .get('/teams/999')

    expect(response.status).to.be.eq(StatusCodes.BAD_REQUEST)
    })

    it('retorna um erro "Not a valid team" caso o time não esteja cadastrado', async () => {
      sinon.stub(Team, 'findByPk').withArgs(999).resolves(null)
      const response = await chai.request(app)
      .get('/teams/999')

      expect(response.body).to.be.eql({ message: 'Not a valid team' })
    })
  })
})
