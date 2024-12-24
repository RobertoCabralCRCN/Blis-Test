import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/user/repositories/interfaces/UsersRepository.interface";
import { IUserDocumentsRepository } from "../repositories/interfaces/UserDocumentsRepository.interface";
import UserDocument from "../entities/UserDocument";

interface IRequest {
  user_id: string;
  name: string;
  file: Express.Multer.File;
}

@injectable()
export class CreateUserDocumentsService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserDocumentsRepository")
    private userDocumentsRepository: IUserDocumentsRepository
  ) {}

  async execute({ user_id, name, file }: IRequest): Promise<UserDocument> {
    // Verifica se o usuário existe
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    // O caminho do arquivo será baseado no nome do arquivo gerado pelo Multer
    const fileUrl = `uploads/${file.filename}`;

    // Cria o documento no banco de dados
    const userDocument = await this.userDocumentsRepository.create({
      user_id,
      name,
      url: fileUrl, // Armazena a URL do arquivo no banco
    });

    if (!userDocument) {
      throw new AppError("Error creating user document!", 500);
    }

    return userDocument;
  }
}
