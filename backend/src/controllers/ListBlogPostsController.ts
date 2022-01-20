import { Request, Response } from "express";
import { ListBlogPostsService } from "../services/ListBlogPostsService";

class ListBlogPostsController {
  async handle(request: Request, response: Response) {
    const { id: project_id } = request.params;
    const { user_id } = request;

    const service = new ListBlogPostsService();
    const result = await service.execute(project_id, user_id);

    return response.status(200).json(result);
  }
}

export { ListBlogPostsController };
