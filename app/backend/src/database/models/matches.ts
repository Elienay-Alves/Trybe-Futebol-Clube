import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class matches extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },

  homeTeam: {
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    type: INTEGER,
    field: 'home_team',
  },

  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals',
  },

  awayTeam: {
    allowNull: false,
    references: {
      model: 'team',
      key: 'id',
    },
    type: INTEGER,
    field: 'away_team',
  },

  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
  },

  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
});

matches.belongsTo(Team, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

matches.belongsTo(Team, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

Team.hasMany(matches, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

Team.hasMany(matches, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default matches;
