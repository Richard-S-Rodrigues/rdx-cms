import prismaClient from "../prisma";
import { compare } from "bcrypt";
import { HttpException } from "../exceptions/httpException";

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
      throw new HttpException(404, "Invalid credentials");
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(404, "Invalid credentials");
    }

    delete user.password;

    return { user };
  }
}

export { AuthenticateUserService };
