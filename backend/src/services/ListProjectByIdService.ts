import { HttpException } from "../exceptions/httpException";
import prismaClient from "../prisma";

class ListProjectByIdService {
  async execute(projectId: string, userId: string) {
    const project = await prismaClient.project.findFirst({
      where: {
        id: projectId,
        members: {
          some: {
            member_id: userId
          }
        }
      },
      include: {
        members: true
      }
    });

    if (!project) {
      throw new HttpException(403, "User not allowed");
    }

    return project;
  }
}

export { ListProjectByIdService };
