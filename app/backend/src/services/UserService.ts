import User from '../database/models/user';
import IUser from '../interfaces/IUser';

class UserService {
  static async list(): Promise<IUser[]> {
    const users: IUser[] = await User.findAll();

    return users;
  }
}

export default UserService;
