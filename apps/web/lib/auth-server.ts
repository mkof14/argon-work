import { createHmac, timingSafeEqual } from "node:crypto";

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  provider: "magic_link" | "google";
};

type TokenPayload = {
  type: "session" | "magic" | "oauth_state";
  exp: number;
  locale?: string;
  user?: AuthUser;
  email?: string;
};

const SESSION_COOKIE = "agron_session";
const DEFAULT_SECRET = "agron-dev-secret-change-in-production";

function getSecret() {
  return process.env.AUTH_SECRET ?? DEFAULT_SECRET;
}

function encodeBase64Url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function decodeBase64Url(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function sign(input: string) {
  return createHmac("sha256", getSecret()).update(input).digest("base64url");
}

export function createSignedToken(payload: TokenPayload) {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySignedToken(token: string): TokenPayload | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const safe =
    signature.length === expectedSignature.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  if (!safe) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as TokenPayload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function createMagicToken(email: string, locale: string) {
  return createSignedToken({
    type: "magic",
    exp: Math.floor(Date.now() / 1000) + 60 * 15,
    email,
    locale
  });
}

export function createOAuthState(locale: string) {
  return createSignedToken({
    type: "oauth_state",
    exp: Math.floor(Date.now() / 1000) + 60 * 10,
    locale
  });
}

export function createSessionToken(user: AuthUser, locale: string) {
  return createSignedToken({
    type: "session",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    user,
    locale
  });
}

export function cookieName() {
  return SESSION_COOKIE;
}
