import { HttpException } from "../exceptions/httpException";
import prismaClient from "../prisma";

class ListProjectByIdService {
  async execute(projectId: string, userId: string) {
    const project = await prismaClient.projectMember.findFirst({
      where: {
        member_id: userId,
        project_id: projectId
      },
      include: {
        project: true
      }
    });

    if (!project) {
      throw new HttpException(403, "User not allowed");
    }

    return project;
  }
}

export { ListProjectByIdService };
