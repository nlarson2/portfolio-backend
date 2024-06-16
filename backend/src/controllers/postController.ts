import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { Post } from "../models/postModel";
import { IGetPost, ICreatePost } from "../interfaces";
import { Repos } from "../middleware/db";

declare module "fastify" {
  interface FastifyInstance {
    db: Repos;
  }
}

export class PostController {
  public static getPost = (
    req: FastifyRequest<IGetPost>,
    reply: FastifyReply,
  ): void => {
    const { id: uuid } = req.params;
    let post: Post = {
      title: `test-${uuid}`,
      content: `test content - ${uuid}`,
    };
    reply.code(200).send({ post: post });
  };

  public static getListOfPosts = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    console.log("HERE1");
    let posts = await request.server.db.postRepo.getAll();
    console.log("HERE2");
    console.log(posts);
    return reply.code(200).send({ posts: posts });
  };

  public static createPost = (
    req: FastifyRequest<ICreatePost>,
    reply: FastifyReply,
  ) => {
    const { content } = req.body;
    reply.send({ content: content });
  };
}
