import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const validateToken = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization;
  if (!token) {
    const err = new Error('No token provided');
    err.name = ReasonPhrases.UNAUTHORIZED;
    throw err;
  }

  try {
    const validToken = jwt.verify(token, JWT_SECRET) as ILogin;
    if (validToken) next();
  } catch (error) {
    const err = new Error('Token must be a valid token');
    err.name = ReasonPhrases.UNAUTHORIZED;
    throw err;
  }
};

export default validateToken;
