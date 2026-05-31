import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { sql } from "kysely";
import { connect } from "cogsbox-shape/db";
import { createSqliteDb } from "cogsbox-shape/db/sqlite";
import { box } from "../shared/schema.js";

const db = await createSqliteDb(":memory:");

await sql`
  CREATE TABLE IF NOT EXISTS playground_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    fullName VARCHAR(220) NOT NULL,
    email VARCHAR(255) NOT NULL,
    isActive INTEGER NOT NULL DEFAULT 1
  )
`.execute(db);

const bx = connect(box, db) as any;
const app = new Hono();

app.use("*", cors());

app.get("/api/defaults", (c) => {
  return c.json(box.users.generateDefaults());
});

app.get("/api/users", async (c) => {
  const users = await bx.users.findMany({
    orderBy: { id: "desc" },
    limit: 50,
  });
  return c.json(users);
});

app.post("/api/users", async (c) => {
  const body = await c.req.json();
  const user = await bx.users.insert(body).full();
  return c.json(user, 201);
});

app.patch("/api/users/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const user = await bx.users.update(id, body).full();
  return c.json(user);
});

app.delete("/api/users/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const result = await bx.users.delete(id);
  return c.json(result);
});

serve(
  {
    fetch: app.fetch,
    hostname: "127.0.0.1",
    port: 5174,
  },
  (info) => {
    console.log(`API listening on http://${info.address}:${info.port}`);
  },
);
