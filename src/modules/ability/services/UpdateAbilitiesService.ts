import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IAbilitiesRepository } from "../repositories/interfaces/AbilitiesRepository.interface";

interface IRequest {
  id: string;
  active: boolean;
}

@injectable()
export class UpdateAbilitiesService {
  constructor(
    @inject("AbilitiesRepository")
    private abilitiesRepository: IAbilitiesRepository
  ) {}

  async execute({ id, active }: IRequest): Promise<void> {
    const ability = await this.abilitiesRepository.findById(id);

    if (!ability) {
      throw new AppError("Ability not found", 404);
    }

    ability.active = active;

    await this.abilitiesRepository.update(ability);
  }
}
