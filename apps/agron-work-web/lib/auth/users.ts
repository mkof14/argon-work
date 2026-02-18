import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { hashPassword } from "./session";
import type { Role } from "../platform/store";
import { resolveDataFile } from "../runtime/data-path";
import { readJsonFromPostgres, writeJsonToPostgres } from "../runtime/postgres-kv";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  provider: "credentials" | "google";
  role: Role;
  passwordHash?: string;
  googleId?: string;
  onboarding?: {
    phone: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    minSalary: number;
    currency: string;
    workMode: "Remote" | "Hybrid" | "On-site" | "Flexible";
    employmentTypes: string[];
    jobTitle: string;
    skills: string[];
    yearsExperience: number;
    availability: "Immediate" | "2 weeks" | "1 month" | "Flexible";
    addressLine1: string;
    addressLine2?: string;
    city: string;
    stateRegion: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
};

export function getDefaultRoleForEmail(email: string): Role {
  const superAdmins = (process.env.AGRON_WORK_SUPER_ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  const admins = (process.env.AGRON_WORK_ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  const normalized = email.toLowerCase();
  if (superAdmins.includes(normalized)) return "super_admin";
  if (admins.includes(normalized)) return "admin";
  return "user";
}

async function ensureStore() {
  const usersFile = await resolveDataFile("users.json");
  await mkdir(path.dirname(usersFile), { recursive: true });
  try {
    await readFile(usersFile, "utf8");
  } catch {
    await writeFile(usersFile, "[]\n", "utf8");
  }
  return usersFile;
}

async function readUsers() {
  const dbUsers = await readJsonFromPostgres<UserRecord[]>("users");
  if (dbUsers) return dbUsers;
  const usersFile = await ensureStore();
  const raw = await readFile(usersFile, "utf8");
  return JSON.parse(raw) as UserRecord[];
}

async function writeUsers(users: UserRecord[]) {
  if (await writeJsonToPostgres("users", users)) return;
  const usersFile = await ensureStore();
  await writeFile(usersFile, `${JSON.stringify(users, null, 2)}\n`, "utf8");
}

export async function findUserByEmail(email: string) {
  const users = await readUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export type CreateCredentialUserInput = {
  name: string;
  email: string;
  password: string;
  role?: Role;
  onboarding?: UserRecord["onboarding"];
};

export async function createCredentialUser(input: CreateCredentialUserInput) {
  const users = await readUsers();
  const exists = users.find((user) => user.email.toLowerCase() === input.email.toLowerCase());
  if (exists) {
    return { error: "User with this email already exists" as const };
  }

  const now = new Date().toISOString();
  const user: UserRecord = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    provider: "credentials",
    role: input.role ?? "user",
    passwordHash: await hashPassword(input.password),
    onboarding: input.onboarding,
    createdAt: now,
    updatedAt: now
  };

  users.push(user);
  await writeUsers(users);
  return { user };
}

export async function upsertGoogleUser(input: { name: string; email: string; googleId: string; role?: Role; onboarding?: UserRecord["onboarding"] }) {
  const users = await readUsers();
  const existing = users.find((user) => user.email.toLowerCase() === input.email.toLowerCase());
  const now = new Date().toISOString();

  if (existing) {
    existing.name = input.name || existing.name;
    existing.provider = "google";
    existing.googleId = input.googleId;
    existing.role = input.role ?? existing.role ?? "user";
    if (input.onboarding) {
      existing.onboarding = input.onboarding;
    }
    existing.updatedAt = now;
    await writeUsers(users);
    return existing;
  }

  const user: UserRecord = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    provider: "google",
    role: input.role ?? "user",
    googleId: input.googleId,
    onboarding: input.onboarding,
    createdAt: now,
    updatedAt: now
  };

  users.push(user);
  await writeUsers(users);
  return user;
}

export async function listUsers() {
  return readUsers();
}

export async function updateUserRole(userId: string, role: Role) {
  const users = await readUsers();
  const target = users.find((user) => user.id === userId);
  if (!target) return null;
  target.role = role;
  target.updatedAt = new Date().toISOString();
  await writeUsers(users);
  return target;
}

export async function updateUserOnboarding(userId: string, onboarding: UserRecord["onboarding"]) {
  const users = await readUsers();
  const target = users.find((user) => user.id === userId);
  if (!target) return null;
  target.onboarding = onboarding;
  target.updatedAt = new Date().toISOString();
  await writeUsers(users);
  return target;
}

export async function getOrCreateQuickAccessUser(input: { email: string; name?: string; role: Role }) {
  const users = await readUsers();
  const existing = users.find((user) => user.email.toLowerCase() === input.email.toLowerCase());
  const now = new Date().toISOString();

  if (existing) {
    existing.role = input.role;
    existing.updatedAt = now;
    await writeUsers(users);
    return existing;
  }

  const user: UserRecord = {
    id: randomUUID(),
    name: input.name ?? "AGRON Admin",
    email: input.email.toLowerCase(),
    provider: "credentials",
    role: input.role,
    passwordHash: await hashPassword(randomUUID()),
    createdAt: now,
    updatedAt: now
  };

  users.push(user);
  await writeUsers(users);
  return user;
}
