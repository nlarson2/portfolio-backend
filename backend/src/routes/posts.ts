import { FastifyReply, FastifyRequest } from "fastify";
import { PostController } from "../controllers/postController";

interface IParamsSinglePost {
  id: string;
}

const posts = (fastify: any, ops: any, done: any) => {
  fastify.get("/blog", PostController.getListOfPosts);
  fastify.get("/blog/:id", PostController.getPost);
  fastify.post("/creat-post", PostController.createPost);
  done();
};

export { posts };
