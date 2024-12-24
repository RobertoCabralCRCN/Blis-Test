import { AbilitiesRepository } from "@modules/ability/repositories/implementations/AbilitiesRepository";
import { IAbilitiesRepository } from "@modules/ability/repositories/interfaces/AbilitiesRepository.interface";
import { UserAbilitiesRepository } from "@modules/user-ability/repositories/implementations/UserAbilitiesRepository";
import { IUserAbilitiesRepository } from "@modules/user-ability/repositories/interfaces/UserAbilitiesRepository.interface";
import { UserDocumentsRepository } from "@modules/user-document/repositories/implementations/UserDocumentsRepository";
import { IUserDocumentsRepository } from "@modules/user-document/repositories/interfaces/UserDocumentsRepository.interface";
import { UsersRepository } from "@modules/user/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/user/repositories/interfaces/UsersRepository.interface";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<IAbilitiesRepository>(
  "AbilitiesRepository",
  AbilitiesRepository
);
container.registerSingleton<IUserAbilitiesRepository>(
  "UserAbilitiesRepository",
  UserAbilitiesRepository
);
container.registerSingleton<IUserDocumentsRepository>(
  "UserDocumentsRepository",
  UserDocumentsRepository
);
