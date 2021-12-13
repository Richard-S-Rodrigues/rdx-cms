import { Router } from "express";

const router = Router();

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { RequestResetPasswordController } from "./controllers/RequestResetPasswordController";
import { ResetPasswordController } from "./controllers/ResetPasswordController";
import { CreateProjectController } from "./controllers/CreateProjectController";
import { RemoveProjectController } from "./controllers/RemoveProjectController";
import { ListProjectsController } from "./controllers/ListProjectsController";

import { auth } from "./middlewares/auth";

router.post("/signout", new CreateUserController().handle);
router.post("/signin", new AuthenticateUserController().handle);
router.get("/logout", new AuthenticateUserController().logout);
router.post(
  "/requestPasswordReset",
  new RequestResetPasswordController().handle
);
router.post("/passwordReset", new ResetPasswordController().handle);

router.post("/project/create", auth, new CreateProjectController().handle);
router.post("/project/delete", auth, new RemoveProjectController().handle);
router.get("/projects", auth, new ListProjectsController().handle);

export { router };
