const buckets = new Map<string, number[]>();

export function getClientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return headers.get("x-real-ip") ?? "unknown";
}

export function enforceRateLimit({
  key,
  limit = 10,
  windowMs = 60_000
}: {
  key: string;
  limit?: number;
  windowMs?: number;
}) {
  const now = Date.now();
  const events = buckets.get(key) ?? [];
  const recent = events.filter((timestamp) => now - timestamp < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  return recent.length <= limit;
}

export function sanitize(input: unknown) {
  if (typeof input !== "string") return "";
  return input.replace(/[<>{}]/g, "").trim();
}

export function isEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}
