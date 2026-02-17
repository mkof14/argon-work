import Link from "next/link";

const levels = [
  { name: "Intern", description: "Entry tracks with supervised delivery and skill bootstrapping." },
  { name: "Junior", description: "Execution-focused specialists with practical training and clear growth plans." },
  { name: "Middle", description: "Independent contributors delivering reliable outcomes and cross-team collaboration." },
  { name: "Senior", description: "Experts owning architecture, quality, optimization, and mentoring." },
  { name: "Lead", description: "Domain leaders driving standards, strategy, and execution velocity." },
  { name: "Head / Director", description: "Business and technical leaders scaling teams, programs, and operations." }
];

const tracks = [
  "Drone and BVLOS Pilots",
  "Remote Device and Fleet Operators",
  "Monitoring and Video Analytics Experts",
  "Robotics Engineers and Technicians",
  "AI/ML and Algorithm Engineers",
  "Data, Cloud, and Cybersecurity Specialists",
  "Automation and Control Systems Engineers",
  "Project, Product, and Program Managers",
  "Field Service and Technical Maintenance Teams"
];

const toolkit = [
  "Profile questionnaire",
  "Structured resume",
  "Skills and certifications",
  "My reviews and ratings",
  "Personal settings and alerts",
  "Direct messaging"
];

export default function TalentPage() {
  return (
    <section>
      <h1 className="page-title">Talent Network</h1>
      <p className="page-subtitle">
        Build a verified skill passport and join high-growth domains in autonomous services.
      </p>
      <article className="card role-profile-card">
        <details className="clean-collapse" open>
          <summary>Candidate Flow (Step-by-step)</summary>
          <ol className="legal-list">
            <li>Complete profile and upload resume with measurable outcomes.</li>
            <li>Select target tracks and preferred work mode.</li>
            <li>Apply to matching roles and track stages in real time.</li>
            <li>Use AI tools to improve interview and offer conversion.</li>
          </ol>
        </details>
      </article>

      <div className="chips">
        <span className="chip">Profile readiness target: 90%+</span>
        <span className="chip">Resume quality: impact + metrics + tools</span>
        <span className="chip">Weekly target: 10 focused applications</span>
      </div>

      <article className="card role-profile-card">
        <details className="clean-collapse" open>
          <summary>Levels</summary>
          <div className="list">
            {levels.map((level) => (
              <article key={level.name} className="list-item">
                <h3>{level.name}</h3>
                <p>{level.description}</p>
              </article>
            ))}
          </div>
        </details>
      </article>

      <article className="card role-profile-card">
        <details className="clean-collapse">
          <summary>Professional Tracks</summary>
          <div className="chips">
            {tracks.map((track) => (
              <span className="chip" key={track}>{track}</span>
            ))}
          </div>
        </details>
      </article>

      <article className="card role-profile-card">
        <details className="clean-collapse">
          <summary>Job Seeker Toolkit</summary>
          <ul className="legal-list">
            {toolkit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </article>

      <div className="row">
        <Link href="/specialties" className="btn solid">Open all specialties</Link>
        <Link href="/jobs" className="btn ghost">See active jobs</Link>
        <Link href="/profile" className="btn ghost">Open my profile</Link>
      </div>
    </section>
  );
}
