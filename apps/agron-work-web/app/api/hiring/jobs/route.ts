import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { createId, nowIso, readHiringStore, writeHiringStore } from "../../../../lib/hiring/store";
import { detectScamRisk, getDefaultScreenerQuestions, getSalaryBenchmark, isValidDomain, isValidLevel, isValidMode } from "../../../../lib/hiring/engine";

export async function GET() {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = await readHiringStore();
  return NextResponse.json({
    jobs: store.jobs.filter((item) => item.ownerUserId === user.id)
  });
}

export async function POST(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as
    | {
        title?: string;
        domain?: string;
        level?: string;
        mode?: string;
        location?: string;
        salaryMin?: number;
        salaryMax?: number;
        employmentType?: string;
        description?: string;
        screenerQuestions?: string[];
      }
    | null;

  if (!payload?.title || !payload.domain || !payload.level || !payload.mode || !payload.location || !payload.description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!isValidDomain(payload.domain) || !isValidLevel(payload.level) || !isValidMode(payload.mode)) {
    return NextResponse.json({ error: "Invalid domain/level/mode" }, { status: 400 });
  }

  const benchmark = getSalaryBenchmark(payload.domain, payload.level, payload.mode);
  const risk = detectScamRisk(payload.description);
  const now = nowIso();
  const job = {
    id: createId(),
    ownerUserId: user.id,
    title: payload.title,
    domain: payload.domain,
    level: payload.level,
    mode: payload.mode as "Remote" | "Hybrid" | "On-site",
    location: payload.location,
    salaryMin: Number(payload.salaryMin ?? benchmark.min),
    salaryMax: Number(payload.salaryMax ?? benchmark.max),
    employmentType: String(payload.employmentType ?? "Full-time"),
    description: payload.description,
    screenerQuestions:
      payload.screenerQuestions?.length
        ? payload.screenerQuestions.map((item) => String(item).trim()).filter(Boolean)
        : getDefaultScreenerQuestions(payload.domain, payload.level),
    scamRiskScore: risk.score,
    scamFlags: risk.flags,
    benchmarkMin: benchmark.min,
    benchmarkMax: benchmark.max,
    status: "draft" as const,
    createdAt: now,
    updatedAt: now
  };

  const store = await readHiringStore();
  store.jobs.unshift(job);
  await writeHiringStore(store);

  return NextResponse.json({ ok: true, job, scam: risk, benchmark });
}

