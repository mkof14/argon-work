import { mkdir, appendFile, readFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.resolve(process.cwd(), "data");

export async function appendRecord(filename: string, record: Record<string, unknown>) {
  await mkdir(dataDir, { recursive: true });
  const outputPath = path.join(dataDir, filename);
  const line = `${JSON.stringify(record)}\n`;
  await appendFile(outputPath, line, "utf8");
}

export async function readRecords<T extends Record<string, unknown>>(filename: string): Promise<T[]> {
  const outputPath = path.join(dataDir, filename);
  let raw = "";

  try {
    raw = await readFile(outputPath, "utf8");
  } catch {
    return [];
  }

  return raw
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line) as T;
      } catch {
        return null;
      }
    })
    .filter((entry): entry is T => entry !== null);
}
