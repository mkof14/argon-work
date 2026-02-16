import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { appendRecord } from "../../lib/file-store.js";

const scoreSchema = z.object({
  missionId: z.string(),
  pilotId: z.string(),
  score: z.number().min(0).max(100),
  incidents: z.number().min(0)
});

const simulatorScoreSchema = z.object({
  userId: z.string().min(1),
  scenarioId: z.string().min(1).optional(),
  scenario: z.string().min(1).optional(),
  stabilityScore: z.number().min(0).max(100),
  precisionScore: z.number().min(0).max(100).nullable().optional(),
  safetyScore: z.number().min(0).max(100),
  completionTimeMs: z.number().nonnegative().optional(),
  completionTime: z.number().nonnegative().optional(),
  windLevel: z.number().int().min(0).max(2),
  modeUsed: z.enum(["gps", "atti", "manual", "gps_stabilized"]).default("gps_stabilized"),
  appVersion: z.string().min(1).optional(),
  deviceOS: z.string().min(1).optional()
});

export function registerSimulationRoutes(server: FastifyInstance) {
  server.post("/simulations/score", async (request, reply) => {
    const payload = scoreSchema.safeParse(request.body);

    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid simulation payload" });
    }

    return {
      ...payload.data,
      level: payload.data.score >= 80 ? "pass" : "retry"
    };
  });

  server.post("/api/simulator-score", async (request, reply) => {
    const payload = simulatorScoreSchema.safeParse(request.body);

    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid simulator score payload" });
    }

    const precision = payload.data.precisionScore ?? 0;
    const weightedScore =
      payload.data.stabilityScore * 0.35 +
      precision * 0.35 +
      payload.data.safetyScore * 0.3;

    const record = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      userId: payload.data.userId,
      scenario: payload.data.scenarioId ?? payload.data.scenario ?? "unknown",
      stabilityScore: payload.data.stabilityScore,
      precisionScore: payload.data.precisionScore ?? null,
      safetyScore: payload.data.safetyScore,
      completionTime: payload.data.completionTimeMs ?? payload.data.completionTime ?? 0,
      windLevel: payload.data.windLevel,
      modeUsed: payload.data.modeUsed,
      appVersion: payload.data.appVersion ?? "unknown",
      deviceOS: payload.data.deviceOS ?? "unknown",
      compositeIndex: Number(weightedScore.toFixed(2))
    };

    await appendRecord("simulator_runs.ndjson", record);

    return {
      ok: true,
      record
    };
  });
}
