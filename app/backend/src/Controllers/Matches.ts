import { Request, Response } from 'express';
import MatchesS from '../Services/Matches';
import Authorization from '../Middleware/Authorization';

export default class matchesC {
  protected _matchesS: MatchesS;
  protected _authorization: Authorization;

  constructor() {
    this._matchesS = new MatchesS();
    this._authorization = new Authorization();
  }

  async getMatches(req: Request, res: Response) {
    const result = await this._matchesS.getMatches();

    res.status(200).json(result);
  }

  async postMatches(req: Request, res: Response) {
    const { authorization } = req.headers;
    const {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    } = req.body;

    const token = await this._authorization.findingToken(authorization);

    await this._authorization.validateToken(token);

    const insert = await this._matchesS.postMatches(
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    );

    res.status(201).json(insert);
  }

  async pathMatches(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this._matchesS.pathMatches(id);

    res.status(200).json(result);
  }

  async pathMatchesInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const result = await this._matchesS.pathMatchesInProgress(
      id,
      homeTeamGoals,
      awayTeamGoals,
    );

    res.status(200).json(result);
  }
}
