import { Request, Response } from "express";
import { CurrentSessionService } from "../services/CurrentSessionService";

class CurrentSessionController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const service = new CurrentSessionService();

    const result = await service.execute(user_id);

    // Return without password
    delete result.password;
    return response.status(200).json(result);
  }
}

export { CurrentSessionController };
