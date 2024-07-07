export enum PostType {
  Blog,
  Project,
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
