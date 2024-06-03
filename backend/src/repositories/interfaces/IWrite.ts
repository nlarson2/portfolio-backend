export interface IWrite<T, I> {
  create(item: T): Promise<boolean>;
  update(id: I, item: T): Promise<boolean>;
  delete(id: I): Promise<boolean>;
}
