import { CreateAbilitiesController } from "@modules/ability/controller/CreateAbilitiesController";
import { UpdateAbilitiesController } from "@modules/ability/controller/UpdateAbilitiesController";
import isAuthenticated from "@shared/middlewares/isAuthenticated";
import { Router } from "express";

const abilitiesRouter = Router();

const createAbilitiesController = new CreateAbilitiesController();
const updateAbilitiesController = new UpdateAbilitiesController();

abilitiesRouter.post("/", isAuthenticated, createAbilitiesController.handle);
abilitiesRouter.put("/:id", isAuthenticated, updateAbilitiesController.handle);

export default abilitiesRouter;
