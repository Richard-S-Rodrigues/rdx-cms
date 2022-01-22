import { HttpException } from "../exceptions/httpException";
import prismaClient from "../prisma";

class ListBlogPostByIdService {
  async execute(post_id: string) {
    const post = await prismaClient.blogPost.findUnique({
      where: {
        id: post_id
      }
    });

    if (!post) {
      throw new HttpException(404, "Blog post not found!");
    }

    return post;
  }
}

export { ListBlogPostByIdService };
