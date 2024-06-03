import { FastifyReply, FastifyRequest } from "fastify";
import { Post } from "../models/postModel";
import { IGetPost, ICreatePost } from "../interfaces";

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

  public static getListOfPosts = (_: FastifyRequest, reply: FastifyReply) => {
    let post1: Post = { title: "test1", content: "test1 content" };
    let post2: Post = { title: "test2", content: "test2 content" };

    return reply.code(200).send({ posts: [post1, post2] });
  };

  public static createPost = (
    req: FastifyRequest<ICreatePost>,
    reply: FastifyReply,
  ) => {
    const { content } = req.body;
    reply.send({ content: content });
  };
}
