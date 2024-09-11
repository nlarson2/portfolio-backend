import { FastifyReply, FastifyRequest } from "fastify";
import { IGetPost, ICreatePost, IUpdatePost, IDeletePost } from "../interfaces";
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
        const newPost = request.body;
        const post = await request.server.db.postRepo.create(newPost);

        if (post) {
          reply.code(200).send({ uuid: post.uuid });
          return;
        }
      }
    }
    reply.code(401).send({ resp: "invalid token" });
    return;
  };

  public static updatePost = async (
    request: FastifyRequest<IUpdatePost>,
    reply: FastifyReply,
  ) => {
    const token = request.headers.authorization;
    if (token) {
      if (await request.server.auth.IsAdmin(token)) {
        const post = request.body;
        if (post.uuid) {
          await request.server.db.postRepo.update(post.uuid, post);
          reply.code(200).send({ uuid: post.uuid });
        } else {
          reply.code(400);
        }
        return;
      }
    }
    reply.code(401).send({ resp: "invalid token" });
    return;
  };

  public static deletePost = async (
    request: FastifyRequest<IDeletePost>,
    reply: FastifyReply,
  ) => {
    const token = request.headers.authorization;
    if (token) {
      if (await request.server.auth.IsAdmin(token)) {
        const post = request.body;
        if (post.uuid) {
          await request.server.db.postRepo.delete(post.uuid);
          reply.code(200);
        } else {
          reply.code(400);
        }
        return;
      }
    }
    reply.code(401).send({ resp: "invalid token" });
    return;
  };
}
