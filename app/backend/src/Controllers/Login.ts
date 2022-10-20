import { Response, Request } from 'express';
import Authorization from '../Middleware/Authorization';
import UserS from '../Services/User';
import LoginS from '../Services/Login';

export default class Login {
  protected _userS: UserS;
  protected _loginS: LoginS;
  protected _authorization: Authorization;

  constructor() {
    this._userS = new UserS();
    this._loginS = new LoginS();
    this._authorization = new Authorization();
  }

  async postLogin(req: Request, res: Response) {
    const data = await this._loginS.fieldsValidation(req.body);
    const { email, password } = data;
    const token = await this._userS.userLogin(email, password);

    res.status(200).json({ token });
  }

  async getUser(req: Request, res: Response) {
    const { authorization } = req.headers;
    const takeToken = await this._authorization.findingToken(authorization);
    const decrypting = await this._authorization.decryptToken(takeToken);
    const { role } = decrypting.data;

    res.status(200).json({ role });
  }
}
