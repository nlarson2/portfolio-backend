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
  public static getPost = async (
    request: FastifyRequest<IGetPost>,
    reply: FastifyReply,
  ) => {
    const { id: uuid } = request.params;
    let post = await request.server.db.postRepo.findOne(uuid);
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
      if (await request.server.auth.IsAdmin(token)) {
        const { content } = request.body;
        reply.send({ content: content });
        return;
      }
    }
    reply.code(404);
    return;
  };
}
