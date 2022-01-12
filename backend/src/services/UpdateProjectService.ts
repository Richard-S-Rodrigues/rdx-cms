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

    members.forEach(async (member) => {
      await this.updateMember(project_id, member);
    });

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

  async updateMember(project_id: string, member: IMembers) {
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
      throw new HttpException(400, "Error updating members");
    }
  }
}

export { UpdateProjectService };
