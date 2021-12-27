import { Request, Response } from "express";
import { RemoveAccountService } from "../services/RemoveAccountService";

class RemoveAccountController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const service = new RemoveAccountService();

    const result = await service.execute(user_id);

    delete result.password;
    return response.status(200).json(result);
  }
}

export { RemoveAccountController };
