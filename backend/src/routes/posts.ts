import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PostController } from "../controllers/postController";

interface IParamsSinglePost {
  id: string;
}

const posts = (fastify: FastifyInstance, opts: any, done: any) => {
  fastify.get("", PostController.getListOfPosts);
  fastify.get("/:id", PostController.getPost);
  fastify.post("/create-post", PostController.createPost);
  done();
};

export { posts };
