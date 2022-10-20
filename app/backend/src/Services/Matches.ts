import Validation from '../Middleware/Validation';
import MatchesM from '../database/models/matches';
import TeamM from '../database/models/Team';

export default class MatchesS {
  protected _matchesM: typeof MatchesM;
  protected _teamM: typeof TeamM;
  protected _validation: Validation;

  constructor() {
    this._matchesM = MatchesM;
    this._teamM = TeamM;
    this._validation = new Validation();
  }

  async getMatches() {
    const result = await this._matchesM.findAll({
      include: [
        {
          model: this._teamM,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: this._teamM,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return result;
  }

  async postMatches(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    this._validation.exists(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

    await this._validation.check(homeTeam, awayTeam);

    const results = await this._matchesM.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return results;
  }

  async pathMatches(id: string) {
    const pathMatcher = await this._matchesM.update(
      { inProgress: false },
      { where: { id } },
    );

    return pathMatcher;
  }

  async pathMatchesInProgress(
    id: string,
    homeTeamGoals: string,
    awayTeamGoals: string,
  ) {
    const result = await this._matchesM.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return result;
  }
}
