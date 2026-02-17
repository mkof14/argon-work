import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../lib/admin/access";
import { readPlatformStore, writePlatformStore } from "../../../lib/platform/store";

export async function GET() {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = await readPlatformStore();
  const messages = store.messages.filter((msg) => msg.userId === user.id);

  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await request.json().catch(() => null);
  if (!payload) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const subject = String(payload.subject ?? "").trim();
  const body = String(payload.body ?? "").trim();

  if (!subject || !body) {
    return NextResponse.json({ error: "Subject and body are required" }, { status: 400 });
  }

  const store = await readPlatformStore();
  const createdAt = new Date().toISOString();

  const outbound = {
    id: randomUUID(),
    userId: user.id,
    direction: "outbound" as const,
    channel: "platform" as const,
    subject,
    body,
    status: "sent" as const,
    createdAt
  };

  const inboundAck = {
    id: randomUUID(),
    userId: user.id,
    direction: "inbound" as const,
    channel: "platform" as const,
    subject: `Re: ${subject}`,
    body: "Support team received your request and will respond shortly.",
    status: "new" as const,
    createdAt
  };

  store.messages.unshift(inboundAck);
  store.messages.unshift(outbound);
  await writePlatformStore(store);

  return NextResponse.json({ ok: true, message: outbound });
}
