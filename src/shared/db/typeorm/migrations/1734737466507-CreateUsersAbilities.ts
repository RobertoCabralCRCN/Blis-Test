import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateUsersAbilities1734737466507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_abilities",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "ability_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "years_experience",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    // Adicionando a chave estrangeira para o relacionamento com a tabela "users"
    await queryRunner.createForeignKey(
      "users_abilities",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE", // Se o usuário for deletado, a associação será removida
      })
    );

    // Adicionando a chave estrangeira para o relacionamento com a tabela "abilities"
    await queryRunner.createForeignKey(
      "users_abilities",
      new TableForeignKey({
        columnNames: ["ability_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "abilities",
        onDelete: "CASCADE", // Se a habilidade for deletada, a associação será removida
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Removendo as chaves estrangeiras
    const table = await queryRunner.getTable("users_abilities");
    if (table) {
      const foreignKeyUser = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("user_id") !== -1
      );
      const foreignKeyAbility = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("ability_id") !== -1
      );

      if (foreignKeyUser) {
        await queryRunner.dropForeignKey("users_abilities", foreignKeyUser);
      }
      if (foreignKeyAbility) {
        await queryRunner.dropForeignKey("users_abilities", foreignKeyAbility);
      }
    }

    // Removendo a tabela "users_abilities"
    await queryRunner.dropTable("users_abilities");
  }
}
