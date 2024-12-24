import Ability from "@modules/ability/entities/Ability";
import UsersAbility from "@modules/user-ability/entities/UserAbility";
import UserDocument from "@modules/user-document/entities/UserDocument";
import User from "@modules/user/entities/User";
import "dotenv/config";

import { DataSource } from "typeorm";

export const databasePostgres = new DataSource({
  type: "postgres",
  host: process.env.DB_HOSTNAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [User, Ability, UsersAbility, UserDocument],
  subscribers: [],
  migrations: ["./src/shared/db/typeorm/migrations/*.ts"],
  migrationsRun: false,
});

databasePostgres
  .initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
