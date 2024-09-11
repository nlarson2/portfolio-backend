import { FastifyReply, FastifyRequest } from "fastify";
import { Tag } from "../models/tagModel";
import { Repos } from "../middleware/db";
import { Authentication } from "../middleware/auth";
import { ICreateTag, IDeleteTag } from "../interfaces/requests";

declare module "fastify" {
  interface FastifyInstance {
    db: Repos;
    auth: Authentication;
  }
}

export class TagController {
  public static getListOfTags = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    let tags: Tag[] = await request.server.db.tagRepo.getAll();
    return reply.code(200).send({ tags: tags });
  };

  public static createTag = async (
    request: FastifyRequest<ICreateTag>,
    reply: FastifyReply,
  ) => {
    const token = request.headers.authorization;
    if (token) {
      if (await request.server.auth.IsAdmin(token)) {
        const newTag: Tag = request.body;
        const tag: Tag | undefined =
          await request.server.db.tagRepo.create(newTag);

        if (tag) {
          reply.code(200).send(tag);
          return;
        }
      }
    }
    reply.code(401).send({ resp: "invalid token" });
    return;
  };

  public static deleteTag = async (
    request: FastifyRequest<IDeleteTag>,
    reply: FastifyReply,
  ) => {
    const token = request.headers.authorization;
    if (token) {
      if (await request.server.auth.IsAdmin(token)) {
        const tag: Tag = request.body;
        if (tag.id) {
          await request.server.db.tagRepo.delete(tag.id);
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
