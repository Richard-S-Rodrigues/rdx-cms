import prismaClient from "../prisma";

class ListProjectsService {
  async execute(userId: string) {
    const projects = await prismaClient.project.findMany({
      where: {
        members: {
          some: {
            member_id: userId
          }
        }
      },
      include: {
        members: true
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return projects;
  }
}

export { ListProjectsService };
