import Link from "next/link";
import { domainInfo } from "../../lib/roles";

const additional = [
  "Each domain includes junior to director-level roles",
  "Domain-specific templates and search filters",
  "Skill-oriented profile matching",
  "Operational, analytical, and leadership tracks"
];

export default function DomainsPage() {
  const domains = Object.entries(domainInfo);

  return (
    <section>
      <h1 className="page-title">Domain Sections</h1>
      <p className="page-subtitle">
        Specialized sections for drone operations, remote control, monitoring, robotics, AI/ML, data/IT, automation, field service, and management roles.
      </p>
      <div className="cards compact-cards">
        {domains.map(([slug, domain]) => (
          <details className="card clean-collapse" key={slug}>
            <summary>{domain.title}</summary>
            <p>{domain.description}</p>
            <div className="row">
              <Link className="btn ghost" href={`/domains/${slug}`}>Open section</Link>
            </div>
          </details>
        ))}
      </div>
      <article className="card role-profile-card">
        <details className="clean-collapse">
          <summary>How Domains Are Structured</summary>
          <ul className="legal-list">
            {additional.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </article>
    </section>
  );
}
