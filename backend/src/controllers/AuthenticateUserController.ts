import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const requestData = request.body;
    const service = new AuthenticateUserService();

    try {
      const result = await service.execute(requestData);

      return response.status(200).json(result);
    } catch (err) {
      return response.status(401).json({
        error: err.message,
      });
    }
  }
}

export { AuthenticateUserController };
