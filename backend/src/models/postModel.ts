import { Tag } from "./tagModel";

export type Post = {
  id?: number;
  uuid?: string;
  title: string;
  content: string;
  createdAt?: Date;
  thumbnailLink?: string;
  diqusComentLink?: string;
  tags?: Tag[];
};
