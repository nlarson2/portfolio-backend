import { fastify } from "fastify";
import cors from "@fastify/cors";
import { posts } from "./routes/posts";
import db from "./middleware/db";
import auth from "./middleware/auth";
import dotenv from "dotenv";
dotenv.config();

const server: any = fastify();
server.register(cors, {});
server.register(db, {
  host: "localhost",
  dbname: "portfolio_db",
  username: "portfolio_user",
  password: "pgtestpassword",
});
server.register(auth);
server.register(posts, { prefix: "/posts" });

server.listen({ port: 44444 }, (err: any, address: any) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
