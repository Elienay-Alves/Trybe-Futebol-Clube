import TeamM from '../database/models/Team';

class teamsService {
  protected _teamM: typeof TeamM;

  constructor() {
    this._teamM = TeamM;
  }

  async getTeam() {
    const result = await this._teamM.findAll();

    return result;
  }

  async getTeamID(id: string) {
    const result = await this._teamM.findByPk(id);

    return result;
  }
}

export default teamsService;
