import { inject, injectable } from "tsyringe";
import { IUserAbilitiesRepository } from "../repositories/interfaces/UserAbilitiesRepository.interface";

@injectable()
export class ListUserAbilitiesService {
  constructor(
    @inject("UsersAbilitiesRepository")
    private usersAbilitiesRepository: IUserAbilitiesRepository
  ) {}

  async execute({
    user_id,
    page,
    limit,
  }: IGetUserAbilitiesRequest): Promise<IGetUserAbilitiesResponse> {
    const offset = (page - 1) * limit;

    const { data: rawData, total } =
      await this.usersAbilitiesRepository.findByUserWithPagination(
        user_id,
        offset,
        limit
      );

    const data = rawData.map((item) => ({
      id: item.id || "",
      user: {
        id: item.user?.id || "",
        name: item.user?.name || "",
        email: item.user?.email || "",
        created_at: item.user?.created_at || new Date(),
        updated_at: item.user?.updated_at || new Date(),
      },
      ability: {
        id: item.ability?.id || "",
        name: item.ability?.name || "",
        active: item.ability?.active || false,
        created_at: item.ability?.created_at || new Date(),
        updated_at: item.ability?.updated_at || new Date(),
      },
      years_experience: item.years_experience || 0,
      created_at: item.created_at || new Date(),
      updated_at: item.updated_at || new Date(),
    }));

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
