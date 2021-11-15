import { Request, Response } from "express";
import { ResetPasswordService } from "../services/ResetPasswordService";

class RequestResetPasswordController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;
    const service = new ResetPasswordService();

    try {
      const result = await service.request(email);

      return response.status(201).json(result);
    } catch (err) {
      return response.status(401).json({
        error: err.message,
      });
    }
  }
}

export { RequestResetPasswordController };
