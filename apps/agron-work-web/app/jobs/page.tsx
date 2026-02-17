import Link from "next/link";
import { RoleCatalog } from "../../components/catalog/RoleCatalog";
import { roles } from "../../lib/roles";

export default function JobsPage() {
  const totalJobs = roles.length;
  const remoteJobs = roles.filter((role) => role.mode === "Remote").length;
  const hybridJobs = roles.filter((role) => role.mode === "Hybrid").length;
  const seniorJobs = roles.filter((role) => role.level === "Senior" || role.level === "Lead" || role.level === "Head" || role.level === "Director").length;

  return (
    <section>
      <h1 className="page-title">Open Jobs and Projects</h1>
      <p className="page-subtitle">
        Roles for drone pilots, remote operators, monitoring teams, AI/ML engineers, data experts, automation specialists, project managers, and technical leaders.
      </p>
      <div className="cards compact-cards">
        <article className="card metric-card metric-info">
          <p className="hint-line">Open roles</p>
          <h3>{totalJobs}</h3>
        </article>
        <article className="card metric-card metric-good">
          <p className="hint-line">Remote roles</p>
          <h3>{remoteJobs}</h3>
        </article>
        <article className="card metric-card metric-info">
          <p className="hint-line">Hybrid roles</p>
          <h3>{hybridJobs}</h3>
        </article>
        <article className="card metric-card metric-warn">
          <p className="hint-line">Senior/Lead roles</p>
          <h3>{seniorJobs}</h3>
        </article>
      </div>

      <article className="card role-profile-card">
        <details className="clean-collapse" open>
          <summary>How to move from search to offer</summary>
          <ol className="legal-list">
            <li>Choose target role families and preferred work mode.</li>
            <li>Shortlist roles and open full role profile for skills/indicators.</li>
            <li>Prepare profile, resume and key portfolio links.</li>
            <li>Apply and track status in Messages and Dashboard.</li>
          </ol>
        </details>
      </article>

      <article className="card role-profile-card">
        <details className="clean-collapse">
          <summary>Project tracks you can join</summary>
          <div className="chips">
            <span className="chip">UAV Inspection Rollouts</span>
            <span className="chip">Teleoperation Control Centers</span>
            <span className="chip">Robotics Fleet Reliability</span>
            <span className="chip">AI Copilot and Agent Pipelines</span>
            <span className="chip">Data Platform and Governance</span>
            <span className="chip">Automation and Process Optimization</span>
          </div>
        </details>
      </article>
      <div className="row">
        <Link href="/search" className="btn solid">Search jobs</Link>
        <Link href="/profile" className="btn ghost">Prepare profile</Link>
        <Link href="/messages" className="btn ghost">Open messages</Link>
      </div>
      <RoleCatalog roles={roles} />
    </section>
  );
}
