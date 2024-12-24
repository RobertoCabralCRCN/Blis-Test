import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { sessionsRoutes } from "./sessions.routes";
import abilitiesRouter from "./abilities.routes";
import userDocumentsRouter from "./user-documents.routes";
import usersAbilitiesRouter from "./user-abilities.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/login", sessionsRoutes);
routes.use("/abilities", abilitiesRouter);
routes.use("/user-documents", userDocumentsRouter);
routes.use("/user-abilities", usersAbilitiesRouter);

routes.get("/", (request, response) => {
  return response.json({ message: "Hello Dev!" });
});

export default routes;
