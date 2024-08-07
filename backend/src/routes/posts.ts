import { FastifyInstance } from "fastify";
import { PostController } from "../controllers/postController";

const posts = (fastify: FastifyInstance, opts: any, done: any) => {
  fastify.get("", PostController.getListOfPosts);
  fastify.get("/:id", PostController.getPost);
  fastify.post("/new-post", PostController.createPost);
  fastify.post("/update", PostController.updatePost);
  fastify.post("/delete", PostController.deletePost);
  done();
};

export { posts };
