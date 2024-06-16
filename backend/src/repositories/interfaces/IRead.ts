export interface IRead<T, I> {
  find(item: T): Promise<T[]>;
  findOne(id: I): Promise<T>;
  getAll(): Promise<T[]>;
}
