import { BaseRepository } from "./base/baseRepository";
import { Post } from "../models/postModel";

export class PostRepository extends BaseRepository<Post, string> {
  find(item: Post): Promise<Post[]> {}
  findOne(id: string): Promise<Post> {}

  create(item: Post): Promise<boolean> {}

  update(id: string, item: Post): Promise<boolean> {}
  delete(id: string): Promise<boolean> {}
}
