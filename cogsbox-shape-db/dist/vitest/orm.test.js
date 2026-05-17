import { describe, it, expect, beforeAll } from "vitest";
import { s, schema, createSchemaBox } from "cogsbox-shape";
import { z } from "zod";
import { connect } from "../connect.js";
import { createSqliteDb } from "../sqlite/sqlite-driver.js";
import { Kysely, sql } from "kysely";
const userSchema = schema({
    _tableName: "users",
    id: s.sql({ type: "int", pk: true }).clientInput({
        value: () => `new_${crypto.randomUUID().slice(0, 8)}`,
        schema: z.string(),
        clientPk: true,
    }),
    name: s.sql({ type: "varchar", length: 100 }).clientInput({ value: "" }),
    email: s.sql({ type: "varchar", length: 255 }),
    isActive: s
        .sql({ type: "int" })
        .clientInput(() => z.boolean())
        .transform({
        toClient: (val) => val === 1,
        toDb: (val) => (val ? 1 : 0),
    }),
});
const box = createSchemaBox({ users: userSchema }, { users: {} });
let db;
describe("cogsbox-shape-db", () => {
    beforeAll(async () => {
        db = await createSqliteDb(":memory:");
        await sql `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        isActive INTEGER NOT NULL DEFAULT 0
      )
    `.execute(db);
    });
    it("connect returns enhanced box with .db", () => {
        const b = connect(box, db);
        expect(b.users).toBeDefined();
        expect(b.users.db).toBeDefined();
        expect(typeof b.users.db.findMany).toBe("function");
        expect(typeof b.users.db.findById).toBe("function");
        expect(typeof b.users.db.create).toBe("function");
        expect(typeof b.users.db.update).toBe("function");
        expect(typeof b.users.db.delete).toBe("function");
        expect(typeof b.users.db.count).toBe("function");
    });
    it("create inserts a record and returns client-shaped data", async () => {
        const b = connect(box, db);
        const defaults = box.users.generateDefaults();
        const user = await b.users.db.create({
            ...defaults,
            name: "Alice",
            email: "alice@test.com",
            isActive: true,
        });
        expect(user.name).toBe("Alice");
        expect(user.email).toBe("alice@test.com");
        expect(user.isActive).toBe(true);
        expect(user.id).toBeDefined();
    });
    it("findById returns null for non-existent record", async () => {
        const b = connect(box, db);
        const user = await b.users.db.findById(99999);
        expect(user).toBeNull();
    });
    it("findById returns record by auto-increment id", async () => {
        const b = connect(box, db);
        const defaults = box.users.generateDefaults();
        const created = await b.users.db.create({
            ...defaults,
            name: "Bob",
            email: "bob@test.com",
            isActive: false,
        });
        const found = await b.users.db.findById(created.id);
        expect(found).not.toBeNull();
        expect(found.name).toBe("Bob");
        expect(found.isActive).toBe(false);
    });
    it("findMany returns all records", async () => {
        const b = connect(box, db);
        const all = await b.users.db.findMany();
        expect(all.length).toBeGreaterThanOrEqual(2);
    });
    it("findMany respects limit", async () => {
        const b = connect(box, db);
        const limited = await b.users.db.findMany({ limit: 1 });
        expect(limited.length).toBe(1);
    });
    it("findMany filters by where clause", async () => {
        const b = connect(box, db);
        const results = await b.users.db.findMany({
            where: { name: "Alice" },
        });
        expect(results.length).toBeGreaterThanOrEqual(1);
        expect(results[0].name).toBe("Alice");
    });
    it("findMany with contains operator", async () => {
        const b = connect(box, db);
        const results = await b.users.db.findMany({
            where: { name: { contains: "Ali" } },
        });
        expect(results.length).toBeGreaterThanOrEqual(1);
    });
    it("update modifies fields and returns updated record", async () => {
        const b = connect(box, db);
        const defaults = box.users.generateDefaults();
        const user = await b.users.db.create({
            ...defaults,
            name: "Charlie",
            email: "charlie@test.com",
            isActive: false,
        });
        const updated = await b.users.db.update(user.id, {
            name: "Charlie Updated",
            isActive: true,
        });
        expect(updated.name).toBe("Charlie Updated");
        expect(updated.isActive).toBe(true);
    });
    it("delete removes a record", async () => {
        const b = connect(box, db);
        const defaults = box.users.generateDefaults();
        const user = await b.users.db.create({
            ...defaults,
            name: "DeleteMe",
            email: "delete@test.com",
            isActive: false,
        });
        const result = await b.users.db.delete(user.id);
        expect(result.deleted).toBe(true);
        const found = await b.users.db.findById(user.id);
        expect(found).toBeNull();
    });
    it("count returns total records", async () => {
        const b = connect(box, db);
        const total = await b.users.db.count();
        expect(total).toBeGreaterThanOrEqual(3);
    });
    it("count with where filter", async () => {
        const b = connect(box, db);
        const count = await b.users.db.count({ isActive: true });
        expect(count).toBeGreaterThanOrEqual(1);
    });
    it("transaction commits all operations atomically", async () => {
        const b = connect(box, db);
        const result = await b.db.transaction(async (txBox) => {
            const u1 = await txBox.users.db.create({
                ...box.users.generateDefaults(),
                name: "TxUser1",
                email: "tx1@test.com",
                isActive: true,
            });
            const u2 = await txBox.users.db.create({
                ...box.users.generateDefaults(),
                name: "TxUser2",
                email: "tx2@test.com",
                isActive: true,
            });
            return { u1, u2 };
        });
        expect(result.u1).toBeDefined();
        expect(result.u2).toBeDefined();
    });
    it("sub-path import works", async () => {
        const { createSqliteDb: createDb } = await import("../sqlite/index.js");
        expect(createDb).toBeDefined();
    });
});
