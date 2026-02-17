import { NextResponse } from "next/server";
import { requireAdminUser } from "../../../../lib/admin/access";
import { readPlatformStore } from "../../../../lib/platform/store";

export async function GET() {
  const admin = await requireAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const store = await readPlatformStore();
  return NextResponse.json({ health: store.health });
}
