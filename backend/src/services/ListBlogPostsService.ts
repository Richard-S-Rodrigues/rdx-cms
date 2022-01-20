import { HttpException } from "../exceptions/httpException";
import prismaClient from "../prisma";

class ListBlogPostsService {
  async execute(project_id: string, user_id: string) {
    const project = await prismaClient.project.findFirst({
      where: {
        id: project_id,
        members: {
          some: {
            member_id: user_id
          }
        }
      }
    });

    if (!project) {
      throw new HttpException(404, "Project not found");
    }

    const posts = await prismaClient.blogPost.findMany({
      where: {
        project_id
      },
      include: {
        project: true,
        author: {
          select: {
            first_name: true,
            last_name: true,
            email: true
          }
        }
      }
    });

    if (!posts) {
      throw new HttpException(404, "Blog post not found");
    }

    return posts;
  }
}

export { ListBlogPostsService };
