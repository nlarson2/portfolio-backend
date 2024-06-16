import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PostController } from "../controllers/postController";

interface IParamsSinglePost {
  id: string;
}

const posts = (fastify: FastifyInstance, opts: any, done: any) => {
  fastify.get("/blog", opts, PostController.getListOfPosts);
  fastify.get("/blog/:id", PostController.getPost);
  fastify.post("/creat-post", PostController.createPost);
  done();
};

export { posts };
