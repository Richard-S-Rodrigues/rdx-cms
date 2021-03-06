import { HttpException } from "../exceptions/httpException";
import prismaClient from "../prisma";

class UpdateBlogPostService {
  async execute(post_id: string, updated_data) {
    const updatedPost = await prismaClient.blogPost.update({
      where: {
        id: post_id
      },
      data: {
        title: updated_data.title,
        description: updated_data.description,
        markdown_content: updated_data.markdown_content,
        raw_content: updated_data.raw_content,
        is_published: updated_data.is_published
      }
    });

    if (!updatedPost) {
      throw new HttpException(400, "Error updating blog post");
    }

    return updatedPost;
  }
}

export { UpdateBlogPostService };
