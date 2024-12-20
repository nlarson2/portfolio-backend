import { BaseRepository } from "./base/baseRepository";
import { Post } from "../models/postModel";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "../models/tagModel";

export class PostRepository extends BaseRepository<Post, string> {
  async find(_item: Post): Promise<Post[]> {
    return [];
  }

  async setup() {
    const query = `
      create table if not exists public."Posts" (
        id integer primary key,
        uuid varchar,
        title varchar,
        content varchar,
        created_at timestamp,
        thumbnail_link varchar,
        disqus_comment_link varchar
      )
    `;
    await this.db.query(query);
    return;
  }

  async findOne(id: string): Promise<Post | undefined> {
    let posts: Post[] = [];
    const query = 'select * from public."Posts" where uuid=$1';
    const values = [id];
    const results = await this.db.query<Post>(query, values);
    posts = [...results.rows];
    console.log(posts);
    const post = posts.length > 0 ? posts[0] : undefined;
    if (post) {
      post.tags = await this.getTags(post);
    }
    return post;
  }

  async getTags(post: Post): Promise<Tag[]> {
    const results = await this.db.query<Tag>(
      `SELECT t.id, t.name FROM public."Tags" as t join (	
          select pht.tag_id, pht.post_id from public."Posts" as p join public."post_has_tag" pht	
          on p.id = pht.post_id
      ) pt on t.id = pt.tag_id
      where pt.post_id = $1`,
      [post.id],
    );

    return [...results.rows];
  }

  async getAll(): Promise<Post[]> {
    let posts: Post[] = [];
    const results = await this.db.query<Post>(
      'select id, uuid, title, created_at from public."Posts" order by created_at desc',
    );
    posts = [...results.rows];

    //get tags
    for (var i = 0; i < posts.length; i++) {
      console.log(posts[i].id);
      posts[i].tags = await this.getTags(posts[i]);
    }

    return posts;
  }

  async create(item: Post): Promise<Post | undefined> {
    try {
      const uuid = uuidv4();
      const query = `insert into public."Posts"(uuid, title, content, created_at) values($1, $2, $3, to_timestamp($4/1000.0))`;
      const values = [uuid, item.title, item.content, Date.now()];
      await this.db.query<Post>(query, values);
      return await this.findOne(uuid);
    } catch (e: any) {
      console.log(e);
      return undefined;
    }
  }

  async addTag(tagId: number, postId: number): Promise<void> {
    try {
      const query = `insert into public."post_has_tag"(tag_id, post_id) values($1, $2)`;
      const values = [tagId, postId];
      this.db.query<Post>(query, values);
    } catch (e: any) {
      console.log(e);
    }
  }

  async removeTag(tagId: number, postId: number): Promise<void> {
    try {
      const query = `delete from public."post_has_tag" where tag_id=$1 and post_id=$2`;
      const values = [tagId, postId];
      this.db.query<Post>(query, values);
    } catch (e: any) {
      console.log(e);
    }
  }

  async updateTags(item: Post): Promise<Post | undefined> {
    try {
      let newTags = item.tags;
      const tagLinkQuery = `select * from public."post_has_tag" where post_id=$1`;
      const response = await this.db.query<{
        id: number;
        post_id: number;
        tag_id: number;
      }>(tagLinkQuery, [item.id]);
      let currentLinkedTags = [...response.rows];
      let newTagsLen = newTags?.length as number;
      if (newTagsLen > 0 && currentLinkedTags.length > 0) {
        for (let i = newTagsLen - 1; i >= 0; i--) {
          for (let j = currentLinkedTags.length - 1; j >= 0; j--) {
            if (newTags && newTags[i].id == currentLinkedTags[j]?.tag_id) {
              newTags = newTags.filter(
                (tag) => newTags && tag.id != newTags[i].id,
              );
              currentLinkedTags = currentLinkedTags?.filter(
                (tag) => tag.tag_id != currentLinkedTags[j].tag_id,
              );
              break;
            }
          }
        }
      }

      newTags?.map(async (tag) => {
        if (tag.id && item.id) await this.addTag(tag.id, item.id);
      });
      currentLinkedTags.map(async (tag) => {
        if (tag.id && item.id) await this.removeTag(tag.tag_id, item.id);
      });
    } catch (e: any) {
      console.log(e);
      return undefined;
    }
  }

  async update(id: string, item: Post): Promise<Post | undefined> {
    try {
      const query = `update public."Posts" set title=$1, content=$2 where uuid=$3`;
      const values = [item.title, item.content, id];
      await this.db.query<Post>(query, values);

      await this.updateTags(item);

      return await this.findOne(id);
    } catch (e: any) {
      console.log(e);
      return undefined;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const query = `delete from public."Posts" where uuid=$1`;
      const values = [id];
      await this.db.query(query, values);
      return true;
    } catch (e: any) {
      console.log(e);
      return false;
    }
  }
}
