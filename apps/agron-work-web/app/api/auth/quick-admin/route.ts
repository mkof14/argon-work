import { NextResponse } from "next/server";
import { getOrCreateQuickAccessUser } from "../../../../lib/auth/users";
import { setSessionCookie } from "../../../../lib/auth/session";

const QUICK_EMAIL = (process.env.AGRON_WORK_QUICK_ADMIN_EMAIL ?? "dnainform@gmail.com").toLowerCase();

export async function POST() {
  const isProd = process.env.NODE_ENV === "production";
  const allowInProd = process.env.AGRON_WORK_ALLOW_QUICK_ADMIN_IN_PROD === "1";

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
