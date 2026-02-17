import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { createId, nowIso, readHiringStore, writeHiringStore } from "../../../../lib/hiring/store";

export async function GET() {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = await readHiringStore();
  return NextResponse.json({
    invites: store.invites.filter((item) => item.ownerUserId === user.id)
  });
}

export async function POST(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as
    | { jobPostId?: string; candidateEmail?: string; introSlot?: string; note?: string }
    | null;
  if (!payload?.jobPostId || !payload.candidateEmail || !payload.introSlot) {
    return NextResponse.json({ error: "jobPostId, candidateEmail, introSlot are required" }, { status: 400 });
  }

  const invite = {
    id: createId(),
    ownerUserId: user.id,
    jobPostId: payload.jobPostId,
    candidateEmail: payload.candidateEmail.toLowerCase(),
    status: "sent" as const,
    introSlot: payload.introSlot,
    note: String(payload.note ?? ""),
    createdAt: nowIso()
  };

  const store = await readHiringStore();
  store.invites.unshift(invite);
  await writeHiringStore(store);
  return NextResponse.json({ ok: true, invite });
}

