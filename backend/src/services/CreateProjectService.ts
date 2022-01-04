import prismaClient from "../prisma";

class CreateProjectService {
  async execute(projectName: string, creatorId: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: creatorId
      }
    });

    const newProject = await prismaClient.project.create({
      data: {
        name: projectName,
        creator_id: creatorId,
        members: {
          create: [
            {
              member_id: creatorId,
              name: `${user.first_name} ${user.last_name}`,
              is_creator: true,
              role: "Administrator"
            }
          ]
        }
      },
      include: {
        creator: true
      }
    });

    return newProject;
  }
}

export { CreateProjectService };
