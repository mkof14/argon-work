import { Pool } from "pg";

let pool: Pool | null = null;
let tableReady = false;

function resolveDbUrl() {
  return (
    process.env.AGRON_WORK_DATABASE_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    ""
  );
}

function resolveTableName() {
  const raw = process.env.AGRON_WORK_DB_TABLE?.trim() || "agron_work_kv";
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(raw) ? raw : "agron_work_kv";
}

export function isPostgresEnabled() {
  const flag = process.env.AGRON_WORK_USE_POSTGRES?.trim().toLowerCase();
  if (flag === "0" || flag === "false" || flag === "off") return false;
  if (flag === "1" || flag === "true" || flag === "on") return true;
  return Boolean(resolveDbUrl());
}

async function getPool() {
  const connectionString = resolveDbUrl();
  if (!connectionString) return null;
  if (!pool) {
    pool = new Pool({
      connectionString,
      max: 5,
      ssl:
        connectionString.includes("localhost") || connectionString.includes("127.0.0.1")
          ? false
          : { rejectUnauthorized: false }
    });
  }
  return pool;
}

async function ensureTable() {
  if (tableReady) return true;
  const currentPool = await getPool();
  if (!currentPool) return false;
  const table = resolveTableName();
  await currentPool.query(`
    CREATE TABLE IF NOT EXISTS ${table} (
      key TEXT PRIMARY KEY,
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  tableReady = true;
  return true;
}

export async function readJsonFromPostgres<T>(key: string): Promise<T | null> {
  if (!isPostgresEnabled()) return null;
  try {
    const currentPool = await getPool();
    if (!currentPool) return null;
    await ensureTable();
    const table = resolveTableName();
    const result = await currentPool.query<{ payload: T }>(
      `SELECT payload FROM ${table} WHERE key = $1 LIMIT 1`,
      [key]
    );
    return result.rows[0]?.payload ?? null;
  } catch (error) {
    console.error("[agron-work] Postgres read failed, falling back to file store", error);
    return null;
  }
}

export async function writeJsonToPostgres<T>(key: string, payload: T): Promise<boolean> {
  if (!isPostgresEnabled()) return false;
  try {
    const currentPool = await getPool();
    if (!currentPool) return false;
    await ensureTable();
    const table = resolveTableName();
    await currentPool.query(
      `INSERT INTO ${table} (key, payload, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (key)
       DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
      [key, JSON.stringify(payload)]
    );
    return true;
  } catch (error) {
    console.error("[agron-work] Postgres write failed, falling back to file store", error);
    return false;
  }
}
