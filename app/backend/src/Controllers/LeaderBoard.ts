import { Request, Response } from 'express';
import LeaderBoardS from '../Services/LeaderBoard';

class LeaderBoardC {
  constructor(private _service = new LeaderBoardS()) { }

  home = async (_req: Request, res: Response) => {
    const result = await this._service.home();

    return res.status(200).json(result);
  };

  away = async (_req: Request, res: Response) => {
    const result = await this._service.away();

    return res.status(200).json(result);
  };

  total = async (_req: Request, res: Response) => {
    const result = await this._service.total();

    return res.status(200).json(result);
  };
}

export default LeaderBoardC;
