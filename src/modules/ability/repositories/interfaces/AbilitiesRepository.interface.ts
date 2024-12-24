import Ability from "@modules/ability/entities/Ability";
import { IBaseRepository } from "@shared/BaseRepository/BaseRepository.interface";

interface ICreateAbilitiesDTO {
  name: string;
  active: boolean;
}
interface IUpdateAbilitiesDTO {
  id?: string;
  name: string;
  active: boolean;
}

interface IAbilitiesRepository extends IBaseRepository<Ability> {
  findByName(name: string): Promise<Ability | null>;
}

export { IAbilitiesRepository, ICreateAbilitiesDTO, IUpdateAbilitiesDTO };
