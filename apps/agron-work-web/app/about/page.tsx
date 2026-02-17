const principles = [
  "Direct connection between employers and professionals",
  "Clear requirements, clear profiles, clear hiring status",
  "Fast onboarding with verification and profile quality",
  "Transparent analytics for decisions and growth"
];

const audiences = [
  { title: "For Employers", text: "Find and hire specialists with practical filters and verified data." },
  { title: "For Job Seekers", text: "Build one profile, one resume, and apply to relevant roles faster." },
  { title: "For Admin Teams", text: "Manage operations, rights, templates, and monitoring from one panel." }
];

export default function AboutPage() {
  return (
    <section>
      <p className="kicker">About</p>
      <h1 className="page-title">About AGRON Work</h1>
      <p className="page-subtitle">
        AGRON Work is a direct hiring platform for autonomous-era professions: drone pilots, robotics teams,
        AI/ML specialists, data experts, automation engineers, and project leaders.
      </p>

      <div className="cards">
        <article className="card">
          <h3>Mission</h3>
          <p>Connect employers and professionals directly, fast, and transparently.</p>
        </article>
        <article className="card">
          <h3>Approach</h3>
          <p>Simple hiring flows, strong search, verified profiles, and practical onboarding.</p>
        </article>
        <article className="card">
          <h3>Focus</h3>
          <p>Hi-tech jobs that power aerial, ground, and AI-driven services.</p>
        </article>
      </div>

      <article className="card role-profile-card">
        <details className="clean-collapse" open>
          <summary>Core Principles</summary>
          <ul className="legal-list">
            {principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </article>

      <div className="cards compact-cards">
        {audiences.map((item) => (
          <details className="card clean-collapse" key={item.title}>
            <summary>{item.title}</summary>
            <p>{item.text}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
