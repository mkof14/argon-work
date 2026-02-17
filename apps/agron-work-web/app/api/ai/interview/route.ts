import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { roles } from "../../../../lib/roles";

export async function GET(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const roleId = url.searchParams.get("roleId");
  const role = roles.find((item) => item.id === roleId) ?? roles[0];

  const questions = [
    `Which production KPIs would you monitor first for ${role.title}?`,
    `Describe one difficult incident in ${role.domain} and your remediation process.`,
    "How do you verify quality and safety before scaling operations?",
    "What automation opportunity would you implement in the first 30 days?",
    "How do you communicate risks and tradeoffs to business stakeholders?"
  ];

  const checklist = [
    "Quantify two outcomes with numbers (cost, quality, speed, reliability).",
    "Prepare one architecture or workflow example from a real project.",
    "Prepare one failure story and what you changed after it.",
    "Map your skills directly to the role's mission and SLA requirements."
  ];

  return NextResponse.json({
    role: { id: role.id, title: role.title, domain: role.domain },
    questions,
    checklist
  });
}

