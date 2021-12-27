import { HttpException } from "../exceptions/httpException";
import prismaClient from "../prisma";

class RemoveProjectService {
  async execute(user_id: string, project_id: string) {
    const project = await prismaClient.project.findFirst({
      where: { id: project_id }
    });

    if (!project) {
      throw new HttpException(404, "Project does not exists");
    }

    if (project.creator_id !== user_id) {
      throw new HttpException(
        403,
        "Project can only be delete it by the creator"
      );
    }

    const deleteProject = await prismaClient.project.delete({
      where: {
        id: project_id
      }
    });

    return deleteProject;
  }
}

export { RemoveProjectService };
