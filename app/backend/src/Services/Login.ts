import { BodyRequisition } from '../Interfaces/BodyReq.interface';
import User from '../database/models/User';

export default class LoginS {
  protected _User: typeof User;

  constructor() {
    this._User = User;
  }

  fieldsValidation = async (credentials: BodyRequisition) => {
    const { email, password } = credentials;

    if (!email || !password) {
      const error = new Error('All fields must be filled');
      error.name = 'fieldsMissing';

      throw error;
    }

    return credentials;
  };
}
