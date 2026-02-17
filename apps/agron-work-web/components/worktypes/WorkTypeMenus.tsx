import Link from "next/link";
import { allDomains, domainToSlug, roles } from "../../lib/roles";

const employmentKinds = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"];

export function WorkTypeMenus() {
  return (
    <section>
      <h2 className="section-title">All Work Types (Dropdown Menus)</h2>
      <div className="worktype-grid">
        <details className="worktype-menu card" open>
          <summary>Employment Type</summary>
          <div className="worktype-body">
            {employmentKinds.map((type) => (
              <span key={type} className="chip">{type}</span>
            ))}
          </div>
        </details>

        {allDomains.map((domain) => {
          const slug = domainToSlug[domain];
          const domainRoles = roles.filter((role) => role.domain === domain).slice(0, 6);

          return (
            <details key={domain} className="worktype-menu card">
              <summary>{domain}</summary>
              <div className="worktype-body">
                <ul className="legal-list">
                  {domainRoles.map((role) => (
                    <li key={role.id}>
                      <Link href={`/roles/${role.id}`}>{role.title}</Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/domains/${slug}`} className="btn ghost">Open {domain}</Link>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
