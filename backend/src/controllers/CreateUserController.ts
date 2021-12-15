import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const service = new CreateUserService();
    const requestData = request.body;

    const result = await service.execute(requestData);

    return response.status(201).json(result);
  }
}

export { CreateUserController };
