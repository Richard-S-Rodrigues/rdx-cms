import prismaClient from "../prisma";
import { compare } from "bcrypt";

interface IData {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IData) {
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    delete user.password;

    return { user };
  }
}

export { AuthenticateUserService };
