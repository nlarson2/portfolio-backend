export interface IWrite<T, I> {
  create(item: T): Promise<T | undefined>;
  update(id: I, item: T): Promise<T | undefined>;
  delete(id: I): Promise<boolean>;
}
