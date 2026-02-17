import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { appendAiEvent, readAiStore, updateAiApplication, type AiApplicationStatus } from "../../../../lib/ai/store";
import { sendAiStageEmail } from "../../../../lib/ai/notifications";

export async function GET() {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = await readAiStore();
  const applications = store.applications
    .filter((application) => application.userId === user.id)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return NextResponse.json({ applications });
}

export async function POST(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as {
    applicationId?: string;
    action?: "approve" | "reject" | "mark_interview" | "mark_offer" | "mark_hired";
  } | null;

  if (!payload?.applicationId || !payload.action) {
    return NextResponse.json({ error: "applicationId and action are required" }, { status: 400 });
  }

  let status: AiApplicationStatus | null = null;
  if (payload.action === "approve") status = "submitted";
  if (payload.action === "reject") status = "rejected";
  if (payload.action === "mark_interview") status = "interview";
  if (payload.action === "mark_offer") status = "offer";
  if (payload.action === "mark_hired") status = "hired";
  if (!status) return NextResponse.json({ error: "Unsupported action" }, { status: 400 });

  const updated = await updateAiApplication(user.id, payload.applicationId, { status });
  if (!updated) return NextResponse.json({ error: "Application not found" }, { status: 404 });

  if (payload.action === "approve") {
    await appendAiEvent(user.id, "APPLICATION_APPROVED", `${updated.roleTitle} approved and submitted.`);
    await sendAiStageEmail({
      userId: user.id,
      stage: "submitted",
      jobTitle: updated.roleTitle,
      companyName: updated.companyName,
      matchScore: updated.matchScore,
      reason: updated.reason
    });
  } else if (payload.action === "reject") {
    await appendAiEvent(user.id, "APPLICATION_REJECTED", `${updated.roleTitle} rejected from preview queue.`);
    await sendAiStageEmail({
      userId: user.id,
      stage: "rejected",
      jobTitle: updated.roleTitle,
      companyName: updated.companyName,
      matchScore: updated.matchScore,
      reason: updated.reason
    });
  } else {
    await appendAiEvent(user.id, "APPLICATION_STAGE_UPDATED", `${updated.roleTitle} moved to stage ${status}.`);
    if (status === "interview" || status === "offer" || status === "hired") {
      await sendAiStageEmail({
        userId: user.id,
        stage: status,
        jobTitle: updated.roleTitle,
        companyName: updated.companyName,
        matchScore: updated.matchScore,
        reason: updated.reason
      });
    }
  }

  return NextResponse.json({ ok: true, application: updated });
}
