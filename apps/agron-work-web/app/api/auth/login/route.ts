import { NextResponse } from "next/server";
import { findUserByEmail } from "../../../../lib/auth/users";
import { setSessionCookie, verifyPassword } from "../../../../lib/auth/session";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  const email = String(payload?.email ?? "").trim().toLowerCase();
  const password = String(payload?.password ?? "").trim();

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
