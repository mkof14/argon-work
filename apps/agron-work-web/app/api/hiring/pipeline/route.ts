import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import {
  createId,
  nowIso,
  readHiringStore,
  writeHiringStore,
  type HiringPipelineCandidate,
  type HiringPipelineStage
} from "../../../../lib/hiring/store";

const stages: HiringPipelineStage[] = ["applied", "screen", "interview", "offer", "hired", "rejected"];

function isValidStage(value: string): value is HiringPipelineStage {
  return stages.includes(value as HiringPipelineStage);
}

export async function GET(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const jobPostId = url.searchParams.get("jobPostId")?.trim();

  const store = await readHiringStore();
  const owned = store.pipeline.filter((item) => item.ownerUserId === user.id);
  const filtered = jobPostId ? owned.filter((item) => item.jobPostId === jobPostId) : owned;

  return NextResponse.json({ candidates: filtered, stages });
}

export async function POST(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as
    | {
        jobPostId?: string;
        candidateEmail?: string;
        candidateName?: string;
        stage?: string;
        score?: number;
        source?: string;
        note?: string;
      }
    | null;

  if (!payload?.jobPostId || !payload.candidateEmail || !payload.candidateName) {
    return NextResponse.json({ error: "jobPostId, candidateEmail, candidateName are required" }, { status: 400 });
  }

  const stage = String(payload.stage ?? "applied").trim().toLowerCase();
  if (!isValidStage(stage)) return NextResponse.json({ error: "Invalid stage" }, { status: 400 });

  const sourceRaw = String(payload.source ?? "direct").trim().toLowerCase();
  const source = (["direct", "invite", "referral"].includes(sourceRaw) ? sourceRaw : "direct") as HiringPipelineCandidate["source"];
  const now = nowIso();

  const candidate: HiringPipelineCandidate = {
    id: createId(),
    ownerUserId: user.id,
    jobPostId: payload.jobPostId,
    candidateEmail: payload.candidateEmail.toLowerCase(),
    candidateName: payload.candidateName.trim(),
    stage,
    score: Math.max(0, Math.min(100, Number(payload.score ?? 0))),
    source,
    note: String(payload.note ?? "").trim(),
    createdAt: now,
    updatedAt: now
  };

  const store = await readHiringStore();
  store.pipeline.unshift(candidate);
  await writeHiringStore(store);
  return NextResponse.json({ ok: true, candidate });
}

export async function PATCH(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as
    | {
        id?: string;
        stage?: string;
        score?: number;
        note?: string;
      }
    | null;

  if (!payload?.id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const store = await readHiringStore();
  const candidate = store.pipeline.find((item) => item.id === payload.id && item.ownerUserId === user.id);
  if (!candidate) return NextResponse.json({ error: "Candidate not found" }, { status: 404 });

  if (typeof payload.stage === "string") {
    const nextStage = payload.stage.trim().toLowerCase();
    if (!isValidStage(nextStage)) return NextResponse.json({ error: "Invalid stage" }, { status: 400 });
    candidate.stage = nextStage;
  }

  if (typeof payload.score === "number" && Number.isFinite(payload.score)) {
    candidate.score = Math.max(0, Math.min(100, Number(payload.score)));
  }

  if (typeof payload.note === "string") {
    candidate.note = payload.note.trim();
  }

  candidate.updatedAt = nowIso();
  await writeHiringStore(store);
  return NextResponse.json({ ok: true, candidate });
}
