import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { detectScamRisk } from "../../../../lib/hiring/engine";

export async function POST(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as { text?: string } | null;
  const text = String(payload?.text ?? "").trim();
  if (!text) return NextResponse.json({ error: "text is required" }, { status: 400 });

  const risk = detectScamRisk(text);
  return NextResponse.json({ risk });
}

