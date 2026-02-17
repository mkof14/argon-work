import { mkdir } from "node:fs/promises";
import path from "node:path";

let cachedDataDir: string | null = null;

async function canUseDir(dir: string) {
  try {
    await mkdir(dir, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

export async function resolveDataDir() {
  if (cachedDataDir) return cachedDataDir;

  const cwd = process.cwd();
  const candidates = [
    process.env.AGRON_WORK_DATA_DIR?.trim(),
    path.join(cwd, "data"),
    path.join(cwd, "apps/agron-work-web/data"),
    "/tmp/agron-work-data"
  ].filter(Boolean) as string[];

  for (const dir of candidates) {
    if (await canUseDir(dir)) {
      cachedDataDir = dir;
      return dir;
    }
  }

  cachedDataDir = "/tmp/agron-work-data";
  return cachedDataDir;
}

export async function resolveDataFile(fileName: string) {
  const dir = await resolveDataDir();
  return path.join(dir, fileName);
}
