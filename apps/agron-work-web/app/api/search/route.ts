import { NextResponse } from "next/server";
import { searchJobs } from "../../../lib/search/engine";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const domain = url.searchParams.get("domain") ?? "";
  const level = url.searchParams.get("level") ?? "";
  const mode = url.searchParams.get("mode") ?? "";
  const limit = Number(url.searchParams.get("limit") ?? 50);

  const results = await searchJobs({ q, domain, level, mode, limit });

  return NextResponse.json(
    {
      ok: true,
      count: results.length,
      results
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
