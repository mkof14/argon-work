import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { generateCoverLetterForRole } from "../../../../lib/ai/engine";
import { appendAiEvent } from "../../../../lib/ai/store";

export async function POST(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as {
    roleId?: string;
    companyName?: string;
    highlight?: string;
  } | null;

  if (!payload?.roleId) return NextResponse.json({ error: "roleId is required" }, { status: 400 });
  const generated = await generateCoverLetterForRole(user, payload.roleId, payload.companyName, payload.highlight);
  if (!generated) return NextResponse.json({ error: "Role not found" }, { status: 404 });

  await appendAiEvent(
    user.id,
    "COVER_LETTER_GENERATED",
    `Cover letter generated for ${generated.role.title} (${generated.match.score}% match).`
  );

  return NextResponse.json({
    role: generated.role,
    match: generated.match,
    letter: generated.letter
  });
}

