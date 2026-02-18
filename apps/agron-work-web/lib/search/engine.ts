import { roles, type RoleCard } from "../roles";
import { readHiringStore } from "../hiring/store";

export type SearchQuery = {
  q?: string;
  domain?: string;
  level?: string;
  mode?: string;
  limit?: number;
};

export type SearchResult = {
  id: string;
  title: string;
  domain: string;
  level: string;
  mode: string;
  summary: string;
  tags: string[];
  salaryMin?: number;
  salaryMax?: number;
  source: "catalog" | "job";
  score: number;
};

function scoreRole(role: RoleCard, query: string) {
  if (!query) return 1;
  const q = query.toLowerCase();
  const title = role.title.toLowerCase();
  const domain = role.domain.toLowerCase();
  const summary = role.summary.toLowerCase();
  const tags = role.tags.map((tag) => tag.toLowerCase());

  let score = 0;
  if (title.includes(q)) score += 6;
  if (domain.includes(q)) score += 4;
  if (summary.includes(q)) score += 2;
  if (tags.some((tag) => tag.includes(q))) score += 3;
  return score;
}

export async function searchJobs(query: SearchQuery) {
  const q = (query.q ?? "").trim();
  const domain = (query.domain ?? "").trim().toLowerCase();
  const level = (query.level ?? "").trim().toLowerCase();
  const mode = (query.mode ?? "").trim().toLowerCase();
  const limit = Math.min(Math.max(Number(query.limit ?? 50), 1), 200);

  const catalog = roles
    .map(
      (role): SearchResult => ({
        id: role.id,
        title: role.title,
        domain: role.domain,
        level: role.level,
        mode: role.mode,
        summary: role.summary,
        tags: role.tags,
        source: "catalog",
        score: scoreRole(role, q)
      })
    )
    .filter((item) => item.score > 0);

  const hiringStore = await readHiringStore();
  const posted = hiringStore.jobs
    .filter((job) => job.status === "published")
    .map(
      (job): SearchResult => ({
        id: job.id,
        title: job.title,
        domain: job.domain,
        level: job.level,
        mode: job.mode,
        summary: job.description,
        tags: job.screenerQuestions.slice(0, 5),
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        source: "job",
        score: scoreRole(
          {
            id: job.id,
            title: job.title,
            domain: job.domain as RoleCard["domain"],
            level: job.level as RoleCard["level"],
            mode: job.mode,
            summary: job.description,
            tags: job.screenerQuestions.slice(0, 5)
          },
          q
        ) + 2
      })
    )
    .filter((item) => item.score > 0);

  return [...posted, ...catalog]
    .filter((item) => !domain || item.domain.toLowerCase() === domain)
    .filter((item) => !level || item.level.toLowerCase() === level)
    .filter((item) => !mode || item.mode.toLowerCase() === mode)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
