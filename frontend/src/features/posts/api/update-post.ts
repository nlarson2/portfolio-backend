import { Post } from '../types';

const url = 'http://localhost:44444/post';

export const UpdatePost = async (
  token: string,
  post: Post
): Promise<Post | undefined> => {
  try {
    const resp = await fetch(`${url}/update`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...post }),
    });
    return (await resp.json()) as Post;
  } catch {
    return undefined;
  }
};
