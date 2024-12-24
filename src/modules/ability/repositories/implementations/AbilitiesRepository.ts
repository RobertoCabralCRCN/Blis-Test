import { BaseRepository } from "@shared/BaseRepository/BaseRepository";
import { IAbilitiesRepository } from "../interfaces/AbilitiesRepository.interface";
import UserDocument from "@modules/user-document/entities/UserDocument";
import Ability from "@modules/ability/entities/Ability";

class AbilitiesRepository
  extends BaseRepository<Ability>
  implements IAbilitiesRepository
{
  constructor() {
    super(Ability, "id");
  }
  async findByName(name: string): Promise<Ability | null> {
    const finded = await this.repository.findOneBy({ name });

    return finded;
  }
}

export { AbilitiesRepository };
