import { apiClient } from "../../api/client";

export interface ContentModule {
  id: string;
  program: string;
  title: string;
  durationMinutes: number;
}

export async function fetchProgramModules() {
  return apiClient.get<{ items: ContentModule[] }>("/api/content/modules");
}
