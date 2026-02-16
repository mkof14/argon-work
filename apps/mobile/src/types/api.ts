export type DrillId = "hover-box" | "precision-landing" | "wind-drift-correction";

export interface SimulatorScorePayload {
  userId: string;
  scenarioId: DrillId;
  stabilityScore: number;
  precisionScore: number | null;
  safetyScore: number;
  completionTimeMs: number;
  windLevel: 0 | 1 | 2;
  modeUsed: "gps_stabilized";
  appVersion: string;
  deviceOS: "ios" | "android";
}
