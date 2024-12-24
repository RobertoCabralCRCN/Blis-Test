import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/user/repositories/interfaces/UsersRepository.interface";
import { IAbilitiesRepository } from "@modules/ability/repositories/interfaces/AbilitiesRepository.interface";
import { IUserAbilitiesRepository } from "../repositories/interfaces/UserAbilitiesRepository.interface";
import UsersAbility from "../entities/UserAbility";

interface IRequest {
  user_id: string;
  ability_id: string;
  years_experience: number;
}

@injectable()
export class UserAbilitiesService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("AbilitiesRepository")
    private abilitiesRepository: IAbilitiesRepository,

    @inject("UsersAbilitiesRepository")
    private usersAbilitiesRepository: IUserAbilitiesRepository
  ) {}

  async execute({
    user_id,
    ability_id,
    years_experience,
  }: IRequest): Promise<UsersAbility> {
    try {
      console.log("Resolving UserAbilitiesService...");

      // Verificar se o usuário existe
      const user = await this.usersRepository.findById(user_id);
      if (!user) {
        throw new AppError("User not found", 404);
      }
      console.log("User found:", user_id);

      // Verificar se a habilidade existe
      const ability = await this.abilitiesRepository.findById(ability_id);
      if (!ability) {
        throw new AppError("Ability not found", 404);
      }
      console.log("Ability found:", ability_id);

      // Verificar se a habilidade está ativa
      if (!ability.active) {
        throw new AppError("Ability is not active", 400);
      }

      // Verificar se a experiência é válida
      if (years_experience < 0) {
        throw new AppError("Years of experience cannot be negative", 400);
      }

      // Verificar se já existe uma relação entre o usuário e a habilidade
      const existingRelation =
        await this.usersAbilitiesRepository.findByUserAndAbility(
          user_id,
          ability_id
        );
      if (existingRelation) {
        throw new AppError("This ability is already related to the user", 400);
      }
      console.log("No existing relation found.");

      // Criar a relação entre o usuário e a habilidade
      const userAbility = await this.usersAbilitiesRepository.create({
        user_id,
        ability_id,
        years_experience,
      });

      // Verificar se a criação foi bem-sucedida
      if (!userAbility) {
        throw new AppError("Failed to create user ability", 500);
      }

      console.log("User ability created:", userAbility);

      // Retornar a relação criada
      return userAbility;
    } catch (error) {
      console.error("Error in UserAbilitiesService:", error);
      throw error; // Re-throwing the error for higher-level handling
    }
  }
}
