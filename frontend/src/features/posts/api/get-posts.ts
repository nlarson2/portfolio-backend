import { Post } from '../types';

const url = 'http://localhost:44444/post';

export const GetPostList = async (): Promise<Post[]> => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: Post[] = (await response.json()).posts;
  return data;
};

export const GetPostByID = async (uuid: string) => {
  const response = await fetch(`${url}/${uuid}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: Post = await response.json();
  return data.post;
};
