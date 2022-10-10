import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases } from 'http-status-codes';

const validateNotSameTeam = (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    const err = new Error('It is not possible to create a match with two equal teams');
    err.name = ReasonPhrases.UNAUTHORIZED;
    throw err;
  }

  next();
};

export default validateNotSameTeam;
