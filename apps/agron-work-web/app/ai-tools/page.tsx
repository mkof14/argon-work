import { AiCareerCopilot } from "../../components/ai/AiCareerCopilot";
import { readSession } from "../../lib/auth/session";
import { redirect } from "next/navigation";

export default function AiToolsPage() {
  const session = readSession();
  if (!session) redirect("/auth/login?mode=register");

  return (
    <section>
      <h1 className="page-title">AI Career Copilot</h1>
      <p className="page-subtitle">
        Smart tools to help candidates and employers move faster: match quality, better applications, better interviews, better outcomes.
      </p>

      <AiCareerCopilot />
    </section>
  );
}
