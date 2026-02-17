import { redirect } from "next/navigation";
import { readSession } from "../../lib/auth/session";
import { HiringLabWorkspace } from "../../components/hiring/HiringLabWorkspace";

export default function HiringLabPage() {
  const session = readSession();
  if (!session) redirect("/auth/login?mode=register");

  return (
    <section>
      <h1 className="page-title">Hiring Lab</h1>
      <p className="page-subtitle">
        Structured hiring toolkit: scorecards, screener questions, invite-to-apply flows, compensation transparency, anti-scam checks, and explainable decisions.
      </p>
      <HiringLabWorkspace />
    </section>
  );
}

