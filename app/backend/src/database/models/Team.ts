import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    field: 'team_name',
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'Team',
  tableName: 'teams',
  timestamps: false,
});

export default Team;
