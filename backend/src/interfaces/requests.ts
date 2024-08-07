import { RequestGenericInterface } from "fastify";
import { Post } from "../models/postModel";
import { Tag } from "../models/tagModel";

//POSTS
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

export interface IDeletePost extends RequestGenericInterface {
  Body: Post;
  Header: { authorization: string };
}

//TAGS
export interface ICreateTag extends RequestGenericInterface {
  Body: Tag;
  Header: { authorization: string };
}
export interface IDeleteTag extends RequestGenericInterface {
  Body: Tag;
  Header: { authorization: string };
}
