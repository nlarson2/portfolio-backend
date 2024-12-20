// import { Request } from "express";
import { Post } from "../models/postModel";
import { Tag } from "../models/tagModel";
import { Repos } from "../middleware/db";
import { Authentication } from "../middleware/auth";

// export interface Request {
//   db: Repos;
//   auth: Authentication;
// }

//POSTS
export interface IGetAll extends Request {}
export interface IGetPost extends Request {
  id: string;
}

export interface ICreatePost extends Request {
  authorization: string;
}

export interface IUpdatePost extends Request {
  // body: Post;
}

export interface IDeletePost extends Request {
  // body: Post;
  authorization: string;
}

//TAGS
export interface ICreateTag extends Request {
  // body: Tag;
  authorization: string;
}
export interface IDeleteTag extends Request {
  // body: Tag;
  authorization: string;
}
