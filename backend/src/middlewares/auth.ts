import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { JWT_SECRET } from "../config";

interface IPayload {
  email: string;
  id: string;
  first_name: string;
  last_name: string;
}

export function auth(request: Request, response: Response, next: NextFunction) {
  const authToken = request.session.jwt;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid"
    });
  }

  try {
    const user = verify(authToken, JWT_SECRET) as IPayload;

    request.user_id = user.id;

    return next();
  } catch (err) {
    return response.status(401).json({
      errorCode: "token.expired"
    });
  }
}
