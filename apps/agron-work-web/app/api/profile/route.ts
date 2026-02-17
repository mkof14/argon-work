import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../lib/admin/access";
import { readPlatformStore, writePlatformStore } from "../../../lib/platform/store";

export async function GET() {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = await readPlatformStore();
  const existing = store.profiles.find((profile) => profile.userId === user.id);

  const profile =
    existing ??
    {
      userId: user.id,
      fullName: user.name,
      title: user.onboarding?.jobTitle ?? "",
      about: "",
      location: [user.onboarding?.city, user.onboarding?.stateRegion].filter(Boolean).join(", "),
      phone: user.onboarding?.phone ?? "",
      website: "",
      skills: user.onboarding?.skills ?? [],
      avatarDataUrl: undefined,
      updatedAt: new Date().toISOString()
    };

  return NextResponse.json({ profile }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await request.json().catch(() => null);
  if (!payload) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const avatarDataUrl =
    typeof payload.avatarDataUrl === "string" && payload.avatarDataUrl.startsWith("data:image/")
      ? payload.avatarDataUrl
      : undefined;
  if (avatarDataUrl && avatarDataUrl.length > 1_500_000) {
    return NextResponse.json({ error: "Avatar image is too large" }, { status: 400 });
  }

  const store = await readPlatformStore();
  const now = new Date().toISOString();
  const next = {
    userId: user.id,
    fullName: String(payload.fullName ?? user.name).trim(),
    title: String(payload.title ?? "").trim(),
    about: String(payload.about ?? "").trim(),
    location: String(payload.location ?? "").trim(),
    phone: String(payload.phone ?? "").trim(),
    website: String(payload.website ?? "").trim() || undefined,
    skills: Array.isArray(payload.skills)
      ? payload.skills.map((item: unknown) => String(item).trim()).filter(Boolean)
      : [],
    avatarDataUrl,
    updatedAt: now
  };

  const idx = store.profiles.findIndex((profile) => profile.userId === user.id);
  if (idx >= 0) {
    store.profiles[idx] = next;
  } else {
    store.profiles.push(next);
  }

  await writePlatformStore(store);

  return NextResponse.json({ ok: true, profile: next });
}
