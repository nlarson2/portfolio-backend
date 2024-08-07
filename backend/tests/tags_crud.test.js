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
const tagRepository_1 = require("../src/repositories/tagRepository");
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
let tag = {
    name: "tag-test",
};
describe("Tag Crud Operation", () => {
    let newTag;
    test("Create Tag", () => __awaiter(void 0, void 0, void 0, function* () {
        const client = yield clientSetup();
        const tagRepo = new tagRepository_1.TagRepository(client);
        newTag = yield tagRepo.create(tag);
        client.end();
        expect(newTag === null || newTag === void 0 ? void 0 : newTag.name).toBe(tag.name);
    }));
    test("Update Tag", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!newTag || !newTag.id) {
            throw "New Tag was not created";
        }
        const client = yield clientSetup();
        newTag.name = "New tag name";
        const tagRepo = new tagRepository_1.TagRepository(client);
        newTag = yield tagRepo.update(newTag.id, newTag);
        client.end();
        console.log(newTag);
        expect(newTag === null || newTag === void 0 ? void 0 : newTag.name).toBe("New tag name");
    }));
    test("Delete Tag", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!newTag || !newTag.id) {
            throw "New Tag was not created/updated";
        }
        const client = yield clientSetup();
        const tagRepo = new tagRepository_1.TagRepository(client);
        yield tagRepo.delete(newTag.id);
        newTag = yield tagRepo.findOne(newTag.id);
        client.end();
        expect(newTag).toBe(undefined);
    }));
});
