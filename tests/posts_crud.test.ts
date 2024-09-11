import { Client } from "pg";
import { PostRepository } from "../src/repositories/postRepository";
import { Post } from "../src/models/postModel";

const clientSetup = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 5432,
  });
  await client.connect();
  return client;
};

let post: Post = {
  title: "test post title",
  content: "test post content",
};

describe("Post Crud Operation", () => {
  let newPost: Post | undefined;
  test("Create Post", async () => {
    const client = await clientSetup();
    const postRepo: PostRepository = new PostRepository(client);
    newPost = await postRepo.create(post);
    client.end();
    expect(newPost?.title).toBe(post.title);
  });

  test("Update Post", async () => {
    if (!newPost || !newPost.uuid) {
      throw "New Post was not created";
    }
    const client = await clientSetup();
    newPost.title = "New title post";
    const postRepo: PostRepository = new PostRepository(client);
    newPost = await postRepo.update(newPost.uuid as string, newPost);
    client.end();
    console.log(newPost);
    expect(newPost?.title).toBe("New title post");
  });

  test("Delete Post", async () => {
    if (!newPost || !newPost.uuid) {
      throw "New Post was not creatd/updated";
    }
    const client = await clientSetup();
    newPost.title = "New title post";
    const postRepo: PostRepository = new PostRepository(client);
    await postRepo.delete(newPost.uuid as string);
    newPost = await postRepo.findOne(newPost.uuid as string);
    client.end();
    expect(newPost).toBe(undefined);
  });
});
