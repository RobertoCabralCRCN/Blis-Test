import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateUserDocuments1734737452942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_documents",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "url",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
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
      "user_documents",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE", // Se o usuário for deletado, os documentos serão removidos também
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Removendo a chave estrangeira
    const table = await queryRunner.getTable("user_documents");
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("user_id") !== -1
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey("user_documents", foreignKey);
      }
    }

    // Removendo a tabela "user_documents"
    await queryRunner.dropTable("user_documents");
  }
}
