import { Request, Response } from "express";
import { IGetPost, ICreatePost, IUpdatePost, IDeletePost } from "../interfaces";
import { Repos } from "../middleware/db";
import { Authentication } from "../middleware/auth";

// declare module global {
//   namespace Express {
//     interface Request {
//       db: Repos;
//       auth: Authentication;
//     }
//   }
// }

export class PostController {
  public static getPost = async (
    request: Request<IGetPost>,
    response: Response,
  ) => {
    const { id: uuid } = request.params;
    let post = await request.db.postRepo.findOne(uuid);
    response.status(200).json({ post: post });
    return;
  };

  public static getListOfPosts = async (
    request: Request,
    response: Response,
  ) => {
    let posts = await request.db.postRepo.getAll();
    response.status(200).json({ posts: posts });
    return;
  };

  public static createPost = async (
    request: Request<ICreatePost>,
    response: Response,
  ) => {
    const token = request.headers.authorization;
    if (token) {
      if (await request.auth.IsAdmin(token)) {
        const newPost = request.body;
        const post = await request.db.postRepo.create(newPost);

        if (post) {
          response.status(200).json({ uuid: post.uuid });
          return;
        }
      }
    }
    response.status(401).json({ resp: "invalid token" });
    return;
  };

  public static updatePost = async (
    request: Request<IUpdatePost>,
    response: Response,
  ) => {
    const token = request.headers.authorization;
    if (token) {
      if (await request.auth.IsAdmin(token)) {
        const post = request.body;
        if (post.uuid) {
          await request.db.postRepo.update(post.uuid, post);
          response.status(200).json({ uuid: post.uuid });
        } else {
          response.status(400);
        }
        return;
      }
    }
    response.status(401).json({ resp: "invalid token" });
    return;
  };

  public static deletePost = async (
    request: Request<IDeletePost>,
    response: Response,
  ) => {
    const token = request.headers.authorization;
    if (token) {
      if (await request.auth.IsAdmin(token)) {
        const post = request.body;
        if (post.uuid) {
          await request.db.postRepo.delete(post.uuid);
          response.status(200);
        } else {
          response.status(400);
        }
        return;
      }
    }
    response.status(401).json({ resp: "invalid token" });
    return;
  };
}
