import { NextResponse } from "next/server";
import { clearGoogleState, readGoogleState, setSessionCookie } from "../../../../../lib/auth/session";
import { getDefaultRoleForEmail, upsertGoogleUser } from "../../../../../lib/auth/users";
import { getSiteUrl } from "../../../../../lib/site";

type GoogleTokenResponse = {
  access_token?: string;
  id_token?: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
  error?: string;
  error_description?: string;
};

type GoogleUserInfo = {
  sub?: string;
  email?: string;
  name?: string;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const expectedState = readGoogleState();

  if (!code || !state || !expectedState || state !== expectedState) {
    clearGoogleState();
    return NextResponse.redirect(`${getSiteUrl()}/auth/login?error=google_state_invalid`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    clearGoogleState();
    return NextResponse.redirect(`${getSiteUrl()}/auth/login?error=google_not_configured`);
  }

  const redirectUri = `${getSiteUrl()}/api/auth/google/callback`;

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    })
  });

  const tokenData = (await tokenResponse.json().catch(() => ({}))) as GoogleTokenResponse;

  if (!tokenResponse.ok || !tokenData.access_token) {
    clearGoogleState();
    return NextResponse.redirect(`${getSiteUrl()}/auth/login?error=google_token_exchange_failed`);
  }

  const userInfoResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  const userInfo = (await userInfoResponse.json().catch(() => ({}))) as GoogleUserInfo;

  if (!userInfoResponse.ok || !userInfo.email || !userInfo.sub) {
    clearGoogleState();
    return NextResponse.redirect(`${getSiteUrl()}/auth/login?error=google_userinfo_failed`);
  }

  const user = await upsertGoogleUser({
    email: userInfo.email,
    name: userInfo.name ?? userInfo.email,
    googleId: userInfo.sub,
    role: getDefaultRoleForEmail(userInfo.email)
  });

  setSessionCookie(user);
  clearGoogleState();

  return NextResponse.redirect(`${getSiteUrl()}/dashboard`);
}
