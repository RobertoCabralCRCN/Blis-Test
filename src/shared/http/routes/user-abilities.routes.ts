import { DeleteUserAbilitiesController } from "@modules/user-ability/controller/DeleteUserAbilitiesController";
import { ListUserAbilitiesController } from "@modules/user-ability/controller/ListUserAbilitiesController";
import { UserAbilitiesController } from "@modules/user-ability/controller/UserAbilitiesController";
import isAuthenticated from "@shared/middlewares/isAuthenticated";
import { Router } from "express";

const usersAbilitiesRouter = Router();

usersAbilitiesRouter.post("/", isAuthenticated, UserAbilitiesController.create);
usersAbilitiesRouter.delete(
  "/",
  isAuthenticated,
  DeleteUserAbilitiesController.delete
);
usersAbilitiesRouter.get(
  "/:user_id",
  isAuthenticated,
  ListUserAbilitiesController.list
);

export default usersAbilitiesRouter;
