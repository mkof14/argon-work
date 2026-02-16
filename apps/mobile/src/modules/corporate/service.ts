import { apiClient } from "../../api/client";

export interface CorporateInvitePayload {
  orgId: string;
  companyName: string;
  invitedBy: string;
  inviteEmail: string;
  role?: "member" | "manager" | "admin";
  seatLimit?: number;
  locale?: string;
}

export async function sendCorporateInvite(payload: CorporateInvitePayload) {
  return apiClient.post<{ ok: boolean }>("/api/corporate/invite", payload);
}
