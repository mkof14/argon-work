import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { cookieName, createSessionToken, verifySignedToken } from "../../../../../lib/auth-server";

type GoogleTokenResponse = {
  access_token: string;
  id_token?: string;
};

type GoogleProfile = {
  email: string;
  name?: string;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const statePayload = state ? verifySignedToken(state) : null;
  const locale = statePayload?.locale ?? "en";

  if (!code || !statePayload || statePayload.type !== "oauth_state") {
    return NextResponse.redirect(new URL(`/${locale}/auth/login?error=google_state`, url.origin));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login?error=google_not_configured`, url.origin));
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      }),
      cache: "no-store"
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect(new URL(`/${locale}/auth/login?error=google_token`, url.origin));
    }

    const tokenPayload = (await tokenResponse.json()) as GoogleTokenResponse;

    const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokenPayload.access_token}` },
      cache: "no-store"
    });

    if (!profileResponse.ok) {
      return NextResponse.redirect(new URL(`/${locale}/auth/login?error=google_profile`, url.origin));
    }

    const profile = (await profileResponse.json()) as GoogleProfile;
    const user = {
      id: randomUUID(),
      email: profile.email,
      name: profile.name ?? profile.email.split("@")[0],
      provider: "google" as const
    };

    const sessionToken = createSessionToken(user, locale);
    const response = NextResponse.redirect(new URL(`/${locale}/dashboard`, url.origin));
    response.cookies.set(cookieName(), sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    });
    return response;
  } catch {
    return NextResponse.redirect(new URL(`/${locale}/auth/login?error=google_exception`, url.origin));
  }
}
