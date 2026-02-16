"use client";

import Link from "next/link";
import { useAppSettings } from "../../components/AppProviders";
import { getProgramsPack } from "../../content/programs-pack";

export default function PricingPage() {
  const { localizePath, locale } = useAppSettings();
  const pack = getProgramsPack(locale);

  return (
    <section>
      <span className="page-kicker">Pricing Structure (MRR Model)</span>
      <h1 className="page-title">Pricing and Enrollment Paths</h1>
      <div className="title-accent-line" />

      <div className="grid">
        <article className="card">
          <h3>{pack.part107.title}</h3>
          <p>{pack.part107.subtitle}</p>
          <ul className="about-list">
            {pack.part107.pricing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="cta-row">
            <Link className="btn btn-primary" href={localizePath("/part-107")}>Start Part 107 Training</Link>
            <Link className="btn btn-secondary" href={localizePath("/diagnostic")}>Take Diagnostic Assessment</Link>
          </div>
        </article>

        <article className="card">
          <h3>{pack.flightSkills.title}</h3>
          <p>{pack.flightSkills.subtitle}</p>
          <ul className="about-list">
            {pack.flightSkills.pricing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="cta-row">
            <Link className="btn btn-primary" href={localizePath("/flight-skills")}>Start Skills Training</Link>
          </div>
        </article>

        <article className="card">
          <h3>{pack.simulator.title}</h3>
          <p>{pack.simulator.subtitle}</p>
          <ul className="about-list">
            {pack.simulator.pricing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="cta-row">
            <Link className="btn btn-primary" href={localizePath("/simulator")}>Join Early Access</Link>
            <Link className="btn btn-secondary" href={localizePath("/corporate")}>Enterprise Licensing</Link>
          </div>
        </article>
      </div>

      <article className="card about-card">
        <h3>Corporate Pricing</h3>
        <ul className="about-list">
          <li>10 seats — $4,500</li>
          <li>25 seats — $9,000</li>
          <li>50+ seats — Custom pricing</li>
        </ul>
        <p>Corporate packages include:</p>
        <ul className="about-list">
          <li>Annual simulator licensing</li>
          <li>Admin dashboard</li>
          <li>Compliance reporting</li>
        </ul>
        <div className="cta-row">
          <Link className="btn btn-primary" href={localizePath("/corporate")}>Request Corporate Proposal</Link>
        </div>
      </article>
    </section>
  );
}
