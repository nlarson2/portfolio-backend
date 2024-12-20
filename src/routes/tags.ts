import { Router } from "express";

import { TagController } from "../controllers/tagController";

export const tags = Router();
tags.get("/", TagController.getListOfTags);
// tags.get("/", (req, res) => {
//   console.log("HERE");
//   res.json({ message: "HERE" });
// });
tags.post("/new-tag", TagController.createTag);
tags.post("/delete", TagController.deleteTag);

// const tags = (fastify: FastifyInstance, opts: any, done: any) => {
//   fastify.get("", TagController.getListOfTags);
//   fastify.post("/new-tag", TagController.createTag);
//   fastify.post("/delete", TagController.deleteTag);
//   done();
// };
//
// export { tags };
