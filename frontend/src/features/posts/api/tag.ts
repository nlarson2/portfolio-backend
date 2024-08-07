import { Tag } from '../types';

const url = 'http://localhost:44444/tags';

export default class TagAPI {
  public static Create = async (
    token: string,
    tag: Tag
  ): Promise<Tag | undefined> => {
    try {
      const resp = await fetch(`${url}/new-tag`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...tag }),
      });
      return (await resp.json()) as Tag;
    } catch {
      return undefined;
    }
  };

  public static GetList = async (): Promise<Tag[]> => {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: Tag[] = (await response.json()).tags;
    return data;
  };

  public static GetByID = async (id: number) => {
    const response = await fetch(`${url}/${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.tag;
  };

  public static Update = async (
    token: string,
    tag: Tag
  ): Promise<Tag | undefined> => {
    try {
      const resp = await fetch(`${url}/update`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...tag }),
      });
      return (await resp.json()) as Tag;
    } catch {
      return undefined;
    }
  };

  public static Delete = async (
    token: string,
    tag: Tag
  ): Promise<Tag | undefined> => {
    try {
      const resp = await fetch(`${url}/delete`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...tag }),
      });
      return (await resp.json()) as Tag;
    } catch {
      return undefined;
    }
  };
}
