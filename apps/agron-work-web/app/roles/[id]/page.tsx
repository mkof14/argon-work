import Link from "next/link";
import { notFound } from "next/navigation";
import { domainToSlug, roles } from "../../../lib/roles";

export function generateStaticParams() {
  return roles.map((role) => ({ id: role.id }));
}

export default function RoleProfilePage({ params }: { params: { id: string } }) {
  const role = roles.find((item) => item.id === params.id);

  if (!role) {
    notFound();
  }

  const domainSlug = domainToSlug[role.domain];

  return (
    <section>
      <p className="kicker">Role Profile</p>
      <h1 className="page-title">{role.title}</h1>
      <p className="page-subtitle">{role.domain} · {role.level} · {role.mode}</p>

      <article className="card role-profile-card">
        <h3>Mission focus</h3>
        <p>{role.summary}</p>
      </article>

      <article className="card role-profile-card">
        <h3>Key skills</h3>
        <div className="chips">
          {role.tags.map((tag) => (
            <span className="chip" key={tag}>{tag}</span>
          ))}
        </div>
      </article>

      <article className="card role-profile-card">
        <h3>Core responsibilities</h3>
        <ul className="role-list">
          <li>Deliver quality outcomes against timeline, budget, and SLA targets.</li>
          <li>Collaborate with operations, engineering, and analytics teams.</li>
          <li>Maintain safety, compliance, and execution standards.</li>
        </ul>
      </article>

      <div className="row">
        <button type="button" className="btn solid">Apply to this role</button>
        <Link href={`/domains/${domainSlug}`} className="btn ghost">Open domain</Link>
        <Link href="/specialties" className="btn ghost">Back to catalog</Link>
      </div>
    </section>
  );
}
