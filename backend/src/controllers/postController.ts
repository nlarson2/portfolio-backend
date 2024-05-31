import { Post } from "../models/postModel";

export class PostController {
  public static getPost = (id: string): Post => {
    let post: Post = { title: `test-${id}`, content: `test content - ${id}` };
    return post;
  };
  public static getListOfPosts = (): Post[] => {
    let post1: Post = { title: "test1", content: "test1 content" };
    let post2: Post = { title: "test2", content: "test2 content" };

    return [post1, post2];
  };
}
