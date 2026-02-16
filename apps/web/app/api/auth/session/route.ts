import { NextResponse } from "next/server";
import { cookieName, verifySignedToken } from "../../../../lib/auth-server";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const target = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName()}=`));

  if (!target) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = decodeURIComponent(target.split("=").slice(1).join("="));
  const verified = verifySignedToken(token);

  if (!verified || verified.type !== "session" || !verified.user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true, user: verified.user, locale: verified.locale ?? "en" });
}
