import { BaseRepository } from "./base/baseRepository";
import { Post } from "../models/postModel";

export class PostRepository extends BaseRepository<Post, string> {
  async find(_item: Post): Promise<Post[]> {
    return [];
  }
  async findOne(_id: string): Promise<Post> {
    return { title: "title", content: "content" };
  }
  async getAll(): Promise<Post[]> {
    let posts: Post[] = [];
    const results = await this.db.query<Post>('select * from public."Posts"');
    posts = [...results.rows];
    console.log(posts);
    return posts;
  }

  async create(_item: Post): Promise<boolean> {
    return false;
  }
  async update(_id: string, _item: Post): Promise<boolean> {
    return false;
  }
  async delete(_id: string): Promise<boolean> {
    return false;
  }
}
