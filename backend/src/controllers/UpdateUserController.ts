import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { user_id: userId } = request;
    const updatedData = request.body;
    const service = new UpdateUserService();

    const result = await service.execute({ userId, updatedData });

    delete result.password;
    return response.status(201).json(result);
  }
}

export { UpdateUserController };
