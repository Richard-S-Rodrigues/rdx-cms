import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { sign } from "jsonwebtoken";

import { JWT_SECRET } from "../config";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const requestData = request.body;
    const service = new AuthenticateUserService();

    const result = await service.execute(requestData);

    request.session.jwt = sign(result.user, JWT_SECRET);

    return response.status(200).json(result);
  }

  logout(request: Request, response: Response) {
    request.session = null;
    response.send();
  }
}

export { AuthenticateUserController };
