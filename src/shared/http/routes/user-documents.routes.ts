import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload"; // Configuração do Multer
import { CreateUserDocumentsController } from "@modules/user-document/controllers/CreateUserDocumentsController";
import isAuthenticated from "@shared/middlewares/isAuthenticated";

const userDocumentsRouter = Router();
const upload = multer(uploadConfig);

userDocumentsRouter.post(
  "/",
  upload.single("file"),
  isAuthenticated,
  CreateUserDocumentsController.create
);

export default userDocumentsRouter;
