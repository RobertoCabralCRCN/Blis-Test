import UsersAbility from "@modules/user-ability/entities/UserAbility";
import { IBaseRepository } from "@shared/BaseRepository/BaseRepository.interface";

interface ICreateUserAbilitiesDTO {
  user_id: string;
  ability_id: string;
  years_experience: number;
}
interface IUpdateUserAbilitiesDTO {
  id?: string;
  user_id: string;
  ability_id: string;
  years_experience: number;
}

interface IUserAbilitiesRepository extends IBaseRepository<UsersAbility> {
  findByUserAndAbility(
    user_id: string,
    ability_id: string
  ): Promise<UsersAbility | null>;
  findByUserWithPagination(
    user_id: string,
    offset: number,
    limit: number
  ): Promise<{ data: UsersAbility[]; total: number }>;
}

export {
  IUserAbilitiesRepository,
  ICreateUserAbilitiesDTO,
  IUpdateUserAbilitiesDTO,
};
