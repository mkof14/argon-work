import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdminUser } from "../../../../lib/admin/access";
import { readPlatformStore, writePlatformStore } from "../../../../lib/platform/store";

export async function GET() {
  const admin = await requireAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const store = await readPlatformStore();
  return NextResponse.json({
    assets: store.marketingAssets,
    campaigns: store.marketingAssets.filter((item) => item.kind === "campaign"),
    documents: store.marketingAssets.filter((item) => item.kind === "document")
  });
}

export async function POST(request: Request) {
  const admin = await requireAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const payload = await request.json().catch(() => null);
  if (!payload) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const next = {
    id: randomUUID(),
    kind: (String(payload.kind ?? "campaign") as "campaign" | "document"),
    title: String(payload.title ?? "").trim(),
    campaignType: (String(payload.campaignType ?? "email") as "email" | "push" | "in-app"),
    audience: String(payload.audience ?? "").trim(),
    status: (String(payload.status ?? "draft") as "draft" | "approved" | "scheduled"),
    content: String(payload.content ?? "").trim(),
    fileName: String(payload.fileName ?? "").trim() || undefined,
    fileType: String(payload.fileType ?? "").trim() || undefined,
    tags: Array.isArray(payload.tags) ? payload.tags.map((item: unknown) => String(item).trim()).filter(Boolean) : [],
    createdAt: new Date().toISOString()
  };

  const store = await readPlatformStore();
  store.marketingAssets.unshift(next);
  await writePlatformStore(store);

  return NextResponse.json({ ok: true, asset: next });
}

export async function DELETE(request: Request) {
  const admin = await requireAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const url = new URL(request.url);
  const queryId = url.searchParams.get("id");
  const payload = await request.json().catch(() => null);
  const id = String(queryId ?? payload?.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const store = await readPlatformStore();
  const before = store.marketingAssets.length;
  store.marketingAssets = store.marketingAssets.filter((item) => item.id !== id);
  if (store.marketingAssets.length === before) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  await writePlatformStore(store);
  return NextResponse.json({ ok: true, deletedId: id });
}
