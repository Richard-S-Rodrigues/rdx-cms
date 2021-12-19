import prismaClient from "../prisma";

class ListProjectsService {
  async execute(userId: string) {
    const projects = await prismaClient.projectMember.findMany({
      where: {
        member_id: userId
      },
      include: {
        project: true
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return projects;
  }
}

export { ListProjectsService };
