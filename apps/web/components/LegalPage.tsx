"use client";

import { useTranslation } from "./AppProviders";

type LegalKey = "terms" | "privacy" | "cookies" | "disclaimer" | "accessibility" | "refund";

export function LegalPage({ legalKey }: { legalKey: LegalKey }) {
  const t = useTranslation();
  const page = t.legalPages[legalKey];

  return (
    <section>
      <span className="page-kicker">Compliance and Governance</span>
      <h1 className="page-title">{page.title}</h1>
      <div className="title-accent-line" />
      <article className="card">
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    </section>
  );
}
