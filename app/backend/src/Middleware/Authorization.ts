import * as jwt from 'jsonwebtoken';
import { data } from '../Interfaces/User.interfaces';

export default class Authorization {
  generateToken = async (user: data & { toJSON(): data }) => {
    const { password: _, ...acessDenied } = user.toJSON();
    const token = jwt.sign(
      { data: acessDenied },
      String(process.env.JWT_SECRET),
      {
        expiresIn: '15d',
        algorithm: 'HS256',
      },
    );

    return token;
  };

  validateToken = async (token: string) => {
    try {
      const { data: file } = jwt.verify(
        token,
        String(process.env.JWT_SECRET),
      ) as {
        data: data;
      };

      return file;
    } catch (_err) {
      const error = new Error('Token must be a valid token');
      error.name = 'invalidToken';

      throw error;
    }
  };

  findingToken = async (token: string | undefined) => {
    if (!token) {
      const error = new Error('Token not found');
      error.name = 'tokenNotFound';

      throw error;
    }

    return token;
  };

  decryptToken = async (token: string) => {
    try {
      const decrypted = jwt.verify(token, String(process.env.JWT_SECRET));

      return decrypted as jwt.JwtPayload;
    } catch (_err) {
      const error = new Error('Expired or invalid token');
      error.name = 'invalidToken';

      throw error;
    }
  };
}
