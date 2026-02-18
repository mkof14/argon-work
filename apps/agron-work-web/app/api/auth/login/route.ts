import { NextResponse } from "next/server";
import { findUserByEmail } from "../../../../lib/auth/users";
import { setSessionCookie, verifyPassword } from "../../../../lib/auth/session";
import { checkRateLimit, getRequestIp } from "../../../../lib/auth/rate-limit";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  const email = String(payload?.email ?? "").trim().toLowerCase();
  const password = String(payload?.password ?? "").trim();
  const ip = getRequestIp(request);
  const key = `auth:login:${ip}:${email || "anonymous"}`;
  const rate = checkRateLimit({ key, limit: 8, windowMs: 60_000 });

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const user = await findUserByEmail(email);

  if (!user || !user.passwordHash) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  setSessionCookie(user);

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      provider: user.provider
    }
  });
}
