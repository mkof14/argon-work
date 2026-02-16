import { NextResponse } from "next/server";
import { createMagicToken } from "../../../../lib/auth-server";
import { isEmail, sanitize } from "../../_lib/security";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const email = sanitize(body.email).toLowerCase();
  const locale = sanitize(body.locale) || "en";

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const token = createMagicToken(email, locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const magicLink = `${siteUrl}/${locale}/auth/verify?token=${encodeURIComponent(token)}`;

  console.log("[AGRON auth] Magic link generated", { email, magicLink });

  return NextResponse.json({ ok: true, magicLink, expiresInMinutes: 15 });
}
