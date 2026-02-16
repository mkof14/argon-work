"use client";

import { useTranslation } from "../../components/AppProviders";

export default function DashboardPage() {
  const t = useTranslation();

  return (
    <section>
      <span className="page-kicker">Operations Overview</span>
      <h1 className="page-title">{t.dashboard.title}</h1>
      <div className="title-accent-line" />
      <div className="stats-strip">
        <div className="stat">
          <strong>92%</strong>
          <span>{t.dashboard.cards[0]}</span>
        </div>
        <div className="stat">
          <strong>84%</strong>
          <span>{t.dashboard.cards[1]}</span>
        </div>
        <div className="stat">
          <strong>6</strong>
          <span>{t.dashboard.cards[2]}</span>
        </div>
        <div className="stat">
          <strong>0</strong>
          <span>{t.dashboard.title}</span>
        </div>
      </div>
      <div className="grid">
        {t.dashboard.cards.map((card) => (
          <article className="card" key={card}>
            {card}
          </article>
        ))}
        <article className="card">
          <h3>User Dashboard (Phase 2)</h3>
          <ul className="about-list">
            <li>Progress %</li>
            <li>Mock exam score trend</li>
            <li>Skill drill metrics</li>
            <li>Upgrade prompts</li>
          </ul>
        </article>
        <article className="card">
          <h3>Corporate Dashboard (Phase 2)</h3>
          <ul className="about-list">
            <li>Team completion rate</li>
            <li>Certification tracking</li>
            <li>Risk flag reporting</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
