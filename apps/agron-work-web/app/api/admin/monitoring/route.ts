import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdminUser } from "../../../../lib/admin/access";
import { readPlatformStore, writePlatformStore } from "../../../../lib/platform/store";

export async function GET() {
  const admin = await requireAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const store = await readPlatformStore();
  return NextResponse.json({ events: store.monitoring });
}

export async function POST(request: Request) {
  const admin = await requireAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const payload = await request.json().catch(() => null);
  if (!payload) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const next = {
    id: randomUUID(),
    severity: (String(payload.severity ?? "info") as "info" | "warning" | "critical"),
    service: String(payload.service ?? "platform"),
    message: String(payload.message ?? "Manual event"),
    createdAt: new Date().toISOString()
  };

  const store = await readPlatformStore();
  store.monitoring.unshift(next);
  await writePlatformStore(store);

  return NextResponse.json({ ok: true, event: next });
}
