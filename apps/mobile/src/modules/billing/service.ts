import { apiClient } from "../../api/client";

export async function verifyIapPurchase(
  accessToken: string,
  payload: {
    platform: "ios" | "android";
    receiptOrToken: string;
    productId: "agron_pro_monthly" | "agron_pro_annual";
    userId: string;
  }
) {
  return apiClient.post<{ ok: boolean; verified: boolean; entitlement: Record<string, unknown> }>(
    "/api/iap/verify",
    payload,
    accessToken
  );
}

export async function getSubscriptionStatus(accessToken: string) {
  return apiClient.get<{ ok: boolean; entitlement: Record<string, unknown> }>(
    "/api/subscription/status",
    accessToken
  );
}
