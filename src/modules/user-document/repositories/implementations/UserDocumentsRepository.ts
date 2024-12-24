import { BaseRepository } from "@shared/BaseRepository/BaseRepository";
import { IUserDocumentsRepository } from "../interfaces/UserDocumentsRepository.interface";
import UserDocument from "@modules/user-document/entities/UserDocument";

class UserDocumentsRepository
  extends BaseRepository<UserDocument>
  implements IUserDocumentsRepository
{
  constructor() {
    super(UserDocument, "id");
  }
  async findByName(name: string): Promise<UserDocument | null> {
    const finded = await this.repository.findOneBy({ name });

    return finded;
  }
}

export { UserDocumentsRepository };
