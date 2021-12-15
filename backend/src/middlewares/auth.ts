import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { JWT_SECRET } from "../config";
import { HttpException } from "../exceptions/httpException";

interface IPayload {
  email: string;
  id: string;
  first_name: string;
  last_name: string;
}

export function auth(request: Request, response: Response, next: NextFunction) {
  const authToken = request.session.jwt;

  if (!authToken) {
    throw new HttpException(401, "Token invalid or expired");
  }

  const user = verify(authToken, JWT_SECRET) as IPayload;

  if (!user) {
    throw new HttpException(401, "Token invalid or expired");
  }

  request.user_id = user.id;

  return next();
}
