import { Request, Response } from "express";
import { ListProjectByIdService } from "../services/ListProjectByIdService";

class ListProjectByIdController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const { id } = request.params;
    const service = new ListProjectByIdService();

    const result = await service.execute(id, user_id);

    return response.status(200).json(result);
  }
}

export { ListProjectByIdController };
