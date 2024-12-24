import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IAbilitiesRepository } from "../repositories/interfaces/AbilitiesRepository.interface";
import Ability from "../entities/Ability";

interface IRequest {
  name: string;
}

@injectable()
export class CreateAbilitiesService {
  constructor(
    @inject("AbilitiesRepository")
    private abilitiesRepository: IAbilitiesRepository
  ) {}

  async execute({ name }: IRequest): Promise<Ability> {
    // Verifica se já existe uma habilidade com o mesmo nome
    const abilityExists = await this.abilitiesRepository.findByName(name);

    if (abilityExists) {
      throw new AppError("Ability with this name already exists!", 400);
    }

    // Cria a habilidade com active como true
    const ability = await this.abilitiesRepository.create({
      name,
      active: true, // Sempre ativa por padrão
    });

    if (!ability) {
      throw new AppError("Error creating ability", 500);
    }

    return ability;
  }
}
