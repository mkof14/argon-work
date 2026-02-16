import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { appendRecord } from "../_lib/storage";
import { enforceRateLimit, getClientIp, sanitize } from "../_lib/security";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (!enforceRateLimit({ key: `simscore:${ip}`, limit: 30, windowMs: 60_000 })) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const id = randomUUID();

  const record = {
    id,
    createdAt: new Date().toISOString(),
    userId: sanitize(body.userId),
    scenario: sanitize(body.scenario),
    stabilityScore: sanitize(body.stabilityScore),
    precisionScore: sanitize(body.precisionScore),
    safetyScore: sanitize(body.safetyScore),
    completionTime: sanitize(body.completionTime),
    windLevel: sanitize(body.windLevel),
    modeUsed: sanitize(body.modeUsed),
    locale: sanitize(body.locale) || "en",
    sourcePage: sanitize(body.sourcePage) || "simulator",
    ip
  };

  await appendRecord("simulator_scores.ndjson", record);
  return NextResponse.json({ ok: true, id });
}
