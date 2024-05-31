import { fastify } from "fastify";
import cors from "@fastify/cors";
import { posts } from "./routes/posts";

const server: any = fastify();
server.register(cors, {});
server.register(posts, { prefix: "/posts" });

server.listen({ port: 44444 }, (err: any, address: any) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});