import User from "@modules/user/entities/User";
import { IBaseRepository } from "@shared/BaseRepository/BaseRepository.interface";

// DTO para criar um usuário
interface ICreateUsersDTO {
  name: string;
  email: string;
  password: string;
  birthdate: string; // Adiciona a data de nascimento
  avatar?: string; // Avatar opcional
}

// DTO para atualizar um usuário
interface IUpdateUsersDTO {
  id: string; // Id obrigatório para encontrar o usuário
  name: string;
  email: string;
  birthdate?: string; // Data de nascimento pode ser opcional na atualização
  avatar?: string; // Avatar opcional
  password?: string; // Senha opcional, pois o usuário pode não querer atualizar
}

interface IUsersRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
}

export { IUsersRepository, ICreateUsersDTO, IUpdateUsersDTO };
