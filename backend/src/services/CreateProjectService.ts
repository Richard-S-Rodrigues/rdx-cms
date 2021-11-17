import prismaClient from "../prisma";

class CreateProjectService {
  async execute(projectName: string, creatorId: string) {
    const newProject = await prismaClient.project.create({
      data: {
        name: projectName,
        creator_id: creatorId,
        members: {
          create: [{
            member_id: creatorId,
            is_creator: true,
            role: "Administrator",
          }]
        },
      },
      include: {
        creator: true,
      },
    });

    return newProject;
  }
}

export { CreateProjectService };
