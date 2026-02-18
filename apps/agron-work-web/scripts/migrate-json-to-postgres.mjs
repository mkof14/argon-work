#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";

const connectionString =
  process.env.AGRON_WORK_DATABASE_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL;

if (!connectionString) {
  console.error(
    "Missing PostgreSQL connection string. Set AGRON_WORK_DATABASE_URL or DATABASE_URL or POSTGRES_URL."
  );
  process.exit(1);
}

const tableNameRaw = process.env.AGRON_WORK_DB_TABLE || "agron_work_kv";
const tableName = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableNameRaw)
  ? tableNameRaw
  : "agron_work_kv";

const cwd = process.cwd();
const appRoot = cwd.includes("/apps/agron-work-web")
  ? cwd
  : path.join(cwd, "apps", "agron-work-web");

const dataDir =
  process.env.AGRON_WORK_DATA_DIR ||
  path.join(appRoot, "data") ||
  path.join(cwd, "data");

const stores = [
  { key: "users", file: "users.json" },
  { key: "platform-store", file: "platform-store.json" },
  { key: "ai-store", file: "ai-store.json" },
  { key: "hiring-store", file: "hiring-store.json" }
];

const pool = new Pool({
  connectionString,
  max: 3,
  ssl:
    connectionString.includes("localhost") || connectionString.includes("127.0.0.1")
      ? false
      : { rejectUnauthorized: false }
});

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function upsertStore(key, payload) {
  await pool.query(
    `INSERT INTO ${tableName} (key, payload, updated_at)
     VALUES ($1, $2::jsonb, NOW())
     ON CONFLICT (key)
     DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
    [key, JSON.stringify(payload)]
  );
}

async function run() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
      key TEXT PRIMARY KEY,
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  let migrated = 0;
  for (const store of stores) {
    const filePath = path.join(dataDir, store.file);
    try {
      const payload = await readJson(filePath);
      await upsertStore(store.key, payload);
      migrated += 1;
      console.log(`Migrated ${store.key} from ${filePath}`);
    } catch (error) {
      console.log(`Skipped ${store.key} (not found or invalid): ${filePath}`);
    }
  }

  console.log(`Migration complete. Stores migrated: ${migrated}/${stores.length}`);
}

run()
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
