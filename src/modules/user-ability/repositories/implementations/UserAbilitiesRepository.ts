import { BaseRepository } from "@shared/BaseRepository/BaseRepository";
import { IUserAbilitiesRepository } from "../interfaces/UserAbilitiesRepository.interface";
import UsersAbility from "@modules/user-ability/entities/UserAbility";

class UserAbilitiesRepository
  extends BaseRepository<UsersAbility>
  implements IUserAbilitiesRepository
{
  constructor() {
    super(UsersAbility, "id");
  }
  async findByUserWithPagination(
    user_id: string,
    offset: number,
    limit: number
  ): Promise<{ data: UsersAbility[]; total: number }> {
    const [data, total] = await this.repository.findAndCount({
      where: { user_id },
      skip: offset,
      take: limit,
    });

    return { data, total };
  }
  async findByUserAndAbility(
    user_id: string,
    ability_id: string
  ): Promise<UsersAbility | null> {
    const userAbility = await this.repository.findOne({
      where: {
        user_id,
        ability_id,
      },
    });

    return userAbility || null;
  }
}

export { UserAbilitiesRepository };
