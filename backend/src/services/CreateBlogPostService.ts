import { HttpException } from "../exceptions/httpException";
import prismaClient from "../prisma";

interface IData {
  title: string;
  description: string;
  content: string;
  is_published: boolean;
  project_id: string;
  user_id: string;
}

class CreateBlogPostService {
  async execute(data: IData) {
    try {
      const newPost = await prismaClient.blogPost.create({
        data: {
          title: data.title,
          description: data.description,
          content: data.content,
          is_published: data.is_published,
          project_id: data.project_id,
          author_id: data.user_id
        }
      });

      return newPost;
    } catch (err) {
      throw new HttpException(400, "Error creating blog post");
    }
  }
}

export { CreateBlogPostService };
