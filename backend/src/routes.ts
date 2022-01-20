import { Router } from "express";

const router = Router();

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { RemoveAccountController } from "./controllers/RemoveAccountController";
import { RequestResetPasswordController } from "./controllers/RequestResetPasswordController";
import { ResetPasswordController } from "./controllers/ResetPasswordController";
import { CurrentSessionController } from "./controllers/CurrentSessionController";
import { CreateProjectController } from "./controllers/CreateProjectController";
import { RemoveProjectController } from "./controllers/RemoveProjectController";
import { ListProjectsController } from "./controllers/ListProjectsController";
import { ListProjectByIdController } from "./controllers/ListProjectByIdController";
import { UpdateProjectController } from "./controllers/UpdateProjectController";
import { CreateBlogPostController } from "./controllers/CreateBlogPostController";

import { auth } from "./middlewares/auth";
import { ListBlogPostsController } from "./controllers/ListBlogPostsController";

router.post("/signout", new CreateUserController().handle);
router.post("/signin", new AuthenticateUserController().handle);
router.get("/logout", new AuthenticateUserController().logout);
router.post("/updateUser", auth, new UpdateUserController().handle);
router.post("/removeAccount", auth, new RemoveAccountController().handle);
router.post(
  "/requestPasswordReset",
  new RequestResetPasswordController().handle
);
router.post("/passwordReset", new ResetPasswordController().handle);
router.get("/currentSession", auth, new CurrentSessionController().handle);

router.post("/project/create", auth, new CreateProjectController().handle);
router.post("/project/delete", auth, new RemoveProjectController().handle);
router.get("/projects", auth, new ListProjectsController().handle);
router.get("/projects/:id", auth, new ListProjectByIdController().handle);
router.post("/projects/:id/update", auth, new UpdateProjectController().handle);

router.get(
  "/projects/:id/blogPosts",
  auth,
  new ListBlogPostsController().handle
);
router.post(
  "/projects/:id/createBlogPost",
  auth,
  new CreateBlogPostController().handle
);

export { router };
