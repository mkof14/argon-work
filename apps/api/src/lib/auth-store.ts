import { randomUUID } from "node:crypto";

type PendingMagicLink = {
  token: string;
  email: string;
  locale: string;
  expiresAt: number;
};

type Session = {
  sessionToken: string;
  userId: string;
  email: string;
  locale: string;
  expiresAt: number;
};

const USER_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const MAGIC_TTL_MS = 1000 * 60 * 15;

const usersByEmail = new Map<string, { id: string; email: string; locale: string }>();
const pendingByToken = new Map<string, PendingMagicLink>();
const sessionsByToken = new Map<string, Session>();

export function createMagicLink(email: string, locale: string) {
  const token = randomUUID();
  pendingByToken.set(token, {
    token,
    email,
    locale,
    expiresAt: Date.now() + MAGIC_TTL_MS
  });
  return token;
}

export function verifyMagicLink(token: string) {
  const pending = pendingByToken.get(token);
  if (!pending || pending.expiresAt < Date.now()) {
    return null;
  }
  pendingByToken.delete(token);

  const normalized = pending.email.toLowerCase();
  const existing = usersByEmail.get(normalized);
  const user = existing ?? { id: randomUUID(), email: normalized, locale: pending.locale };
  usersByEmail.set(normalized, user);

  const sessionToken = randomUUID();
  const session: Session = {
    sessionToken,
    userId: user.id,
    email: user.email,
    locale: user.locale,
    expiresAt: Date.now() + USER_TTL_MS
  };
  sessionsByToken.set(sessionToken, session);
  return session;
}

export function getSession(sessionToken: string | undefined) {
  if (!sessionToken) {
    return null;
  }
  const session = sessionsByToken.get(sessionToken);
  if (!session || session.expiresAt < Date.now()) {
    return null;
  }
  return session;
}
