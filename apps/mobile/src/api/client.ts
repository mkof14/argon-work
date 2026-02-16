export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit, accessToken?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, accessToken?: string) => request<T>(path, undefined, accessToken),
  post: <T>(path: string, body: unknown, accessToken?: string) =>
    request<T>(
      path,
      {
        method: "POST",
        body: JSON.stringify(body)
      },
      accessToken
    )
};
