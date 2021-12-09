import { Request, Response } from "express";
import { ListProjectsService } from "../services/ListProjectsService";

class ListProjectsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const service = new ListProjectsService();

    try {
      const result = await service.execute(user_id);

      return response.status(200).json(result);
    } catch (err) {
      return response.status(401).json({
        error: err.message
      });
    }
  }
}

export { ListProjectsController };
