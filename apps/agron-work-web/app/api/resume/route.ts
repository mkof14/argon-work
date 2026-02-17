import { NextResponse } from "next/server";
import { requireAuthUser } from "../../../lib/admin/access";
import { readPlatformStore, writePlatformStore } from "../../../lib/platform/store";

export async function GET() {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = await readPlatformStore();
  const resume =
    store.resumes.find((item) => item.userId === user.id) ??
    {
      userId: user.id,
      summary: "",
      experience: "",
      education: "",
      certifications: "",
      languages: "",
      resumeFileName: undefined,
      resumeFileType: undefined,
      resumeFileDataUrl: undefined,
      updatedAt: new Date().toISOString()
    };

  return NextResponse.json({ resume }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await request.json().catch(() => null);
  if (!payload) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const resumeFileName = typeof payload.resumeFileName === "string" ? payload.resumeFileName.trim() || undefined : undefined;
  const resumeFileType = typeof payload.resumeFileType === "string" ? payload.resumeFileType.trim() || undefined : undefined;
  const resumeFileDataUrl =
    typeof payload.resumeFileDataUrl === "string" && payload.resumeFileDataUrl.startsWith("data:")
      ? payload.resumeFileDataUrl
      : undefined;

  if (resumeFileDataUrl) {
    const allowedTypes = new Set([
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]);
    if (!resumeFileType || !allowedTypes.has(resumeFileType)) {
      return NextResponse.json({ error: "Unsupported resume document type" }, { status: 400 });
    }
    if (resumeFileDataUrl.length > 12_000_000) {
      return NextResponse.json({ error: "Resume document is too large" }, { status: 400 });
    }
  }

  const store = await readPlatformStore();
  const resume = {
    userId: user.id,
    summary: String(payload.summary ?? "").trim(),
    experience: String(payload.experience ?? "").trim(),
    education: String(payload.education ?? "").trim(),
    certifications: String(payload.certifications ?? "").trim(),
    languages: String(payload.languages ?? "").trim(),
    resumeFileName,
    resumeFileType,
    resumeFileDataUrl,
    updatedAt: new Date().toISOString()
  };

  const idx = store.resumes.findIndex((item) => item.userId === user.id);
  if (idx >= 0) {
    store.resumes[idx] = resume;
  } else {
    store.resumes.push(resume);
  }

  await writePlatformStore(store);

  return NextResponse.json({ ok: true, resume });
}
