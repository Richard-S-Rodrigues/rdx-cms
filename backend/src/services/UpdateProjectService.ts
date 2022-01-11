import prismaClient from "../prisma";
import { HttpException } from "../exceptions/httpException";

interface IData {
  name: string;
  members: IMembers[];
}

interface IMembers {
  member_id: string;
  role: string;
}

class UpdateProjectService {
  async execute(user_id: string, project_id: string, updated_data: IData) {
    const { name, members } = updated_data;

    await this.checkUserAuth(project_id, user_id);

    const project = await prismaClient.project.findUnique({
      where: {
        id: project_id
      },
      include: {
        members: true
      }
    });

    await this.updateMembers(project_id, project, members);

    const updated_project = await prismaClient.project.update({
      where: {
        id: project_id
      },
      data: {
        name
      },
      include: { members: true }
    });

    if (!updated_project) throw new HttpException(404, "Project not found");

    //const [, updated_project_result] = await prismaClient.$transaction([
    //  updated_members,
    //  updated_project
    //]);

    return updated_project;
  }

  async checkUserAuth(project_id: string, user_id: string) {
    const user = await prismaClient.projectMember.findFirst({
      where: {
        project_id,
        member_id: user_id
      }
    });

    if (!user || (!user.is_creator && user.role !== "Administrator")) {
      throw new HttpException(403, "User not allowed to update project");
    }
  }

  async updateMembers(project_id: string, project, members: IMembers[]) {
    members.forEach(async (member, index) => {
      //const { role, ...members_without_role } = project.members[index];
      //project.members.splice(index, 1, {
      //  ...members_without_role,
      //  role: member.role
      //});

      try {
        await prismaClient.projectMember.updateMany({
          where: {
            project_id,
            member_id: member.member_id
          },
          data: {
            role: member.role
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
}

export { UpdateProjectService };
