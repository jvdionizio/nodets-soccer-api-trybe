import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import {
  loginMock,
  tokenMock,
  emailLessMock,
  allFieldsMustBeFilled,
  passwordLessMock,
  incorrectEmailOrPassword,
  invalidEmail,
  invalidPassword,
  wrongEmail,
  wrongPassword,
  usersMock,
  noTokenProvided,
  invalidToken,
  tokenMustBeValid,
} from './data'
import * as jwt from 'jsonwebtoken';
import { afterEach, beforeEach } from 'mocha';
import User from '../database/models/user';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  describe('1 - Quando receber os parâmetros "email" e "password"', () => {
    beforeEach(() => {
      sinon.stub(jwt, 'sign').resolves(tokenMock)
      sinon.stub(User, 'findAll').resolves(usersMock as User[])
    })

    afterEach(() => {
      sinon.restore()
    })

    it('retorna status 200', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginMock)

      expect(response.status).to.be.eq(StatusCodes.OK)
    })

    it('retorna um token', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginMock)

      expect(response.body).to.be.eql({ token: tokenMock })
    })
  })

  describe('2 - Quando não receber o parâmetro "email"', () => {
    it('retorna o status 400', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(emailLessMock)

      expect(response.status).to.be.eq(StatusCodes.BAD_REQUEST)
    })

    it('retorna uma mensagem de erro', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(emailLessMock)

      expect(response.body).to.be.eql({ message: allFieldsMustBeFilled })
    })
  })

  describe('3 - Quando não receber o parâmetro "password"', () => {
    it('retorna o status 400', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(passwordLessMock)

      expect(response.status).to.be.eq(StatusCodes.BAD_REQUEST)
    })

    it('retorna uma mensagem de erro', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(passwordLessMock)

      expect(response.body).to.be.eql({ message: allFieldsMustBeFilled })
    })
  })

  describe('4 - Quando receber algum parâmetro inválido', () => {
    it('retorna o status 401 com "email" inválido', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(invalidEmail)

      expect(response.status).to.be.eq(StatusCodes.UNAUTHORIZED)
    })

    it('retorna uma mensagem de erro com "email" inválido', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(invalidEmail)

      expect(response.body).to.be.eql({ message: incorrectEmailOrPassword })
    })

    it('retorna o status 401 com "password" inválido', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(invalidPassword)

      expect(response.status).to.be.eq(StatusCodes.UNAUTHORIZED)
    })

    it('retorna uma mensagem de erro com "password" inválido', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(invalidPassword)

      expect(response.body).to.be.eql({ message: incorrectEmailOrPassword })
    })
  })

  describe('5 - Quando receber algum parâmetro errado', () => {
    beforeEach(() => {
      sinon.stub(User, 'findAll').resolves(usersMock as User[])
    })

    afterEach(() => {
      sinon.restore()
    })

    it('retorna o status 401 com "email" errado', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(wrongEmail)

      expect(response.status).to.be.eq(StatusCodes.UNAUTHORIZED)
    })

    it('retorna uma mensagem de erro com "email" errado', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(wrongEmail)

      expect(response.body).to.be.eql({ message: incorrectEmailOrPassword })
    })

    it('retorna o status 401 com "password" errado', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(wrongPassword)

      expect(response.status).to.be.eq(StatusCodes.UNAUTHORIZED)
    })

    it('retorna uma mensagem de erro com "password" errado', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(wrongPassword)

      expect(response.body).to.be.eql({ message: incorrectEmailOrPassword })
    })
  })

  describe('6 - Quando acessar o caminho /validate', () => {
    beforeEach(() => {
      sinon.stub(User, 'findAll').resolves(usersMock as User[])
      sinon.stub(jwt, 'decode').returns(loginMock)
    })

    afterEach(() => {
      sinon.restore()
    })

    it('retorna o "role" do usuário fazendo login', async () => {
      sinon.stub(jwt, 'verify').resolves(loginMock)
      const response = await chai.request(app)
        .get('/login/validate')
        .set('authorization', tokenMock)

      expect(response.body).to.be.eql({ role: 'admin'})
    })

    it('retorna um erro quando o usuário não fornecer um token', async () => {
      const response = await chai.request(app)
        .get('/login/validate')

      expect(response.status).to.be.eq(StatusCodes.UNAUTHORIZED)
      expect(response.body).to.be.eql({ message: noTokenProvided})
    })

    it('retorna um erro quando o usuário fornecer um token que não é válido', async () => {
      sinon.stub(jwt, 'verify').throws()
      const response = await chai.request(app)
        .get('/login/validate')
        .set('authorization', invalidToken)

      expect(response.status).to.be.eq(StatusCodes.UNAUTHORIZED)
      expect(response.body).to.be.eql({ message: tokenMustBeValid})
    })
  })
})
