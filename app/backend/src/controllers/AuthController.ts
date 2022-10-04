import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ILogin from '../interfaces/ILogin';
import AuthService from '../services/AuthService';

class AuthController {
  login = async (req: Request, res: Response): Promise<void> => {
    const payload = req.body as ILogin;
    const token: string = await AuthService.login(payload);

    res.status(StatusCodes.OK).json({ token });
  };
}

export default AuthController;
