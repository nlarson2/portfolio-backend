import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TagController } from "../controllers/tagController";

const tags = (fastify: FastifyInstance, opts: any, done: any) => {
  fastify.get("", TagController.getListOfTags);
  fastify.post("/new-tag", TagController.createTag);
  fastify.post("/delete", TagController.deleteTag);
  done();
};

export { tags };
