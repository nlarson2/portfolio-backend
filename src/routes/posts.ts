import { Router } from "express";

import { PostController } from "../controllers/postController";

export const posts = Router();

posts.get("/", PostController.getListOfPosts);
posts.get("/:id", PostController.getPost);
posts.post("/new-post", PostController.createPost);
posts.post("/update", PostController.updatePost);
posts.post("/delete", PostController.deletePost);

// Vconst posts = (posts: postsInstance, opts: any, done: any) => {
//   posts.get("", PostController.getListOfPosts);
//   posts.get("/:id", PostController.getPost);
//   posts.post("/new-post", PostController.createPost);
//   posts.post("/update", PostController.updatePost);
//   posts.post("/delete", PostController.deletePost);
//   done();
// };
//
// export { posts };
