import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { sendEmail } from "../utils/resetPassword/sendEmail";

import { JWT_SECRET } from "../config";

class ResetPasswordService {
  async request(email: string) {
    const user = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const tokenExists = await prismaClient.resetPasswordToken.findFirst({
      where: { user_id: user.id },
    });

    if (tokenExists) {
      await prismaClient.resetPasswordToken.deleteMany({
        where: { user_id: user.id },
      });
    }

    const resetPasswordToken = sign({ id: user.id }, JWT_SECRET);

    await prismaClient.resetPasswordToken.create({
      data: {
        token: resetPasswordToken,
        user_id: user.id,
      },
    });

    const link = `http://localhost:3000/passwordReset?token=${resetPasswordToken}&id=${user.id}`;

    await sendEmail({
      email,
      subject: "Password reset",
      payload: { name: user.first_name, link },
      template: "./templates/requestResetPassword.handlebars",
    });

    return link;
  }

  async reset(userId: string, token: string, password: string) {
    const resetPasswordToken = await prismaClient.resetPasswordToken.findFirst({
      where: { user_id: userId },
    });

    if (!resetPasswordToken) {
      throw new Error("Invalid or expired token");
    }

    if (token !== resetPasswordToken.token) {
      throw new Error("Invalid or expired token");
    }

    const passwordHashed = await hash(password, 12);

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        password: passwordHashed,
      },
    });

    const user = await prismaClient.user.findFirst({
      where: { id: userId },
    });

    await sendEmail({
      email: user.email,
      subject: "Password reset",
      payload: { name: user.first_name },
      template: "./templates/resetPassword.handlebars",
    });

    await prismaClient.resetPasswordToken.deleteMany({
      where: { user_id: userId }
    })
    
    // Return updatedUser without password
    delete updatedUser.password
    return updatedUser 
  }
}
export { ResetPasswordService };
