export type UserRole = "student" | "instructor" | "admin" | "org_admin";

export interface Course {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
}

export interface SimulationScore {
  missionId: string;
  pilotId: string;
  score: number;
  incidents: number;
}

export type LocaleCode = "en" | "ru" | "uk" | "es" | "ar" | "he";

export type EntitlementPlan = "free" | "pro" | "enterprise";

export type EntitlementStatus = "active" | "grace" | "canceled" | "expired";

export interface Entitlement {
  userId: string;
  plan: EntitlementPlan;
  status: EntitlementStatus;
  sourceStore: "ios" | "android" | "web";
  renewAt?: string;
}

export interface ProgressRecord {
  userId: string;
  moduleId: string;
  completionPercent: number;
  score?: number;
  updatedAt: string;
}

export interface SimulatorRun {
  userId: string;
  scenario: string;
  stabilityScore: number;
  precisionScore: number;
  safetyScore: number;
  completionTime: number;
  windLevel: 1 | 2 | 3;
  modeUsed: "gps" | "atti" | "manual";
  createdAt: string;
}
