import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import IUser from '../../interfaces/IUser';

class User extends Model implements IUser {
  public id!: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
