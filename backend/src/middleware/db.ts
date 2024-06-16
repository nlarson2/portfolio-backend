import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from "fastify";
import fp from "fastify-plugin";
import { connect } from "ts-postgres";
import { Pool, Client } from "pg";
import { PostRepository } from "../repositories/postRepository";

export interface Repos {
  postRepo: PostRepository;
}

const ConnectDB: FastifyPluginAsync<{
  host: string;
  dbname: string;
  username: string;
  password: string;
}> = async (instance: FastifyInstance, options: FastifyPluginOptions) => {
  const { host, dbname, username, password } = options;
  const client = new Client({
    user: username,
    password: password,
    host: host,
    database: dbname,
    port: 5432,
  });

  client.connect();

  const postRepo: PostRepository = new PostRepository(client);
  const repos: Repos = { postRepo: postRepo };

  instance.decorate("db", repos);
};

export default fp(ConnectDB);
