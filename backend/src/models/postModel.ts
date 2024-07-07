export enum PostType {
  Blog = "blog",
  Project = "project",
}

export type Post = {
  id?: number;
  uuid?: string;
  title: string;
  content: string;
  userId?: number;
  createdAt?: Date;
  type: PostType;
  thumbnailLink?: string;
  diqusComentLink?: string;
};
