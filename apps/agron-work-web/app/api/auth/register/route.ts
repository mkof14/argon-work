import { NextResponse } from "next/server";
import { createCredentialUser, getDefaultRoleForEmail } from "../../../../lib/auth/users";
import { setSessionCookie } from "../../../../lib/auth/session";
import { checkRateLimit, getRequestIp } from "../../../../lib/auth/rate-limit";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  const name = String(payload?.name ?? "").trim();
  const email = String(payload?.email ?? "").trim().toLowerCase();
  const password = String(payload?.password ?? "").trim();
  const phone = String(payload?.phone ?? "").trim();
  const emailVerified = Boolean(payload?.emailVerified);
  const phoneVerified = Boolean(payload?.phoneVerified);
  const minSalary = Number(payload?.minSalary ?? 0);
  const currency = String(payload?.currency ?? "USD").trim().toUpperCase();
  const workMode = String(payload?.workMode ?? "Remote").trim();
  const employmentTypes = Array.isArray(payload?.employmentTypes) ? payload.employmentTypes.map(String) : [];
  const jobTitle = String(payload?.jobTitle ?? "").trim();
  const skillsRaw = String(payload?.skills ?? "").trim();
  const yearsExperience = Number(payload?.yearsExperience ?? 0);
  const availability = String(payload?.availability ?? "Flexible").trim();
  const addressLine1 = String(payload?.addressLine1 ?? "").trim();
  const addressLine2 = String(payload?.addressLine2 ?? "").trim();
  const city = String(payload?.city ?? "").trim();
  const stateRegion = String(payload?.stateRegion ?? "").trim();
  const zipCode = String(payload?.zipCode ?? "").trim();
  const country = String(payload?.country ?? "").trim();
  const ip = getRequestIp(request);
  const key = `auth:register:${ip}:${email || "anonymous"}`;
  const rate = checkRateLimit({ key, limit: 5, windowMs: 60_000 });

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many registration attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  if (!phone || !emailVerified || !phoneVerified) {
    return NextResponse.json({ error: "Email and phone must be verified" }, { status: 400 });
  }

  if (!jobTitle || employmentTypes.length === 0) {
    return NextResponse.json({ error: "Job title and at least one employment type are required" }, { status: 400 });
  }

  if (!addressLine1 || !city || !stateRegion || !zipCode || !country) {
    return NextResponse.json({ error: "Address, city, region, ZIP, and country are required" }, { status: 400 });
  }

  const skills = skillsRaw
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const created = await createCredentialUser({
    name,
    email,
    password,
    role: getDefaultRoleForEmail(email),
    onboarding: {
      phone,
      emailVerified,
      phoneVerified,
      minSalary: Number.isFinite(minSalary) ? Math.max(0, minSalary) : 0,
      currency,
      workMode: (["Remote", "Hybrid", "On-site", "Flexible"].includes(workMode) ? workMode : "Remote") as
        | "Remote"
        | "Hybrid"
        | "On-site"
        | "Flexible",
      employmentTypes,
      jobTitle,
      skills,
      yearsExperience: Number.isFinite(yearsExperience) ? Math.max(0, yearsExperience) : 0,
      availability: (["Immediate", "2 weeks", "1 month", "Flexible"].includes(availability) ? availability : "Flexible") as
        | "Immediate"
        | "2 weeks"
        | "1 month"
        | "Flexible",
      addressLine1,
      addressLine2: addressLine2 || undefined,
      city,
      stateRegion,
      zipCode,
      country
    }
  });

  if ("error" in created) {
    return NextResponse.json({ error: created.error }, { status: 409 });
  }

  setSessionCookie(created.user);

  return NextResponse.json({
    ok: true,
    user: {
      id: created.user.id,
      name: created.user.name,
      email: created.user.email,
      provider: created.user.provider
    }
  });
}
