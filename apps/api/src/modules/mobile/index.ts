import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { appendRecord, readRecords } from "../../lib/file-store.js";
import { getSession } from "../../lib/auth-store.js";
import { getEntitlement, setEntitlement } from "../../lib/entitlement-store.js";

const progressUpdateSchema = z.object({
  userId: z.string().min(1),
  moduleId: z.string().min(1),
  completionPercent: z.number().min(0).max(100),
  score: z.number().min(0).max(100).optional(),
  locale: z.string().min(2).max(10).optional()
});

const subscriptionStatusSchema = z.object({
  userId: z.string().min(1),
  sourceStore: z.enum(["ios", "android", "web"]),
  plan: z.enum(["free", "pro", "enterprise"]),
  status: z.enum(["active", "grace", "canceled", "expired"]),
  renewAt: z.string().datetime().optional()
});

const iapVerifySchema = z.object({
  platform: z.enum(["ios", "android"]),
  receiptOrToken: z.string().min(4),
  productId: z.enum(["agron_pro_monthly", "agron_pro_annual"]),
  userId: z.string().min(1)
});

const corporateInviteSchema = z.object({
  orgId: z.string().min(1),
  companyName: z.string().min(1),
  invitedBy: z.string().email(),
  inviteEmail: z.string().email(),
  role: z.enum(["member", "manager", "admin"]).default("member"),
  seatLimit: z.number().int().positive().optional(),
  locale: z.string().min(2).max(10).optional()
});

const contentModules = [
  {
    id: "part107-m1",
    program: "part107",
    title: "Regulatory Framework & Certification Overview",
    durationMinutes: 45
  },
  {
    id: "part107-m2",
    program: "part107",
    title: "Airspace Classification & Chart Reading",
    durationMinutes: 60
  },
  {
    id: "skills-m1",
    program: "flight-skills",
    title: "Stick Orientation & Hover Control",
    durationMinutes: 35
  },
  {
    id: "skills-m2",
    program: "flight-skills",
    title: "Crosswind Compensation & Recovery",
    durationMinutes: 40
  }
];

const contentScenarios = [
  {
    id: "hover-box",
    title: "Hover Box Stabilization",
    windLevel: 0,
    mode: "gps",
    passThreshold: 80
  },
  {
    id: "precision-landing",
    title: "Precision Landing Pad",
    windLevel: 1,
    mode: "gps",
    passThreshold: 82
  },
  {
    id: "wind-drift-correction",
    title: "Wind Drift Correction",
    windLevel: 2,
    mode: "gps",
    passThreshold: 85
  }
];

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

export function registerMobileRoutes(server: FastifyInstance) {
  server.post("/api/progress/update", async (request, reply) => {
    const payload = progressUpdateSchema.safeParse(request.body);

    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid progress payload" });
    }

    const record = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...payload.data
    };

    await appendRecord("progress_updates.ndjson", record);

    return {
      ok: true,
      progress: record
    };
  });

  server.post("/api/subscription/status", async (request, reply) => {
    const payload = subscriptionStatusSchema.safeParse(request.body);

    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid subscription payload" });
    }

    const record = {
      id: randomUUID(),
      checkedAt: new Date().toISOString(),
      ...payload.data,
      sourceVerified: false
    };

    await appendRecord("subscription_status.ndjson", record);

    return {
      ok: true,
      entitlement: record
    };
  });

  server.post("/api/iap/verify", async (request, reply) => {
    const payload = iapVerifySchema.safeParse(request.body);
    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid iap payload" });
    }

    const plan = payload.data.productId.includes("pro") ? "pro" : "free";
    const now = new Date();
    const renewAt = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30).toISOString();

    const entitlement = setEntitlement({
      userId: payload.data.userId,
      plan,
      status: "active",
      platform: payload.data.platform,
      productId: payload.data.productId,
      renewAt
    });

    await appendRecord("entitlements.ndjson", entitlement);
    await appendRecord("subscription_events.ndjson", {
      id: randomUUID(),
      type: "subscribe_success",
      userId: payload.data.userId,
      productId: payload.data.productId,
      platform: payload.data.platform,
      createdAt: now.toISOString()
    });

    return {
      ok: true,
      entitlement,
      verified: true
    };
  });

  server.get("/api/subscription/status", async (request, reply) => {
    const token = getBearerToken(request.headers.authorization);
    const session = getSession(token);
    if (!session) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    const entitlement =
      getEntitlement(session.userId) ??
      setEntitlement({
        userId: session.userId,
        plan: "free",
        status: "active",
        platform: "web",
        productId: "free",
        renewAt: null
      });

    return { ok: true, entitlement };
  });

  server.post("/api/corporate/invite", async (request, reply) => {
    const payload = corporateInviteSchema.safeParse(request.body);

    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid corporate invite payload" });
    }

    const invite = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      inviteStatus: "pending",
      ...payload.data
    };

    await appendRecord("corporate_invites.ndjson", invite);

    return {
      ok: true,
      invite
    };
  });

  server.get("/api/content/modules", async () => {
    return {
      items: contentModules
    };
  });

  server.get("/api/content/scenarios", async () => {
    return {
      items: contentScenarios
    };
  });

  server.get("/api/simulator-history", async (request, reply) => {
    const token = getBearerToken(request.headers.authorization);
    const session = getSession(token);
    if (!session) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    const runs = await readRecords<{
      userId: string;
      scenario: string;
      createdAt: string;
      stabilityScore: number;
      precisionScore: number;
      safetyScore: number;
      completionTime: number;
      compositeIndex: number;
    }>("simulator_runs.ndjson");

    const items = runs
      .filter((run) => run.userId === session.userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 100);

    return { ok: true, items };
  });

  server.get("/api/simulator-trends", async (request, reply) => {
    const token = getBearerToken(request.headers.authorization);
    const session = getSession(token);
    if (!session) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    const runs = await readRecords<{
      userId: string;
      createdAt: string;
      compositeIndex: number;
      safetyScore: number;
    }>("simulator_runs.ndjson");

    const byDay = new Map<string, { count: number; avgPerformance: number; avgSafety: number }>();

    for (const run of runs) {
      if (run.userId !== session.userId) {
        continue;
      }
      const day = run.createdAt.slice(0, 10);
      const bucket = byDay.get(day) ?? { count: 0, avgPerformance: 0, avgSafety: 0 };
      const nextCount = bucket.count + 1;
      bucket.avgPerformance = (bucket.avgPerformance * bucket.count + Number(run.compositeIndex ?? 0)) / nextCount;
      bucket.avgSafety = (bucket.avgSafety * bucket.count + Number(run.safetyScore ?? 0)) / nextCount;
      bucket.count = nextCount;
      byDay.set(day, bucket);
    }

    const items = Array.from(byDay.entries())
      .map(([day, value]) => ({
        day,
        count: value.count,
        avgPerformance: Number(value.avgPerformance.toFixed(2)),
        avgSafety: Number(value.avgSafety.toFixed(2))
      }))
      .sort((a, b) => a.day.localeCompare(b.day));

    return { ok: true, items };
  });
}
