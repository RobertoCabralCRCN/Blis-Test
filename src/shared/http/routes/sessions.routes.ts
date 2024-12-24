import { CreateSessionsController } from "@modules/user/controllers/CreateSessionsController";
import { Router } from "express";

const sessionsRoutes = Router();

sessionsRoutes.post("/", CreateSessionsController.handler);

export { sessionsRoutes };
