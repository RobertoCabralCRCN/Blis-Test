interface IBaseRepository<T> {
    getAll(): Promise<T[]>;
    create(data: T): Promise<T | null>;
    delete(data: T): Promise<void>;
    findById(id: unknown): Promise<T | null>;
    update(data: T): Promise<T | null>;
}

export { IBaseRepository };
