import Link from "next/link";
import { allDomains, domainToSlug, roles } from "../lib/roles";

export function SpecialtiesAccordion() {
  return (
    <section className="accordion-grid">
      {allDomains.map((domain) => {
        const items = roles.filter((role) => role.domain === domain).slice(0, 8);
        const slug = domainToSlug[domain];

        return (
          <details key={domain} className="accordion card">
            <summary className="accordion-title">{domain}</summary>
            <div className="accordion-body">
              <ul className="legal-list">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link href={`/roles/${item.id}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
              <div className="row">
                <Link href={`/domains/${slug}`} className="btn ghost">Open domain</Link>
              </div>
            </div>
          </details>
        );
      })}
    </section>
  );
}
