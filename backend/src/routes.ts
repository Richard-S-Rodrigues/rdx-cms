import { Router } from "express";

const router = Router()

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { RequestResetPasswordController } from "./controllers/RequestResetPasswordController";
import { ResetPasswordController } from "./controllers/ResetPasswordController";


router.post("/signout", new CreateUserController().handle)
router.post("/signin", new AuthenticateUserController().handle)
router.post("/requestPasswordReset", new RequestResetPasswordController().handle)
router.post("/passwordReset", new ResetPasswordController().handle)

export { router };
