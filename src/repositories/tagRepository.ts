import { BaseRepository } from "./base/baseRepository";
import { Tag } from "../models/tagModel";

export class TagRepository extends BaseRepository<Tag, number> {
  async find(_item: Tag): Promise<Tag[]> {
    return [];
  }

  async setup() {
    let query = `
      create table if not exists Tags (
        id integer primary key,
        name string
      )
    `;
    await this.db.query(query);
    query = `
      create table if not exists post_has_tag (
        id integer primary key,
        post_id integer,
        tag_id integer
      )
    `;
    await this.db.query(query);
  }

  async findOne(id: number): Promise<Tag | undefined> {
    let tags: Tag[] = [];
    const query = 'select * from public."Tags" where id=$1';
    const values = [id];
    const results = await this.db.query<Tag>(query, values);
    tags = [...results.rows];
    console.log(tags);
    return tags.length > 0 ? tags[0] : undefined;
  }

  async getAll(): Promise<Tag[]> {
    let tags: Tag[] = [];
    const results = await this.db.query<Tag>(
      'select id, name from public."Tags"',
    );
    tags = [...results.rows];
    return tags;
  }

  async tagExists(name: string): Promise<boolean> {
    const query = 'select * from public."Tags" where name=$1';
    const values = [name];
    const results = await this.db.query<Tag>(query, values);
    const tags = [...results.rows];
    return tags.length > 0;
  }

  async create(item: Tag): Promise<Tag | undefined> {
    try {
      if (await this.tagExists(item.name)) throw "Tag Already Exists";
      const query = `insert into public."Tags"(name) values($1) returning id`;
      const values = [item.name];
      const results = await this.db.query<Tag>(query, values);

      //convert results to an array and then check to see if a tag id is there
      let tags: Tag[] = [...results.rows];
      let tag = tags.length > 0 ? tags[0] : undefined;
      if (tag && tag.id) {
        return await this.findOne(tag.id);
      }
      return undefined;
    } catch (e: any) {
      console.log(e);
      return undefined;
    }
  }

  async update(id: number, item: Tag): Promise<Tag | undefined> {
    try {
      const query = `update public."Tags" set name=$1 where id=$2`;
      const values = [item.name, id];
      await this.db.query<Tag>(query, values);
      return await this.findOne(id);
    } catch (e: any) {
      console.log(e);
      return undefined;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `delete from public."Tags" where id=$1`;
      const values = [id];
      await this.db.query(query, values);
      return true;
    } catch (e: any) {
      console.log(e);
      return false;
    }
  }
}
