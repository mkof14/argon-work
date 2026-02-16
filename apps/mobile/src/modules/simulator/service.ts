import { apiClient } from "../../api/client";
import type { SimulatorScorePayload } from "../../types/api";

export async function submitSimulatorScore(accessToken: string, payload: SimulatorScorePayload) {
  return apiClient.post<{ ok: boolean }>("/api/simulator-score", payload, accessToken);
}

export async function fetchSimulatorHistory(accessToken: string) {
  return apiClient.get<{ ok: boolean; items: Array<Record<string, unknown>> }>(
    "/api/simulator-history",
    accessToken
  );
}

export async function fetchSimulatorTrends(accessToken: string) {
  return apiClient.get<{ ok: boolean; items: Array<Record<string, unknown>> }>(
    "/api/simulator-trends",
    accessToken
  );
}
