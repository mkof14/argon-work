import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { resolveDataFile } from "../runtime/data-path";
import { readJsonFromPostgres, writeJsonToPostgres } from "../runtime/postgres-kv";

export type AiApplyMode = "preview" | "auto";
export type AiApplicationStatus =
  | "draft_preview"
  | "submitted"
  | "rejected"
  | "interview"
  | "offer"
  | "hired";

export type AiUserConfig = {
  userId: string;
  applyMode: AiApplyMode;
  dailyLimit: number;
  minMatchScore: number;
  workModes: ("Remote" | "Hybrid" | "On-site")[];
  domains: string[];
  excludedKeywords: string[];
  titleTargets: string[];
  onboardingCompleted: boolean;
  updatedAt: string;
};

export type AiApplication = {
  id: string;
  userId: string;
  roleId: string;
  roleTitle: string;
  roleDomain: string;
  mode: AiApplyMode;
  status: AiApplicationStatus;
  companyName: string;
  matchScore: number;
  matchedTerms: string[];
  missingTerms: string[];
  reason: string;
  coverLetter: string;
  createdAt: string;
  updatedAt: string;
};

export type AiEvent = {
  id: string;
  userId: string;
  action:
    | "CONFIG_UPDATED"
    | "MATCH_REVIEWED"
    | "COVER_LETTER_GENERATED"
    | "AUTO_APPLY_RUN"
    | "APPLICATION_APPROVED"
    | "APPLICATION_REJECTED"
    | "APPLICATION_STAGE_UPDATED";
  details: string;
  createdAt: string;
};

export type AiStore = {
  configs: AiUserConfig[];
  applications: AiApplication[];
  events: AiEvent[];
};

function now() {
  return new Date().toISOString();
}

function createInitialStore(): AiStore {
  return {
    configs: [],
    applications: [],
    events: []
  };
}

async function ensureStore() {
  const storeFile = await resolveDataFile("ai-store.json");
  await mkdir(path.dirname(storeFile), { recursive: true });
  try {
    await readFile(storeFile, "utf8");
  } catch {
    const initial = createInitialStore();
    await writeFile(storeFile, `${JSON.stringify(initial, null, 2)}\n`, "utf8");
  }
  return storeFile;
}

export async function readAiStore() {
  const fromDb = await readJsonFromPostgres<Partial<AiStore>>("ai-store");
  if (fromDb) {
    return {
      configs: fromDb.configs ?? [],
      applications: fromDb.applications ?? [],
      events: fromDb.events ?? []
    } as AiStore;
  }

  const storeFile = await ensureStore();
  const raw = await readFile(storeFile, "utf8");
  const parsed = JSON.parse(raw) as Partial<AiStore>;
  return {
    configs: parsed.configs ?? [],
    applications: parsed.applications ?? [],
    events: parsed.events ?? []
  } as AiStore;
}

export async function writeAiStore(store: AiStore) {
  if (await writeJsonToPostgres("ai-store", store)) return;
  const storeFile = await ensureStore();
  await writeFile(storeFile, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export async function upsertAiConfig(config: AiUserConfig) {
  const store = await readAiStore();
  const idx = store.configs.findIndex((item) => item.userId === config.userId);
  if (idx >= 0) {
    store.configs[idx] = config;
  } else {
    store.configs.push(config);
  }
  await writeAiStore(store);
  return config;
}

export async function appendAiApplications(items: AiApplication[]) {
  const store = await readAiStore();
  store.applications.unshift(...items);
  await writeAiStore(store);
}

export async function updateAiApplication(userId: string, applicationId: string, next: Partial<AiApplication>) {
  const store = await readAiStore();
  const item = store.applications.find((application) => application.userId === userId && application.id === applicationId);
  if (!item) return null;
  Object.assign(item, next, { updatedAt: now() });
  await writeAiStore(store);
  return item;
}

export async function appendAiEvent(userId: string, action: AiEvent["action"], details: string) {
  const store = await readAiStore();
  store.events.unshift({
    id: randomUUID(),
    userId,
    action,
    details,
    createdAt: now()
  });
  await writeAiStore(store);
}
