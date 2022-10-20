import { Request, Response, NextFunction } from 'express';

const errors: Record<string, number> = {
  fieldsMissing: 400,
  invalidField: 401,
  tokenNotFound: 401,
  invalidToken: 401,
  userNotExists: 404,
};

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { name, message } = error;
  const status = errors[name];

  if (!status) return res.status(500).json({ message });

  return res.status(status).json({ message });
};

export default errorHandler;
