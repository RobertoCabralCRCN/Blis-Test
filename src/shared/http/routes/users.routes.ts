import { Router } from "express";

import { CreateUsersController } from "@modules/user/controllers/CreateUsersController";

const usersRoutes = Router();

usersRoutes.post("/", CreateUsersController.handler);

export { usersRoutes };
