import { FastifyReply, FastifyRequest } from "fastify";
import { Post, PostType } from "../models/postModel";
import { IGetPost, ICreatePost } from "../interfaces";
import { Repos } from "../middleware/db";
import { Authentication } from "../middleware/auth";

declare module "fastify" {
  interface FastifyInstance {
    db: Repos;
    auth: Authentication;
  }
}

export class PostController {
  public static getPost = (
    request: FastifyRequest<IGetPost>,
    reply: FastifyReply,
  ): void => {
    const { id: uuid } = request.params;
    let post: Post = {
      title: `test-${uuid}`,
      content: `test content - ${uuid}`,
      type: PostType.Blog,
    };
    reply.code(200).send({ post: post });
  };

  public static getListOfPosts = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    let posts = await request.server.db.postRepo.getAll();
    return reply.code(200).send({ posts: posts });
  };

  public static createPost = async (
    request: FastifyRequest<ICreatePost>,
    reply: FastifyReply,
  ) => {
    const token = request.headers.authorization;
    if (token) {
      const isAdmin = await request.server.auth.IsAdmin(token);
      console.log("HERE", isAdmin);
      if (isAdmin) {
        console.log("HERE");
        const { content } = request.body;
        reply.send({ content: content });
        return;
      }
    }
    reply.code(404);
    return;
  };
}
