import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { appendRecord } from "../_lib/storage";
import { enforceRateLimit, getClientIp, isEmail, sanitize } from "../_lib/security";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (!enforceRateLimit({ key: `waitlist:${ip}`, limit: 8, windowMs: 60_000 })) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  if (sanitize(body.website) !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = sanitize(body.email);
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const id = randomUUID();
  const record = {
    id,
    createdAt: new Date().toISOString(),
    locale: sanitize(body.locale) || "en",
    email,
    platform: sanitize(body.platform),
    interest: sanitize(body.interest) || "waitlist",
    sourcePage: sanitize(body.sourcePage) || "unknown",
    utmSource: sanitize(body.utmSource),
    utmMedium: sanitize(body.utmMedium),
    utmCampaign: sanitize(body.utmCampaign),
    ip
  };

  await appendRecord("waitlist.ndjson", record);
  return NextResponse.json({ ok: true, id });
}
