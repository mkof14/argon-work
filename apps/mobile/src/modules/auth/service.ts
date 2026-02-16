import { apiClient } from "../../api/client";

export async function requestMagicLink(email: string, locale: string) {
  return apiClient.post<{ ok: boolean; deepLink: string; expiresInMinutes: number }>(
    "/api/auth/request-magic-link",
    { email, locale }
  );
}

export async function verifyMagicLink(token: string) {
  return apiClient.post<{ ok: boolean; accessToken: string; user: { id: string; email: string; locale: string } }>(
    "/api/auth/verify-magic-link",
    { token }
  );
}

export async function fetchMe(accessToken: string) {
  return apiClient.get<{ ok: boolean; user: { id: string; email: string; locale: string } }>("/api/me", accessToken);
}
