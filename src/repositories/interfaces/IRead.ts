export interface IRead<T, I> {
  find(item: T): Promise<T[]>;
  findOne(id: I): Promise<T | undefined>;
  getAll(): Promise<T[]>;
}
