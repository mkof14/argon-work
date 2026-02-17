import { redirect } from "next/navigation";
import { readSession } from "../../lib/auth/session";
import { findUserByEmail } from "../../lib/auth/users";
import Link from "next/link";
import { getAiDashboard } from "../../lib/ai/engine";

const tasks = [
  "Saved searches and alerts",
  "Applications and interview status",
  "Managed job postings and candidate pipeline",
  "Shortlist and team collaboration",
  "Contracts, milestones, and analytics"
];

export default async function DashboardPage() {
  const session = readSession();

  if (!session) {
    redirect("/auth/login");
  }

  const user = await findUserByEmail(session.email);
  const onboarding = user?.onboarding;
  const ai = user ? await getAiDashboard(user) : null;

  return (
    <section>
      <p className="kicker">Dashboard</p>
      <h1 className="page-title">Welcome, {session.name}</h1>
      <p className="page-subtitle">
        Account: {session.email} · Provider: {session.provider} · Role: {user?.role ?? "user"}
      </p>
      <div className="row">
        <Link href="/profile" className="btn ghost">Profile & Resume</Link>
        <Link href="/messages" className="btn ghost">Messages</Link>
        <Link href="/ai-tools" className="btn ghost">AI Tools</Link>
        {user?.role === "admin" || user?.role === "super_admin" ? (
          <Link href="/admin" className="btn solid">Open Admin Panel</Link>
        ) : null}
      </div>

      {ai ? (
        <div className="cards">
          <article className="card metric-card metric-info">
            <p className="hint-line">AI Applications</p>
            <h3>{ai.kpis.total}</h3>
          </article>
          <article className="card metric-card metric-good">
            <p className="hint-line">AI Submitted</p>
            <h3>{ai.kpis.submitted}</h3>
          </article>
          <article className="card metric-card metric-warn">
            <p className="hint-line">Interviews / Offers</p>
            <h3>{ai.kpis.interviews} / {ai.kpis.offers}</h3>
          </article>
        </div>
      ) : null}

      <div className="cards">
        {tasks.map((task) => (
          <article key={task} className="card">
            <h3>{task}</h3>
            <p>Configured and ready for next implementation phase.</p>
          </article>
        ))}
      </div>

      {onboarding ? (
        <article className="card role-profile-card">
          <h3>Profile indicators</h3>
          <p><strong>Job title:</strong> {onboarding.jobTitle}</p>
          <p><strong>Work mode:</strong> {onboarding.workMode}</p>
          <p><strong>Employment:</strong> {onboarding.employmentTypes.join(", ")}</p>
          <p><strong>Min salary:</strong> {onboarding.minSalary} {onboarding.currency}</p>
          <p><strong>Experience:</strong> {onboarding.yearsExperience} years</p>
          <p><strong>Availability:</strong> {onboarding.availability}</p>
          <p><strong>Skills:</strong> {onboarding.skills.join(", ") || "-"}</p>
          <p><strong>Address:</strong> {onboarding.addressLine1}, {onboarding.city}, {onboarding.stateRegion}, {onboarding.zipCode}, {onboarding.country}</p>
          <p><strong>Email verified:</strong> {onboarding.emailVerified ? "Yes" : "No"} · <strong>Phone verified:</strong> {onboarding.phoneVerified ? "Yes" : "No"}</p>
        </article>
      ) : null}
    </section>
  );
}
