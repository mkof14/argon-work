import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { getAiDashboard } from "../../../../lib/ai/engine";

export async function GET() {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dashboard = await getAiDashboard(user);
  return NextResponse.json(dashboard);
}

