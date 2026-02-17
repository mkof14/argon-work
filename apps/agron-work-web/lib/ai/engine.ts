import { randomUUID } from "node:crypto";
import { allDomains, allModes, roles, type RoleCard } from "../roles";
import type { UserRecord } from "../auth/users";
import { readPlatformStore } from "../platform/store";
import {
  appendAiApplications,
  appendAiEvent,
  readAiStore,
  type AiApplication,
  type AiApplicationStatus,
  type AiApplyMode,
  type AiUserConfig
} from "./store";

function now() {
  return new Date().toISOString();
}

function tokenize(input: string) {
  return input
    .toLowerCase()
    .split(/[\s,.;:/()+-]+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 1);
}

function uniq(values: string[]) {
  return Array.from(new Set(values));
}

function normalizeInt(value: unknown, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

export async function getDefaultAiConfig(user: UserRecord): Promise<AiUserConfig> {
  const store = await readAiStore();
  const existing = store.configs.find((item) => item.userId === user.id);
  if (existing) return existing;

  return {
    userId: user.id,
    applyMode: "preview",
    dailyLimit: 12,
    minMatchScore: 70,
    workModes:
      user.onboarding?.workMode && allModes.includes(user.onboarding.workMode as "Remote" | "Hybrid" | "On-site")
        ? [user.onboarding.workMode as "Remote" | "Hybrid" | "On-site"]
        : [...allModes],
    domains: [...allDomains],
    excludedKeywords: [],
    titleTargets: user.onboarding?.jobTitle ? [user.onboarding.jobTitle] : [],
    onboardingCompleted: false,
    updatedAt: now()
  };
}

async function buildUserKeywords(user: UserRecord) {
  const platformStore = await readPlatformStore();
  const profile = platformStore.profiles.find((item) => item.userId === user.id);
  const resume = platformStore.resumes.find((item) => item.userId === user.id);

  const raw = [
    user.name,
    user.onboarding?.jobTitle ?? "",
    ...(user.onboarding?.skills ?? []),
    profile?.title ?? "",
    ...(profile?.skills ?? []),
    profile?.about ?? "",
    resume?.summary ?? "",
    resume?.experience ?? "",
    resume?.education ?? "",
    resume?.certifications ?? "",
    resume?.languages ?? ""
  ].join(" ");

  return uniq(tokenize(raw));
}

function buildRoleKeywords(role: RoleCard) {
  return uniq(tokenize([role.title, role.domain, role.summary, ...role.tags].join(" ")));
}

export async function calculateMatchForRole(user: UserRecord, role: RoleCard) {
  const userKeywords = await buildUserKeywords(user);
  const roleKeywords = buildRoleKeywords(role);

  const matched = roleKeywords.filter((token) => userKeywords.includes(token));
  const missing = roleKeywords.filter((token) => !userKeywords.includes(token));
  const score = roleKeywords.length ? Math.round((matched.length / roleKeywords.length) * 100) : 0;

  return {
    role,
    score,
    matchedTerms: matched.slice(0, 8),
    missingTerms: missing.slice(0, 8),
    reason: matched.length
      ? `Matched terms: ${matched.slice(0, 5).join(", ")}.`
      : "No strong overlap found yet. Improve profile keywords and resume highlights."
  };
}

function generateCoverLetter(params: {
  userName: string;
  role: RoleCard;
  companyName: string;
  matchedTerms: string[];
  highlight?: string;
}) {
  const highlights = params.highlight?.trim()
    ? params.highlight.trim()
    : "I have practical experience delivering automation and AI-enabled operations with measurable outcomes.";

  const skillsLine =
    params.matchedTerms.length > 0
      ? `My profile aligns with your needs in ${params.matchedTerms.slice(0, 4).join(", ")}.`
      : "My profile aligns with operational excellence, reliability, and modern AI workflows.";

  return `Hello ${params.companyName} team,

I am applying for the ${params.role.title} role.

${highlights}

${skillsLine}
I can contribute to ${params.role.domain} outcomes with fast execution and clear ownership.

Regards,
${params.userName}`;
}

export async function generateCoverLetterForRole(user: UserRecord, roleId: string, companyName?: string, highlight?: string) {
  const role = roles.find((item) => item.id === roleId);
  if (!role) return null;
  const match = await calculateMatchForRole(user, role);
  const letter = generateCoverLetter({
    userName: user.name,
    role,
    companyName: companyName?.trim() || "AGRON Partner Company",
    matchedTerms: match.matchedTerms,
    highlight
  });
  return { role, match, letter };
}

export async function runAutoApply(user: UserRecord, config: AiUserConfig, mode?: AiApplyMode) {
  const resolvedMode = mode ?? config.applyMode;
  const excluded = config.excludedKeywords.map((item) => item.toLowerCase());
  const store = await readAiStore();

  const existingRoleIds = new Set(
    store.applications
      .filter((application) => application.userId === user.id)
      .map((application) => application.roleId)
  );

  const candidates = roles.filter((role) => {
    if (config.workModes.length > 0 && !config.workModes.includes(role.mode)) return false;
    if (config.domains.length > 0 && !config.domains.includes(role.domain)) return false;
    if (existingRoleIds.has(role.id)) return false;

    const hay = `${role.title} ${role.summary} ${role.tags.join(" ")}`.toLowerCase();
    if (excluded.some((word) => word && hay.includes(word))) return false;

    return true;
  });

  const scored = await Promise.all(candidates.map(async (role) => calculateMatchForRole(user, role)));
  const shortlisted = scored
    .filter((item) => item.score >= config.minMatchScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, config.dailyLimit);

  const createdAt = now();
  const applications: AiApplication[] = shortlisted.map((item) => {
    const companyName = "AGRON Partner Company";
    const coverLetter = generateCoverLetter({
      userName: user.name,
      role: item.role,
      companyName,
      matchedTerms: item.matchedTerms
    });

    return {
      id: randomUUID(),
      userId: user.id,
      roleId: item.role.id,
      roleTitle: item.role.title,
      roleDomain: item.role.domain,
      mode: resolvedMode,
      status: resolvedMode === "auto" ? "submitted" : "draft_preview",
      companyName,
      matchScore: item.score,
      matchedTerms: item.matchedTerms,
      missingTerms: item.missingTerms,
      reason: item.reason,
      coverLetter,
      createdAt,
      updatedAt: createdAt
    };
  });

  if (applications.length > 0) {
    await appendAiApplications(applications);
  }
  await appendAiEvent(
    user.id,
    "AUTO_APPLY_RUN",
    `Auto-apply run in ${resolvedMode.toUpperCase()} mode. Created ${applications.length} applications with threshold ${config.minMatchScore}%.`
  );

  return applications;
}

export async function getAiDashboard(user: UserRecord) {
  const store = await readAiStore();
  const items = store.applications.filter((application) => application.userId === user.id);
  const events = store.events.filter((event) => event.userId === user.id).slice(0, 20);

  const byStatus = (status: AiApplicationStatus) => items.filter((item) => item.status === status).length;
  const submitted = byStatus("submitted");
  const interviews = byStatus("interview");
  const offers = byStatus("offer");
  const hired = byStatus("hired");
  const drafts = byStatus("draft_preview");
  const rejected = byStatus("rejected");
  const total = items.length;
  const avgMatch = total ? Math.round(items.reduce((sum, item) => sum + item.matchScore, 0) / total) : 0;

  const interviewRate = submitted ? Math.round((interviews / submitted) * 100) : 0;
  const offerRate = interviews ? Math.round((offers / interviews) * 100) : 0;
  const hireRate = offers ? Math.round((hired / offers) * 100) : 0;

  const recommendations: string[] = [];
  if (avgMatch < 75) recommendations.push("Increase skill keywords and certifications in profile/resume.");
  if (drafts > 0) recommendations.push("Review preview queue and approve top matches to increase velocity.");
  if (submitted > 0 && interviews === 0) recommendations.push("Update cover letter highlight and target narrower domains.");
  if (rejected > offers) recommendations.push("Raise minimum match threshold and exclude weak-fit keywords.");
  if (recommendations.length === 0) recommendations.push("Pipeline looks healthy. Keep daily runs and monitor quality.");

  return {
    kpis: {
      total,
      drafts,
      submitted,
      interviews,
      offers,
      hired,
      rejected,
      avgMatch,
      interviewRate,
      offerRate,
      hireRate
    },
    events
  };
}

export async function getTopMatches(user: UserRecord, count = 8) {
  const scored = await Promise.all(roles.map(async (role) => calculateMatchForRole(user, role)));
  return scored.sort((a, b) => b.score - a.score).slice(0, count);
}

export function patchConfig(base: AiUserConfig, payload: Record<string, unknown>) {
  const workModes = Array.isArray(payload.workModes)
    ? payload.workModes.map((item) => String(item)).filter((item): item is "Remote" | "Hybrid" | "On-site" => allModes.includes(item as "Remote" | "Hybrid" | "On-site"))
    : base.workModes;

  const domains = Array.isArray(payload.domains)
    ? payload.domains.map((item) => String(item)).filter((item) => allDomains.includes(item as (typeof allDomains)[number]))
    : base.domains;

  const excludedKeywords = Array.isArray(payload.excludedKeywords)
    ? payload.excludedKeywords.map((item) => String(item).trim()).filter(Boolean)
    : base.excludedKeywords;

  const titleTargets = Array.isArray(payload.titleTargets)
    ? payload.titleTargets.map((item) => String(item).trim()).filter(Boolean)
    : base.titleTargets;

  return {
    ...base,
    applyMode: payload.applyMode === "auto" ? "auto" : payload.applyMode === "preview" ? "preview" : base.applyMode,
    dailyLimit: normalizeInt(payload.dailyLimit, base.dailyLimit, 1, 100),
    minMatchScore: normalizeInt(payload.minMatchScore, base.minMatchScore, 40, 100),
    workModes: workModes.length ? workModes : [...allModes],
    domains: domains.length ? domains : [...allDomains],
    excludedKeywords,
    titleTargets,
    onboardingCompleted: Boolean(payload.onboardingCompleted ?? base.onboardingCompleted),
    updatedAt: now()
  } as AiUserConfig;
}
