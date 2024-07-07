import { IWrite, IRead } from "../interfaces";
// import { Client as pgDB } from "ts-postgres";
import { Client as pgDB } from "pg";

export abstract class BaseRepository<T, I>
  implements IWrite<T, I>, IRead<T, I>
{
  protected db: pgDB;
  constructor(db: pgDB) {
    this.db = db;
  }

  find(_item: T): Promise<T[]> {
    throw new Error("Method not implemented");
  }
  findOne(_id: I): Promise<T | undefined> {
    throw new Error("Method not implemented");
  }

  getAll(): Promise<T[]> {
    throw new Error("Method not implemented");
  }

  create(_item: T): Promise<T|undefined> {
    throw new Error("Method not implemented");
  }
  update(_id: I, _item: T): Promise<T|undefined> {
    throw new Error("Method not implemented");
  }
  delete(_id: I): Promise<boolean> {
    throw new Error("Method not implemented");
  }
}
