import * as bcrypt from 'bcryptjs';
import { data } from '../Interfaces/User.interfaces';
import userM from '../database/models/User';
import Authorization from '../Middleware/Authorization';

export default class UserS {
  protected _userM: typeof userM;
  protected _authorization: Authorization;

  constructor() {
    this._userM = userM;
    this._authorization = new Authorization();
  }

  async userLogin(
    email: string,
    password: string,
  ): Promise<string | undefined> {
    const user = await this._userM.findOne({ where: { email } });

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'invalidField';

      throw error;
    }

    const emailComparison = await bcrypt.compare(password, user.password);

    if (emailComparison) {
      return this._authorization.generateToken(
        user as unknown as data & { toJSON(): data },
      );
    }
  }
}
