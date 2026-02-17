import Link from "next/link";

const docs = [
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/cookies", label: "Cookie Policy" },
  { href: "/legal/acceptable-use", label: "Acceptable Use Policy" },
  { href: "/legal/ai-disclosure", label: "AI and Automation Disclosure" },
  { href: "/legal/refund-policy", label: "Payment and Refund Policy" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
  { href: "/legal/accessibility", label: "Accessibility Statement" }
];

export default function LegalIndexPage() {
  return (
    <section>
      <p className="kicker">Legal</p>
      <h1 className="page-title">Legal Center</h1>
      <p className="page-subtitle">
        Policy documents that govern use of AGRON Work for employers, specialists, and enterprise teams.
      </p>
      <div className="list">
        {docs.map((doc) => (
          <article key={doc.href} className="list-item">
            <h3>{doc.label}</h3>
            <div className="row">
              <Link href={doc.href} className="btn ghost">Open document</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
