import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { calculateMatchForRole, getTopMatches } from "../../../../lib/ai/engine";
import { appendAiEvent } from "../../../../lib/ai/store";
import { roles } from "../../../../lib/roles";

export async function GET(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const roleId = url.searchParams.get("roleId");
  const top = Number(url.searchParams.get("top") ?? "0");

  if (roleId) {
    const role = roles.find((item) => item.id === roleId);
    if (!role) return NextResponse.json({ error: "Role not found" }, { status: 404 });
    const match = await calculateMatchForRole(user, role);
    await appendAiEvent(user.id, "MATCH_REVIEWED", `Match reviewed for role ${role.title} (${match.score}%).`);
    return NextResponse.json({ match });
  }

  const topMatches = await getTopMatches(user, Number.isFinite(top) && top > 0 ? top : 8);
  return NextResponse.json({ matches: topMatches });
}

