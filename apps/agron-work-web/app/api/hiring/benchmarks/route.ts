import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../../lib/admin/access";
import { getSalaryBenchmark, isValidDomain, isValidLevel, isValidMode } from "../../../../lib/hiring/engine";

export async function GET(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const domain = url.searchParams.get("domain") ?? "";
  const level = url.searchParams.get("level") ?? "";
  const mode = url.searchParams.get("mode") ?? "";
  if (!isValidDomain(domain) || !isValidLevel(level) || !isValidMode(mode)) {
    return NextResponse.json({ error: "Invalid domain/level/mode" }, { status: 400 });
  }

  return NextResponse.json({ benchmark: getSalaryBenchmark(domain, level, mode) });
}

