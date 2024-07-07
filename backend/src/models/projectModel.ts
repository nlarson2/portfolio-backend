import { Post } from "./postModel";

export type Project = {
  id: number;
  name: string;
  thumbnailLink: string;
  posts: Post[];
};
