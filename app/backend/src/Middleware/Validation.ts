import MatchesM from '../database/models/matches';

export default class Validation {
  protected _matchesM: typeof MatchesM;

  constructor() {
    this._matchesM = MatchesM;
  }

  exists = (
    homeT: number,
    awayT: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    if (!homeT || !awayT || !homeTeamGoals || !awayTeamGoals) {
      const error = new Error('Incorrect credentials');
      error.name = 'invalidField';

      throw error;
    }
  };

  async check(homeT: number, awayT: number) {
    const checkTime1 = await this._matchesM.findByPk(homeT);

    const checkTime2 = await this._matchesM.findByPk(awayT);

    if (!checkTime1 || !checkTime2) {
      const error = new Error('There is no team with such id!');
      error.name = 'userNotExists';

      throw error;
    }

    if (homeT === awayT) {
      const error = new Error(
        'It is not possible to create a match with two equal teams',
      );
      error.name = 'invalidField';

      throw error;
    }

    const checkResults = { checkTime1, checkTime2 };

    return checkResults;
  }
}
