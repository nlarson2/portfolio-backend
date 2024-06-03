import { IWrite, IRead } from "../interfaces";
import { Client as pgDB } from "ts-postgres";

export abstract class BaseRepository<T, I>
  implements IWrite<T, I>, IRead<T, I>
{
  private db: pgDB;
  constructor(db: pgDB) {
    this.db = db;
  }

  find(item: T): Promise<T[]> {
    throw new Error("Method not implemented");
  }
  findOne(id: I): Promise<T> {
    throw new Error("Method not implemented");
  }

  create(item: T): Promise<boolean> {
    throw new Error("Method not implemented");
  }
  update(id: I, item: T): Promise<boolean> {
    throw new Error("Method not implemented");
  }
  delete(id: I): Promise<boolean> {
    throw new Error("Method not implemented");
  }
}
