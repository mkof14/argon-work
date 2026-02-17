import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { getDefaultAiConfig, patchConfig } from "../../../../lib/ai/engine";
import { appendAiEvent, upsertAiConfig } from "../../../../lib/ai/store";

export async function GET() {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const config = await getDefaultAiConfig(user);
  return NextResponse.json({ config });
}

export async function PUT(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!payload) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const current = await getDefaultAiConfig(user);
  const next = patchConfig(current, payload);
  await upsertAiConfig(next);
  await appendAiEvent(
    user.id,
    "CONFIG_UPDATED",
    `AI config updated: mode=${next.applyMode}, limit=${next.dailyLimit}, minMatch=${next.minMatchScore}.`
  );

  return NextResponse.json({ ok: true, config: next });
}

