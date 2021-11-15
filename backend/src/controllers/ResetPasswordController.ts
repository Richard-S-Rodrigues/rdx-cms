import { Request, Response } from "express";
import { ResetPasswordService } from "../services/ResetPasswordService";

class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const { userId, token, password } = request.body;
    const service = new ResetPasswordService()

    try {
      const result = await service.reset(userId, token, password)

      return response.status(201).json(result)
    } catch(err) {
      return response.status(401).json({
        error: err.message
      })
    }
  }
}

export { ResetPasswordController }
