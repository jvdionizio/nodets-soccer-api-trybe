import * as jwt from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';
import 'dotenv/config';
import getUsers from '../middlewares/getUsers';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

class AuthService {
  static login = async (payload: ILogin) => {
    const token = jwt.sign({ email: payload.email }, JWT_SECRET);
    return token;
  };
}

export default AuthService;
