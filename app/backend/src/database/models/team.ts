import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import ITeam from '../../interfaces/ITeam';

class Team extends Model implements ITeam {
  public id!: number;
  public teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Team;
