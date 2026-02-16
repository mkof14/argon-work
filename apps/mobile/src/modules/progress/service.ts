import { apiClient } from "../../api/client";

export interface ProgressUpdatePayload {
  userId: string;
  moduleId: string;
  completionPercent: number;
  score?: number;
  locale?: string;
}

export async function updateProgress(payload: ProgressUpdatePayload) {
  return apiClient.post<{ ok: boolean }>("/api/progress/update", payload);
}
