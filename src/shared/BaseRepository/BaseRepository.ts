import {
  DataSource,
  EntityTarget,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { databasePostgres } from "../db/typeorm";
import { IBaseRepository } from "./BaseRepository.interface";

class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T> {
  public dataSource: DataSource;
  public repository: Repository<T>;
  private primaryKey?: string;

  constructor(entity: EntityTarget<T>, primaryKey?: string) {
    this.primaryKey = primaryKey;
    this.dataSource = databasePostgres;
    this.repository = this.dataSource.getRepository(entity);
  }

  async getAll(): Promise<T[]> {
    const data = await this.repository.find();

    return data;
  }

  async create(data: T): Promise<T | null> {
    const createdData = await this.repository.save(data);

    return createdData;
  }

  async delete(data: T): Promise<void> {
    await this.repository.remove(data);
  }

  async findById(id: unknown): Promise<T | null> {
    if (!this.primaryKey) {
      throw new Error("Primary key not identified");
    }

    const findOptions: FindOneOptions<T> = {
      where: {
        [this.primaryKey]: id,
      } as FindOptionsWhere<T>,
    };

    const data = await this.repository.findOne(findOptions);

    return data || null;
  }

  async update(data: T): Promise<T | null> {
    const updated = await this.repository.save(data);

    return updated;
  }
}

export { BaseRepository };
