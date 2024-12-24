import User from "@modules/user/entities/User";
import { BaseRepository } from "@shared/BaseRepository/BaseRepository";
import { IUsersRepository } from "../interfaces/UsersRepository.interface";

class UsersRepository extends BaseRepository<User> implements IUsersRepository {
  constructor() {
    super(User, "id");
  }
  async findByEmail(email: string): Promise<User | null> {
    const finded = await this.repository.findOneBy({ email });

    return finded;
  }

  async findByName(name: string): Promise<User | null> {
    const finded = await this.repository.findOneBy({ name });

    return finded;
  }
}

export { UsersRepository };
