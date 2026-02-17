import { NextResponse } from "next/server";
import { readSession } from "../../../../lib/auth/session";
import { findUserByEmail } from "../../../../lib/auth/users";
import { readPlatformStore } from "../../../../lib/platform/store";

export async function GET() {
  const session = readSession();
  if (!session) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }
  const [user, store] = await Promise.all([findUserByEmail(session.email), readPlatformStore()]);
  const profile = store.profiles.find((item) => item.userId === session.userId);

  return NextResponse.json(
    {
      authenticated: true,
      user: {
        id: session.userId,
        name: session.name,
        email: session.email,
        provider: session.provider,
        role: user?.role ?? "user",
        avatarDataUrl: profile?.avatarDataUrl
      }
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
