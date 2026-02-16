import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function hasSupabaseStorage() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

function ensureStorageConfigured(fileName: string) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const tableName = resolveTableName(fileName);
  if (tableName && !hasSupabaseStorage()) {
    throw new Error(
      "Production storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
}

function toSnakeCase(input: string) {
  return input.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function toDbPayload(payload: Record<string, unknown>) {
  const output: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === "") continue;
    output[toSnakeCase(key)] = value;
  }
  return output;
}

async function appendToSupabase(tableName: string, payload: Record<string, unknown>) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseServiceRoleKey as string,
      Authorization: `Bearer ${supabaseServiceRoleKey as string}`,
      Prefer: "return=minimal"
    },
    body: JSON.stringify(toDbPayload(payload)),
    cache: "no-store"
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "unknown");
    throw new Error(`Supabase insert failed: ${response.status} ${details}`);
  }
}

function resolveTableName(fileName: string) {
  if (fileName === "leads.ndjson") return "leads";
  if (fileName === "corporate_inquiries.ndjson") return "corporate_inquiries";
  if (fileName === "waitlist.ndjson") return "waitlist";
  return null;
}

async function appendToFile(fileName: string, payload: Record<string, unknown>) {
  await mkdir(dataDir, { recursive: true });
  const filePath = path.join(dataDir, fileName);
  await appendFile(filePath, `${JSON.stringify(payload)}\n`, "utf8");
}

export async function appendRecord(fileName: string, payload: Record<string, unknown>) {
  ensureStorageConfigured(fileName);
  const tableName = resolveTableName(fileName);

  if (hasSupabaseStorage() && tableName) {
    await appendToSupabase(tableName, payload);
    return;
  }

  await appendToFile(fileName, payload);
}
