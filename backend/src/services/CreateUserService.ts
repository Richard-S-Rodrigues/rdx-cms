import prismaClient from "../prisma";
import { hash } from "bcrypt";

interface IData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ first_name, last_name, email, password }: IData) {
    let user = await prismaClient.user.findFirst({
      where: {
        email
      }
    });

    if (user) {
      throw new Error("User already exists");
    }

    const passwordHashed = await hash(password, 12);

    user = await prismaClient.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: passwordHashed
      }
    });

    // Returning withou password field
    delete user.password;
    return user;
  }
}

export { CreateUserService };
