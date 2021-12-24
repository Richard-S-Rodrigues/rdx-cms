import prismaClient from "../prisma";
import { HttpException } from "../exceptions/httpException";

interface IData {
  userId: string;
  updatedData?: {
    first_name: string;
    last_name: string;
  };
}

class UpdateUserService {
  async execute({ userId, updatedData }: IData) {
    const updateUser = await prismaClient.user.update({
      where: {
        id: userId
      },
      data: updatedData
    });

    if (!updateUser) throw new HttpException(404, "User not found!");

    return updateUser;
  }
}

export { UpdateUserService };
