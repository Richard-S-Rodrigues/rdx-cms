import { Request, Response } from "express";
import { CreateProjectService } from "../services/CreateProjectService";

class CreateProjectController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;
    const { user_id: creator_id } = request;
    const service = new CreateProjectService();

    const result = await service.execute(name, creator_id);

    // Return without password
    delete result.creator.password;
    return response.status(201).json(result);
  }
}

export { CreateProjectController };
