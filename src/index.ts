import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { posts } from "./routes/posts";
import { tags } from "./routes/tags";
import db from "./middleware/db";
import auth from "./middleware/auth";
// import "./types/express";
// import dotenv from "dotenv";
// dotenv.config();

const server = express();
const PORT = process.env.PORT || 44444;

server.use(cors());
server.use(express.json());
server.use((req: Request, res: Response, next: NextFunction) => {
  db({
    host: process.env.DB_HOST,
    dbname: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  })(req, res, next);
});
// server.use(db);
server.use(auth);

server.get("/", (req, res) => {
  console.log("HERE");
  res.send("HERE");
});
server.use("/post", posts);
server.use("/tags", tags);

server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
