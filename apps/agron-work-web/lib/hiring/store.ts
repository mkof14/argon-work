import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type HiringScorecard = {
  id: string;
  ownerUserId: string;
  roleTitle: string;
  domain: string;
  level: string;
  competencies: { name: string; weight: number }[];
  screenerQuestions: string[];
  createdAt: string;
  updatedAt: string;
};

export type HiringJobPost = {
  id: string;
  ownerUserId: string;
  title: string;
  domain: string;
  level: string;
  mode: "Remote" | "Hybrid" | "On-site";
  location: string;
  salaryMin: number;
  salaryMax: number;
  employmentType: string;
  description: string;
  screenerQuestions: string[];
  scamRiskScore: number;
  scamFlags: string[];
  benchmarkMin: number;
  benchmarkMax: number;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

export type HiringInvite = {
  id: string;
  ownerUserId: string;
  jobPostId: string;
  candidateEmail: string;
  status: "sent" | "accepted" | "declined";
  introSlot: string;
  note: string;
  createdAt: string;
};

export type HiringAssessment = {
  id: string;
  ownerUserId: string;
  jobPostId: string;
  candidateEmail: string;
  scorecardId: string;
  totalScore: number;
  breakdown: { competency: string; score: number; weight: number }[];
  recommendation: "strong_yes" | "yes" | "hold" | "no";
  createdAt: string;
};

export type HiringStore = {
  scorecards: HiringScorecard[];
  jobs: HiringJobPost[];
  invites: HiringInvite[];
  assessments: HiringAssessment[];
};

const dataDir = path.join(process.cwd(), "apps/agron-work-web/data");
const storeFile = path.join(dataDir, "hiring-store.json");

function now() {
  return new Date().toISOString();
}

function createInitialStore(): HiringStore {
  return {
    scorecards: [],
    jobs: [],
    invites: [],
    assessments: []
  };
}

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(storeFile, "utf8");
  } catch {
    const initial = createInitialStore();
    await writeFile(storeFile, `${JSON.stringify(initial, null, 2)}\n`, "utf8");
  }
}

export async function readHiringStore() {
  await ensureStore();
  const raw = await readFile(storeFile, "utf8");
  const parsed = JSON.parse(raw) as Partial<HiringStore>;
  return {
    scorecards: parsed.scorecards ?? [],
    jobs: parsed.jobs ?? [],
    invites: parsed.invites ?? [],
    assessments: parsed.assessments ?? []
  } as HiringStore;
}

export async function writeHiringStore(store: HiringStore) {
  await writeFile(storeFile, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export function createId() {
  return randomUUID();
}

export function nowIso() {
  return now();
}

