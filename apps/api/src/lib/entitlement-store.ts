import { randomUUID } from "node:crypto";

export type EntitlementStatus = "active" | "grace" | "canceled" | "expired";
export type EntitlementPlan = "free" | "pro" | "enterprise";
export type EntitlementPlatform = "ios" | "android" | "web";

export type Entitlement = {
  id: string;
  userId: string;
  plan: EntitlementPlan;
  status: EntitlementStatus;
  platform: EntitlementPlatform;
  productId: string;
  renewAt: string | null;
  createdAt: string;
  updatedAt: string;
};

const entitlementsByUser = new Map<string, Entitlement>();

export function setEntitlement(input: Omit<Entitlement, "id" | "createdAt" | "updatedAt">) {
  const existing = entitlementsByUser.get(input.userId);
  const now = new Date().toISOString();
  const next: Entitlement = {
    id: existing?.id ?? randomUUID(),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    ...input
  };
  entitlementsByUser.set(input.userId, next);
  return next;
}

export function getEntitlement(userId: string): Entitlement | null {
  return entitlementsByUser.get(userId) ?? null;
}
