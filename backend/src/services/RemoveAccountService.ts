import prismaClient from "../prisma";

class RemoveAccountService {
  async execute(userId: string) {
    const deleteUser = await prismaClient.user.delete({
      where: {
        id: userId
      }
    });

    return deleteUser;
  }
}

export { RemoveAccountService };
