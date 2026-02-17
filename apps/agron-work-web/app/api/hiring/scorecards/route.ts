import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { createId, nowIso, readHiringStore, writeHiringStore } from "../../../../lib/hiring/store";
import { getDefaultCompetencies, getDefaultScreenerQuestions, isValidDomain, isValidLevel } from "../../../../lib/hiring/engine";

export async function GET() {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = await readHiringStore();
  return NextResponse.json({
    scorecards: store.scorecards.filter((item) => item.ownerUserId === user.id)
  });
}

export async function POST(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as
    | { roleTitle?: string; domain?: string; level?: string; competencies?: { name: string; weight: number }[]; screenerQuestions?: string[] }
    | null;
  if (!payload?.roleTitle || !payload.domain || !payload.level) {
    return NextResponse.json({ error: "roleTitle, domain, level are required" }, { status: 400 });
  }
  if (!isValidDomain(payload.domain) || !isValidLevel(payload.level)) {
    return NextResponse.json({ error: "Invalid domain/level" }, { status: 400 });
  }

  const now = nowIso();
  const scorecard = {
    id: createId(),
    ownerUserId: user.id,
    roleTitle: payload.roleTitle,
    domain: payload.domain,
    level: payload.level,
    competencies:
      payload.competencies?.length
        ? payload.competencies.map((item) => ({ name: String(item.name), weight: Number(item.weight) || 0 }))
        : getDefaultCompetencies(payload.domain),
    screenerQuestions:
      payload.screenerQuestions?.length
        ? payload.screenerQuestions.map((item) => String(item).trim()).filter(Boolean)
        : getDefaultScreenerQuestions(payload.domain, payload.level),
    createdAt: now,
    updatedAt: now
  };

  const store = await readHiringStore();
  store.scorecards.unshift(scorecard);
  await writeHiringStore(store);
  return NextResponse.json({ ok: true, scorecard });
}

