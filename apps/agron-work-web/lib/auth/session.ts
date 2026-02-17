import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";

const scrypt = promisify(scryptCallback);

export const SESSION_COOKIE = "agw_session";
export const GOOGLE_STATE_COOKIE = "agw_google_state";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  userId: string;
  name: string;
  email: string;
  provider: "credentials" | "google";
  exp: number;
};

function getSecret() {
  return process.env.AGRON_WORK_AUTH_SECRET ?? "agron-work-dev-secret-change-me";
}

function encode(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function decode(token: string): SessionPayload | null {
  const [body, sig] = token.split(".");

  if (!body || !sig) {
    return null;
  }

  const expectedSig = createHmac("sha256", getSecret()).update(body).digest("base64url");

  const expected = Buffer.from(expectedSig);
  const provided = Buffer.from(sig);
  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return scrypt(password, salt, 64).then((derived) => `${salt}:${Buffer.from(derived as Buffer).toString("hex")}`);
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, hashed] = stored.split(":");
  if (!salt || !hashed) return false;

  const derived = (await scrypt(password, salt, 64)) as Buffer;
  const hashBuffer = Buffer.from(hashed, "hex");

  if (derived.length !== hashBuffer.length) return false;
  return timingSafeEqual(derived, hashBuffer);
}

export function setSessionCookie(user: {
  id: string;
  name: string;
  email: string;
  provider: "credentials" | "google";
}) {
  const payload: SessionPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  };

  cookies().set({
    name: SESSION_COOKIE,
    value: encode(payload),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS
  });
}

export function clearSessionCookie() {
  cookies().set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0)
  });
}

export function readSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return decode(token);
}

export function createGoogleState() {
  return randomBytes(20).toString("hex");
}

export function setGoogleState(state: string) {
  cookies().set({
    name: GOOGLE_STATE_COOKIE,
    value: state,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15
  });
}

export function readGoogleState() {
  return cookies().get(GOOGLE_STATE_COOKIE)?.value ?? null;
}

export function clearGoogleState() {
  cookies().set({
    name: GOOGLE_STATE_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0)
  });
}
