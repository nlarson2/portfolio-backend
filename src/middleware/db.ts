import { Request, Response, NextFunction } from "express";
import { connect } from "ts-postgres";
import { Pool, Client } from "pg";
import { PostRepository } from "../repositories/postRepository";
import { TagRepository } from "../repositories/tagRepository";

import dotenv from "dotenv";
dotenv.config();

export interface Repos {
  postRepo: PostRepository;
  tagRepo: TagRepository;
}
// const db = (req: Request, _res: Response, next: NextFunction) => {
//   const client = new Client({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     port: 5432,
//   });
//
//   client.connect();
//
//   const postRepo: PostRepository = new PostRepository(client);
//   const tagRepo: TagRepository = new TagRepository(client);
//   const repos: Repos = { postRepo: postRepo, tagRepo: tagRepo };
//
//   req.db = repos;
//   next();
// };
const db = (config: any) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { host, dbname, username, password } = config;
    const client = new Client({
      host: host,
      database: dbname,
      user: username,
      password: password,
      port: 5432,
    });
    // const client = new Client({
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   host: process.env.DB_HOST,
    //   database: process.env.DB_NAME,
    //   port: 5432,
    // });

    client.connect();

    const postRepo: PostRepository = new PostRepository(client);
    postRepo.setup();
    const tagRepo: TagRepository = new TagRepository(client);
    tagRepo.setup();
    const repos: Repos = { postRepo: postRepo, tagRepo: tagRepo };

    req.db = repos;
    next();
  };
};

export default db;
