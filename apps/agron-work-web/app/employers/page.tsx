import Link from "next/link";

const features = [
  {
    title: "AI Shortlisting",
    text: "Rank candidates by skill fit, certifications, equipment, and availability."
  },
  {
    title: "Multi-level Hiring",
    text: "Hire interns, specialists, leads, and directors in one workspace."
  },
  {
    title: "Domain Playbooks",
    text: "Use ready role templates for drones, robotics, monitoring, AI, and data teams."
  },
  {
    title: "Trust and Compliance",
    text: "Verification-ready profiles with transparent history and quality signals."
  },
  {
    title: "Remote Operations Coverage",
    text: "Set up distributed teams for 24/7 monitoring and remote control services."
  },
  {
    title: "Project and Program Governance",
    text: "Manage delivery pipelines with milestones, SLAs, and team-level visibility."
  }
];

const sections = [
  "Role templates and skills matrix",
  "Hiring pipelines and interview stages",
  "Message workflows and response metrics",
  "Admin rights and team permissions",
  "Marketing assets and campaign targeting",
  "Analytics, finance, and monitoring dashboards"
];

export default function EmployersPage() {
  return (
    <section>
      <h1 className="page-title">Employers and Enterprise Teams</h1>
      <p className="page-subtitle">
        Scale hiring pipelines for AI-first and robotics-driven operations without intermediaries.
      </p>
      <article className="card role-profile-card">
        <details className="clean-collapse" open>
          <summary>Hiring Workflow (Step-by-step)</summary>
          <ol className="legal-list">
            <li>Define role scorecard, required skills, and compensation range.</li>
            <li>Publish role and activate filters for quality candidates.</li>
            <li>Shortlist, message, interview, and track decisions transparently.</li>
            <li>Issue offer and hand off to onboarding with clear ownership.</li>
          </ol>
        </details>
      </article>
      <div className="chips">
        <span className="chip">Target Time-to-Hire: 14 days</span>
        <span className="chip">Interview-to-Offer target: 30%+</span>
        <span className="chip">Role quality scorecards enabled</span>
      </div>
      <div className="cards compact-cards">
        {features.slice(0, 4).map((item) => (
          <details className="card clean-collapse" key={item.title}>
            <summary>{item.title}</summary>
            <p>{item.text}</p>
          </details>
        ))}
      </div>
      <article className="card role-profile-card">
        <h3>Employer Workspace Includes</h3>
        <ul className="legal-list">
          {sections.slice(0, 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
      <div className="row">
        <Link href="/specialties" className="btn solid">Browse all specialists</Link>
        <Link href="/hiring-lab" className="btn solid">Open Hiring Lab</Link>
        <Link href="/services" className="btn ghost">Open service modules</Link>
        <Link href="/admin" className="btn ghost">Open Admin Panel</Link>
      </div>
    </section>
  );
}
