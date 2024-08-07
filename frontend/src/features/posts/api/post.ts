import { Post } from '../types';

const url = 'http://localhost:44444/post';

export default class PostAPI {
  public static Create = async (
    token: string,
    post: Post
  ): Promise<Post | undefined> => {
    try {
      const resp = await fetch(`${url}/new-post`, {
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

  public static GetList = async (): Promise<Post[]> => {
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

  public static GetByID = async (uuid: string) => {
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

  public static Update = async (
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

  public static Delete = async (
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
}
