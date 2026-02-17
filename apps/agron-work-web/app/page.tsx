import Link from "next/link";
import { HomeSearch } from "../components/HomeSearch";

export default function HomePage() {
  return (
    <section>
      <article className="hero">
        <p className="kicker">AGRON Work</p>
        <h1>Who gives work and who is looking for work</h1>
        <p>
          One simple platform for direct connection between employers and professionals in drones, robotics, AI, data, and automation.
        </p>
        <div className="hero-sides">
          <article className="card hero-side-card">
            <h3>I am hiring</h3>
            <p>Post jobs, set requirements, and connect with verified specialists.</p>
            <div className="row">
              <Link className="btn solid" href="/employers">For employers</Link>
            </div>
          </article>
          <article className="card hero-side-card">
            <h3>I am looking for work</h3>
            <p>Search jobs, filter by work type, and apply with one profile.</p>
            <div className="row">
              <Link className="btn solid" href="/search">Find jobs</Link>
            </div>
          </article>
        </div>
      </article>

      <HomeSearch />
      <article className="card role-profile-card">
        <details className="clean-collapse" open>
          <summary>How AGRON Work works</summary>
          <ol className="legal-list">
            <li>Create account and complete profile and resume.</li>
            <li>Use Find Jobs with filters, indicators, and role-level details.</li>
            <li>Apply directly without intermediaries and track every stage.</li>
            <li>Use AI tools to improve match score and interview readiness.</li>
          </ol>
        </details>
      </article>
      <article className="card role-profile-card">
        <details className="clean-collapse">
          <summary>What you can do today</summary>
          <div className="chips">
            <span className="chip">Search across drone/robotics/AI domains</span>
            <span className="chip">Save and compare target roles</span>
            <span className="chip">Build verified profile and resume</span>
            <span className="chip">Message employers directly</span>
            <span className="chip">Track applications and statuses</span>
            <span className="chip">Use AI match and cover-letter tools</span>
          </div>
        </details>
      </article>
      <div className="row">
        <Link className="btn ghost" href="/specialties">Browse work types</Link>
        <Link className="btn ghost" href="/ai-tools">Open AI tools</Link>
        <Link className="btn ghost" href="/jobs">Open jobs and projects</Link>
      </div>
    </section>
  );
}
