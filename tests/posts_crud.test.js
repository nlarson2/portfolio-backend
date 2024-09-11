"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const postRepository_1 = require("../src/repositories/postRepository");
const clientSetup = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.Client({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: 5432,
    });
    yield client.connect();
    return client;
});
let post = {
    title: "test post title",
    content: "test post content",
};
describe("Post Crud Operation", () => {
    let newPost;
    test("Create Post", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = yield clientSetup();
        const postRepo = new postRepository_1.PostRepository(client);
        newPost = yield postRepo.create(post);
        client.end();
        expect(newPost === null || newPost === void 0 ? void 0 : newPost.title).toBe(post.title);
    }));
    test("Update Post", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!newPost || !newPost.uuid) {
            throw "New Post was not created";
        }
        const client = yield clientSetup();
        newPost.title = "New title post";
        const postRepo = new postRepository_1.PostRepository(client);
        newPost = yield postRepo.update(newPost.uuid, newPost);
        client.end();
        console.log(newPost);
        expect(newPost === null || newPost === void 0 ? void 0 : newPost.title).toBe("New title post");
    }));
    test("Delete Post", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!newPost || !newPost.uuid) {
            throw "New Post was not creatd/updated";
        }
        const client = yield clientSetup();
        newPost.title = "New title post";
        const postRepo = new postRepository_1.PostRepository(client);
        yield postRepo.delete(newPost.uuid);
        newPost = yield postRepo.findOne(newPost.uuid);
        client.end();
        expect(newPost).toBe(undefined);
    }));
});
