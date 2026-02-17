import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { getDefaultAiConfig, runAutoApply } from "../../../../lib/ai/engine";
import { type AiApplyMode } from "../../../../lib/ai/store";
import { sendAiStageEmail } from "../../../../lib/ai/notifications";

export async function POST(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as { mode?: AiApplyMode } | null;
  const config = await getDefaultAiConfig(user);
  const applications = await runAutoApply(user, config, payload?.mode);
  const submitted = applications.filter((item) => item.status === "submitted");
  await Promise.all(
    submitted.map((item) =>
      sendAiStageEmail({
        userId: user.id,
        stage: "submitted",
        jobTitle: item.roleTitle,
        companyName: item.companyName,
        matchScore: item.matchScore,
        reason: item.reason
      })
    )
  );

  return NextResponse.json({
    ok: true,
    mode: payload?.mode ?? config.applyMode,
    created: applications.length,
    applications
  });
}
