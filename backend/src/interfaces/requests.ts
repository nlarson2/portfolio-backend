import { RequestGenericInterface } from "fastify";

export interface IGetPost extends RequestGenericInterface {
  Params: { id: string };
}

export interface ICreatePost extends RequestGenericInterface {
  Body: { content: string };
}
