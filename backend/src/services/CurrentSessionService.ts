import prismaClient from "../prisma";

class CurrentSessionService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    });

    if (!user) throw new Error("Unauthenticated");

    return user;
  }
}

export { CurrentSessionService };
