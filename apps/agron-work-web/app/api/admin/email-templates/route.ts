import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdminUser } from "../../../../lib/admin/access";
import { readPlatformStore, writePlatformStore } from "../../../../lib/platform/store";

export async function GET() {
  const admin = await requireAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const store = await readPlatformStore();
  return NextResponse.json({ templates: store.emailTemplates });
}

export async function POST(request: Request) {
  const admin = await requireAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const payload = await request.json().catch(() => null);
  if (!payload) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const template = {
    id: randomUUID(),
    name: String(payload.name ?? "").trim() || "Untitled template",
    category: (String(payload.category ?? "marketing") as "welcome" | "security" | "alerts" | "marketing" | "billing"),
    subject: String(payload.subject ?? "").trim() || "AGRON Work update",
    html: String(payload.html ?? "").trim() || "<p>Template body</p>",
    text: String(payload.text ?? "").trim() || "Template body",
    updatedAt: new Date().toISOString()
  };

  const store = await readPlatformStore();
  store.emailTemplates.unshift(template);
  await writePlatformStore(store);

  return NextResponse.json({ ok: true, template });
}
