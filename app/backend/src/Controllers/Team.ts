import { Response, Request } from 'express';
import TeamS from '../Services/Team';

export default class teamC {
  protected _teamS: TeamS;

  constructor() {
    this._teamS = new TeamS();
  }

  async getTeam(req: Request, res: Response) {
    const result = await this._teamS.getTeam();

    res.status(200).json(result);
  }

  async getTeamID(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this._teamS.getTeamID(id);

    res.status(200).json(result);
  }
}
