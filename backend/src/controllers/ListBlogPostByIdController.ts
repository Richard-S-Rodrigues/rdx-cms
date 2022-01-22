import { Request, Response } from "express";
import { ListBlogPostByIdService } from "../services/ListBlogServiceByIdService";

class ListBlogPostByIdController {
  async handle(request: Request, response: Response) {
    const { post_id } = request.params;
    const service = new ListBlogPostByIdService();

    const result = await service.execute(post_id);
    return response.status(200).json(result);
  }
}

export { ListBlogPostByIdController };
