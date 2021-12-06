import prismaClient from "../prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { JWT_SECRET } from "../config";

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

    const token = sign(
      {
        user: {
          id: user.id,
          email: user.email
        }
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    delete user.password;

    return { token, user };
  }
}

export { AuthenticateUserService };
