import { RequestGenericInterface } from "fastify";
import { Post } from "../models/postModel";

export interface IGetPost extends RequestGenericInterface {
  Params: { id: string };
}

export interface ICreatePost extends RequestGenericInterface {
  // Body: { title: string; content: string; [key: string]: any };
  Body: Post;
  Header: { authorization: string };
}

export interface IUpdatePost extends RequestGenericInterface {
  Body: Post;
}
