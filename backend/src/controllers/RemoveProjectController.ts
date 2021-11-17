import { Request, Response } from "express";
import { RemoveProjectService } from "../services/RemoveProjectService";

class RemoveProjectController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const { project_id } = request.body;
    const service = new RemoveProjectService();

    try {
      const result = await service.execute(user_id, project_id);

      return response.status(201).json(result);
    } catch (err) {
      return response.status(401).json({
        error: err.message,
      });
    }
  }
}

export { RemoveProjectController };
