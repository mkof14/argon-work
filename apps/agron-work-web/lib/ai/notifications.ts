import { randomUUID } from "node:crypto";
import { readPlatformStore, writePlatformStore } from "../platform/store";

type Stage = "submitted" | "rejected" | "interview" | "offer" | "hired";

const templateByStage: Record<Stage, string> = {
  submitted: "ai-application-submitted",
  rejected: "ai-application-rejected",
  interview: "ai-interview-stage",
  offer: "ai-offer-stage",
  hired: "ai-hired-stage"
};

function fill(template: string, vars: Record<string, string | number>) {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{{${key}}}`, String(value));
  }
  return result;
}

export async function sendAiStageEmail(input: {
  userId: string;
  stage: Stage;
  jobTitle: string;
  companyName: string;
  matchScore?: number;
  reason?: string;
}) {
  const store = await readPlatformStore();
  const templateId = templateByStage[input.stage];
  const template = store.emailTemplates.find((item) => item.id === templateId);
  if (!template) return null;

  const vars = {
    job_title: input.jobTitle,
    company_name: input.companyName,
    match_score: input.matchScore ?? 0,
    reason: input.reason ?? "manual review"
  };

  const subject = fill(template.subject, vars);
  const body = fill(template.text, vars);

  const message = {
    id: randomUUID(),
    userId: input.userId,
    direction: "outbound" as const,
    channel: "email" as const,
    subject,
    body,
    status: "sent" as const,
    createdAt: new Date().toISOString()
  };

  store.messages.unshift(message);
  await writePlatformStore(store);
  return message;
}

