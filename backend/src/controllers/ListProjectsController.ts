import { Request, Response } from "express";
import { ListProjectsService } from "../services/ListProjectsService";

class ListProjectsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const service = new ListProjectsService();

    const result = await service.execute(user_id);

    return response.status(200).json(result);
  }
}

export { ListProjectsController };
