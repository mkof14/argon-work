import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { appendRecord } from "../_lib/storage";
import { enforceRateLimit, getClientIp, isEmail, sanitize } from "../_lib/security";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (!enforceRateLimit({ key: `corporate:${ip}`, limit: 6, windowMs: 60_000 })) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  if (sanitize(body.website) !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = sanitize(body.email);
  const company = sanitize(body.company);
  const role = sanitize(body.role);

  if (!company || !role || !isEmail(email)) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const id = randomUUID();
  const record = {
    id,
    createdAt: new Date().toISOString(),
    locale: sanitize(body.locale) || "en",
    company,
    name: sanitize(body.name),
    role,
    email,
    phone: sanitize(body.phone),
    teamSize: sanitize(body.teamSize),
    useCase: sanitize(body.useCase),
    timeline: sanitize(body.timeline),
    message: sanitize(body.message),
    sourcePage: sanitize(body.sourcePage) || "corporate",
    utmSource: sanitize(body.utmSource),
    utmMedium: sanitize(body.utmMedium),
    utmCampaign: sanitize(body.utmCampaign),
    ip
  };

  await appendRecord("corporate_inquiries.ndjson", record);
  return NextResponse.json({ ok: true, id });
}
