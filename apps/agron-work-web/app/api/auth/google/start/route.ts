import { NextResponse } from "next/server";
import { createGoogleState, setGoogleState } from "../../../../../lib/auth/session";
import { checkRateLimit, getRequestIp } from "../../../../../lib/auth/rate-limit";
import { getSiteUrl } from "../../../../../lib/site";

export async function GET(request: Request) {
  const ip = getRequestIp(request);
  const rate = checkRateLimit({ key: `auth:google:start:${ip}`, limit: 20, windowMs: 60_000 });
  if (!rate.allowed) {
    return NextResponse.redirect(`${getSiteUrl()}/auth/login?error=rate_limited`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    return NextResponse.redirect(`${getSiteUrl()}/auth/login?error=google_not_configured`);
  }

  const state = createGoogleState();
  setGoogleState(state);

  const redirectUri = `${getSiteUrl()}/api/auth/google/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "offline",
    prompt: "consent"
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
