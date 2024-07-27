import { BaseRepository } from "./base/baseRepository";
import { Post } from "../models/postModel";
import { v4 as uuidv4 } from "uuid";

export class PostRepository extends BaseRepository<Post, string> {
  async find(_item: Post): Promise<Post[]> {
    return [];
  }

  async findOne(id: string): Promise<Post | undefined> {
    let posts: Post[] = [];
    const query = 'select * from public."Posts" where uuid=$1';
    const values = [id];
    const results = await this.db.query<Post>(query, values);
    posts = [...results.rows];
    console.log(posts);
    return posts.length > 0 ? posts[0] : undefined;
  }

  async getAll(): Promise<Post[]> {
    let posts: Post[] = [];
    const results = await this.db.query<Post>(
      'select uuid, title, created_at from public."Posts"',
    );
    posts = [...results.rows];
    return posts;
  }

  async create(item: Post): Promise<Post | undefined> {
    try {
      const uuid = uuidv4();
      const query = `insert into public."Posts"(uuid, title, content, created_at) values($1, $2, $3, to_timestamp($4/1000.0))`;
      const values = [uuid, item.title, item.content, Date.now()];
      console.log(values);
      await this.db.query<Post>(query, values);
      return await this.findOne(uuid);
    } catch (e: any) {
      console.log(e);
      return undefined;
    }
  }

  async update(id: string, item: Post): Promise<Post | undefined> {
    try {
      const query = `update public."Posts" set title=$1, content=$2 where uuid=$3`;
      const values = [item.title, item.content, id];
      await this.db.query<Post>(query, values);
      return await this.findOne(id);
    } catch (e: any) {
      console.log(e);
      return undefined;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const query = `delete from public."Posts" where uuid=$1`;
      const values = [id];
      await this.db.query(query, values);
      return true;
    } catch (e: any) {
      console.log(e);
      return false;
    }
  }
}
