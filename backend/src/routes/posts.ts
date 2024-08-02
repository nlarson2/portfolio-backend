import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PostController } from "../controllers/postController";

interface IParamsSinglePost {
  id: string;
}

const posts = (fastify: FastifyInstance, opts: any, done: any) => {
  fastify.get("", PostController.getListOfPosts);
  fastify.get("/:id", PostController.getPost);
  fastify.post("/test", async (request, reply) => {
    const body = request.body;
    fastify.log.info(body);
    return { recieved: body };
  });
  fastify.post("/new-post", PostController.createPost);
  fastify.post("/update", PostController.updatePost);
  done();
};

export { posts };
