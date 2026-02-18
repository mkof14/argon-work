type BucketEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, BucketEntry>();

function now() {
  return Date.now();
}

export function getRequestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function checkRateLimit(input: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const current = now();
  const existing = buckets.get(input.key);

  if (!existing || existing.resetAt <= current) {
    buckets.set(input.key, { count: 1, resetAt: current + input.windowMs });
    return { allowed: true as const, retryAfterSeconds: 0 };
  }

  if (existing.count >= input.limit) {
    return {
      allowed: false as const,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - current) / 1000))
    };
  }

  existing.count += 1;
  buckets.set(input.key, existing);
  return { allowed: true as const, retryAfterSeconds: 0 };
}
