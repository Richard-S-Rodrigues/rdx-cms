import prismaClient from "../prisma";

class RemoveProjectService {
  async execute(user_id: string, project_id: string) {
    const updatedProject = await prismaClient.project.delete({
      where: {
        id: project_id,
        creator_id: user_id
      }
    })

    return updatedProject
  }
}

export { RemoveProjectService }
