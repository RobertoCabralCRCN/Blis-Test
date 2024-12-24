import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import {
  ICreateUsersDTO,
  IUsersRepository,
} from "../repositories/interfaces/UsersRepository.interface";
import AppError from "@shared/errors/AppError";
import User from "../entities/User";

@injectable()
export class CreateUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUsersDTO): Promise<User> {
    // Verifica se o email já está cadastrado
    const userExists = await this.usersRepository.findByEmail(data.email);

    if (userExists) {
      throw new AppError("Email address already in use!", 400);
    }

    // Criptografa a senha fornecida
    const hashedPassword = await hash(data.password, 8);

    // Cria o novo usuário com os dados fornecidos e a senha criptografada
    const user = new User();
    Object.assign(user, {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      avatar: data.avatar || null, // Avatar opcional
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Persiste o usuário no banco de dados
    const createdUser = await this.usersRepository.create(user);

    if (!createdUser) {
      throw new AppError("Error creating user", 500);
    }

    return createdUser;
  }
}
