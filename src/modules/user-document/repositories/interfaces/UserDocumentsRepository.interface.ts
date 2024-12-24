import UserDocument from "@modules/user-document/entities/UserDocument";
import { IBaseRepository } from "@shared/BaseRepository/BaseRepository.interface";

interface ICreateUserDocumentsDTO {
  name: string;
  url: string;
  user_id: string;
}
interface IUpdateUserDocumentsDTO {
  id?: string;
  name: string;
  url: string;
  user_id: string;
}

interface IUserDocumentsRepository extends IBaseRepository<UserDocument> {
  findByName(name: string): Promise<UserDocument | null>;
}

export {
  IUserDocumentsRepository,
  ICreateUserDocumentsDTO,
  IUpdateUserDocumentsDTO,
};
