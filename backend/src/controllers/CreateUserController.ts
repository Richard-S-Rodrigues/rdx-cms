import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";


class CreateUserController {
  async handle(request: Request, response: Response) {
    const service = new CreateUserService();
    const requestData = request.body 

    try {
      const result = await service.execute(requestData)

      return response.status(201).json(result)
    } catch(err) {
      return response.status(401).json({
        error: err.message
      })
    }
  }
}

export { CreateUserController }
