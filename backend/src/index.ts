import { fastify } from "fastify";
import cors from "@fastify/cors";
import { posts } from "./routes/posts";
import db from "./middleware/db";
import auth from "./middleware/auth";
import dotenv from "dotenv";
dotenv.config();

const server: any = fastify({logger: true});
server.register(cors, {});
server.register(db, {
  host: process.env.DB_HOST,
  dbname: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});
server.register(auth);
server.register(posts, { prefix: "/post" });

server.listen({ port: 44444 }, (err: any, address: any) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
