import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { evaluateScorecard } from "../../../../lib/hiring/engine";
import type { HiringAssessment } from "../../../../lib/hiring/store";
import { createId, nowIso, readHiringStore, writeHiringStore } from "../../../../lib/hiring/store";

export async function POST(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as
    | {
        jobPostId?: string;
        candidateEmail?: string;
        scorecardId?: string;
        breakdown?: { competency: string; weight: number; score: number }[];
      }
    | null;
  if (!payload?.jobPostId || !payload?.candidateEmail || !payload?.scorecardId || !payload?.breakdown?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const evaluated = evaluateScorecard(payload.breakdown);
  const assessment: HiringAssessment = {
    id: createId(),
    ownerUserId: user.id,
    jobPostId: payload.jobPostId,
    candidateEmail: payload.candidateEmail.toLowerCase(),
    scorecardId: payload.scorecardId,
    totalScore: evaluated.pct,
    breakdown: payload.breakdown.map((item) => ({
      competency: String(item.competency),
      score: Number(item.score),
      weight: Number(item.weight)
    })),
    recommendation: evaluated.recommendation as HiringAssessment["recommendation"],
    createdAt: nowIso()
  };

  const store = await readHiringStore();
  store.assessments.unshift(assessment);
  await writeHiringStore(store);
  return NextResponse.json({ ok: true, assessment });
}
