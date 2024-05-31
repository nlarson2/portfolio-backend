import { FastifyReply, FastifyRequest } from "fastify";
import { PostController } from "../controllers/postController";

const posts = (fastify: any, ops: any, done: any) => {
  fastify.get("/blog", async (req: FastifyRequest, resp: FastifyReply) => {
    return { posts: PostController.getListOfPosts(), test: req.query };
  });

  fastify.get(
    "/blog/:id",
    async (
      req: FastifyRequest<{ Params: { id: string } }>,
      resp: FastifyReply,
    ) => {
      const { id: uuid } = req.params;
      resp.send({ post: PostController.getPost(uuid) });
    },
  );

  fastify.post("/new-post", async (req: any, resp: any) => {
    return { test: "Post data test" };
  });

  done();
};

export { posts };
