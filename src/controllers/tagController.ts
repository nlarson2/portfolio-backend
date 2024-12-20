import { Request, Response } from "express";
import { Tag } from "../models/tagModel";
import { Repos } from "../middleware/db";
import { Authentication } from "../middleware/auth";
import { ICreateTag, IDeleteTag } from "../interfaces/requests";

// declare module global {
//   namespace Express {
//     interface Request {
//       db: Repos;
//       auth: Authentication;
//     }
//   }
// }

export class TagController {
  public static getListOfTags = async (
    request: Request,
    response: Response,
  ) => {
    // console.log(request);

    // return response.status(200).send("HERE");

    let tags: Tag[] = await request.db.tagRepo.getAll();
    response.status(200).json({ tags: tags });
    return;
  };

  public static createTag = async (
    request: Request<ICreateTag>,
    response: Response,
  ) => {
    const token = request.headers.authorization;
    if (token) {
      if (await request.auth.IsAdmin(token)) {
        const newTag: Tag = request.body;
        const tag: Tag | undefined = await request.db.tagRepo.create(newTag);

        if (tag) {
          response.status(200).json(tag);
          return;
        }
      }
    }
    response.status(401).json({ resp: "invalid token" });
    return;
  };

  public static deleteTag = async (
    request: Request<IDeleteTag>,
    response: Response,
  ) => {
    const token = request.headers.authorization;
    if (token) {
      if (await request.auth.IsAdmin(token)) {
        const tag: Tag = request.body;
        if (tag.id) {
          await request.db.tagRepo.delete(tag.id);
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
