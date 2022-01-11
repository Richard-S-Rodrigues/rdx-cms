import { Request, Response } from "express";
import { UpdateProjectService } from "../services/UpdateProjectService";

class UpdateProjectController {
  async handle(request: Request, response: Response) {
    const data = request.body;
    const { user_id } = request;
    const { id: project_id } = request.params;
    const service = new UpdateProjectService();

    const result = await service.execute(user_id, project_id, data);

    return response.status(201).json(result);
  }
}

export { UpdateProjectController };
