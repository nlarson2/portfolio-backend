import { Client } from "pg";
import { TagRepository } from "../src/repositories/tagRepository";
import { Tag } from "../src/models/tagModel";

const clientSetup = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 5432,
  });
  await client.connect();
  return client;
};

let tag: Tag = {
  name: "tag-test",
};

describe("Tag Crud Operation", () => {
  let newTag: Tag | undefined;
  test("Create Tag", async () => {
    const client = await clientSetup();
    const tagRepo: TagRepository = new TagRepository(client);
    newTag = await tagRepo.create(tag);
    client.end();
    expect(newTag?.name).toBe(tag.name);
  });

  test("Update Tag", async () => {
    if (!newTag || !newTag.id) {
      throw "New Tag was not created";
    }
    const client = await clientSetup();
    newTag.name = "New tag name";
    const tagRepo: TagRepository = new TagRepository(client);
    newTag = await tagRepo.update(newTag.id, newTag);
    client.end();
    console.log(newTag);
    expect(newTag?.name).toBe("New tag name");
  });

  test("Delete Tag", async () => {
    if (!newTag || !newTag.id) {
      throw "New Tag was not created/updated";
    }
    const client = await clientSetup();
    const tagRepo: TagRepository = new TagRepository(client);
    await tagRepo.delete(newTag.id);
    newTag = await tagRepo.findOne(newTag.id);
    client.end();
    expect(newTag).toBe(undefined);
  });
});
