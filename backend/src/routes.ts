import { Router } from "express";

const router = Router()

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";


router.post("/signout", new CreateUserController().handle)
router.post("/signin", new AuthenticateUserController().handle)

export { router };
