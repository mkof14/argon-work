import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { cookieName, createSessionToken, verifySignedToken } from "../../../../lib/auth-server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const token = typeof body.token === "string" ? body.token : "";
  const verified = verifySignedToken(token);

  if (!verified || verified.type !== "magic" || !verified.email) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  const user = {
    id: randomUUID(),
    email: verified.email,
    provider: "magic_link" as const,
    name: verified.email.split("@")[0]
  };

  const sessionToken = createSessionToken(user, verified.locale ?? "en");
  const response = NextResponse.json({ ok: true, user });

  response.cookies.set(cookieName(), sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });

  return response;
}
