import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpException";

const ErrorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  return response.status(status).json({
    error: message
  });
};

export { ErrorHandler };
