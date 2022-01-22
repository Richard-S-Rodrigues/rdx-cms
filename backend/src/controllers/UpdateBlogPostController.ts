import { Request, Response } from "express";
import { UpdateBlogPostService } from "../services/UpdateBlogPostService";

class UpdateBlogPostController {
  async handle(request: Request, response: Response) {
    const { post_id } = request.params;
    const updated_data = request.body;
    const service = new UpdateBlogPostService();

    const result = await service.execute(post_id, updated_data);
    return response.status(201).json(result);
  }
}

export { UpdateBlogPostController };
