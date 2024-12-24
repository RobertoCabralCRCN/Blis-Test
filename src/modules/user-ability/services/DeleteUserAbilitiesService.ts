import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IUserAbilitiesRepository } from "../repositories/interfaces/UserAbilitiesRepository.interface";

interface IRequest {
  user_id: string;
  ability_ids: string[];
}

@injectable()
export class DeleteUserAbilitiesService {
  constructor(
    @inject("UsersAbilitiesRepository")
    private usersAbilitiesRepository: IUserAbilitiesRepository
  ) {}

  async execute({ user_id, ability_ids }: IRequest): Promise<void> {
    if (ability_ids.length === 0) {
      throw new AppError("No abilities provided for deletion", 400);
    }

    for (const ability_id of ability_ids) {
      const relation = await this.usersAbilitiesRepository.findByUserAndAbility(
        user_id,
        ability_id
      );

      if (!relation) {
        throw new AppError(
          `Ability ID ${ability_id} is not related to User ID ${user_id}`,
          404
        );
      }

      await this.usersAbilitiesRepository.delete(relation);
    }
  }
}
