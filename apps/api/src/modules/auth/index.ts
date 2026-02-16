import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { appendRecord } from "../../lib/file-store.js";
import { createMagicLink, getSession, verifyMagicLink } from "../../lib/auth-store.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const magicLinkSchema = z.object({
  email: z.string().email(),
  locale: z.string().min(2).max(10).optional(),
  role: z.enum(["student", "corporate", "admin"]).optional()
});

const verifyMagicLinkSchema = z.object({
  token: z.string().uuid()
});

const requestMagicLinkSchema = z.object({
  email: z.string().email(),
  locale: z.string().min(2).max(10).optional()
});

function getBearerToken(authorizationHeader: string | undefined) {
  if (!authorizationHeader) {
    return undefined;
  }
  const [type, token] = authorizationHeader.split(" ");
  if (type?.toLowerCase() !== "bearer" || !token) {
    return undefined;
  }
  return token;
}

export function registerAuthRoutes(server: FastifyInstance) {
  server.post("/auth/login", async (request, reply) => {
    const payload = loginSchema.safeParse(request.body);

    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid credentials payload" });
    }

    return {
      accessToken: "replace-with-jwt",
      role: "student",
      email: payload.data.email
    };
  });

  server.post("/api/auth/magic-link", async (request, reply) => {
    const payload = magicLinkSchema.safeParse(request.body);

    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid magic-link payload" });
    }

    const token = randomUUID();
    const issuedAt = new Date().toISOString();

    await appendRecord("auth_magic_links.ndjson", {
      id: randomUUID(),
      email: payload.data.email,
      locale: payload.data.locale ?? "en",
      role: payload.data.role ?? "student",
      token,
      issuedAt
    });

    return {
      ok: true,
      email: payload.data.email,
      token,
      expiresInMinutes: 15,
      issuedAt
    };
  });

  server.post("/api/auth/request-magic-link", async (request, reply) => {
    const payload = requestMagicLinkSchema.safeParse(request.body);

    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid request payload" });
    }

    const token = createMagicLink(payload.data.email, payload.data.locale ?? "en");
    const deepLink = `agron://auth/callback?token=${token}`;

    await appendRecord("auth_magic_links.ndjson", {
      id: randomUUID(),
      email: payload.data.email,
      locale: payload.data.locale ?? "en",
      token,
      deepLink,
      issuedAt: new Date().toISOString()
    });

    return {
      ok: true,
      deepLink,
      expiresInMinutes: 15
    };
  });

  server.post("/api/auth/verify-magic-link", async (request, reply) => {
    const payload = verifyMagicLinkSchema.safeParse(request.body);
    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid verify payload" });
    }

    const session = verifyMagicLink(payload.data.token);
    if (!session) {
      return reply.status(401).send({ message: "Token invalid or expired" });
    }

    await appendRecord("auth_sessions.ndjson", {
      id: randomUUID(),
      userId: session.userId,
      email: session.email,
      locale: session.locale,
      sessionToken: session.sessionToken,
      createdAt: new Date().toISOString()
    });

    return {
      ok: true,
      accessToken: session.sessionToken,
      user: {
        id: session.userId,
        email: session.email,
        locale: session.locale
      }
    };
  });

  server.get("/api/me", async (request, reply) => {
    const token = getBearerToken(request.headers.authorization);
    const session = getSession(token);

    if (!session) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    return {
      ok: true,
      user: {
        id: session.userId,
        email: session.email,
        locale: session.locale
      }
    };
  });
}
