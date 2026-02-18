import { NextResponse } from "next/server";
import { getOrCreateQuickAccessUser } from "../../../../lib/auth/users";
import { setSessionCookie } from "../../../../lib/auth/session";
import { checkRateLimit, getRequestIp } from "../../../../lib/auth/rate-limit";

const QUICK_EMAIL = (process.env.AGRON_WORK_QUICK_ADMIN_EMAIL ?? "dnainform@gmail.com").toLowerCase();

export async function POST(request: Request) {
  const isProd = process.env.NODE_ENV === "production";
  const allowInProd = process.env.AGRON_WORK_ALLOW_QUICK_ADMIN_IN_PROD === "1";
  const ip = getRequestIp(request);
  const rate = checkRateLimit({ key: `auth:quick-admin:${ip}`, limit: 3, windowMs: 60_000 });

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  if (isProd && !allowInProd) {
    return NextResponse.json({ error: "Quick admin access is disabled in production" }, { status: 403 });
  }

  const user = await getOrCreateQuickAccessUser({
    email: QUICK_EMAIL,
    name: "DNA Inform Admin",
    role: "super_admin"
  });

  setSessionCookie(user);

  return NextResponse.json({ ok: true, redirectTo: "/admin", email: user.email });
}
