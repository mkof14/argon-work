type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalPageProps = {
  title: string;
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ title, effectiveDate, intro, sections }: LegalPageProps) {
  return (
    <section className="legal-page">
      <p className="kicker">Legal</p>
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">Effective date: {effectiveDate}</p>

      <article className="card legal-card">
        <p>{intro}</p>
      </article>

      {sections.map((section, index) => (
        <article className="card legal-card" key={section.heading}>
          <details className="clean-collapse" open={index === 0}>
            <summary>{section.heading}</summary>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul className="legal-list">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </details>
        </article>
      ))}
    </section>
  );
}
