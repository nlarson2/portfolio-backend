export enum PostType {
  Blog = "blog",
  Project = "project",
}

export type Post = {
  id?: number;
  uuid?: string;
  title: string;
  content: string;
  createdAt?: Date;
  thumbnailLink?: string;
  diqusComentLink?: string;
};
