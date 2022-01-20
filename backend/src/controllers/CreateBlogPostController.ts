import { Request, Response } from "express";
import { CreateBlogPostService } from "../services/CreateBlogPostService";

class CreateBlogPostController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const { id: project_id } = request.params;
    const data = request.body;

    const service = new CreateBlogPostService();
    const result = await service.execute({ ...data, project_id, user_id });

    return response.status(201).json(result);
  }
}

export { CreateBlogPostController };
