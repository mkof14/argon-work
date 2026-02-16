"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSettings } from "../../components/AppProviders";
import { trackEvent } from "../../lib/analytics";
import { getProgramsPack } from "../../content/programs-pack";

export default function Part107Page() {
  const { locale, localizePath } = useAppSettings();
  const pack = getProgramsPack(locale).part107;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function submitWaitlist(event: React.FormEvent) {
    event.preventDefault();
    setStatus("Submitting...");
    trackEvent("form_start", { form: "waitlist", page: "part-107", locale });

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale, email, platform: "web", interest: "part-107", sourcePage: "part-107", website: "" })
    });

    if (response.ok) {
      setStatus("You’re in. We’ll email you when access opens.");
      trackEvent("form_submit", { form: "waitlist", page: "part-107", locale, status: "success" });
      return;
    }

    setStatus("Submission failed.");
    trackEvent("form_submit", { form: "waitlist", page: "part-107", locale, status: "error" });
  }

  return (
    <section>
      <span className="page-kicker">Part 107 Certification Program</span>
      <h1 className="page-title">{pack.title}</h1>
      <div className="title-accent-line" />

      <article className="card about-card">
        <p>{pack.subtitle}</p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="#part107-enroll" onClick={() => trackEvent("cta_click", { page: "part-107", cta: "start_part_107", locale })}>
            Start Part 107 Training
          </Link>
          <Link className="btn btn-secondary" href={localizePath("/diagnostic")} onClick={() => trackEvent("cta_click", { page: "part-107", cta: "free_diagnostic", locale })}>
            Take Diagnostic Assessment
          </Link>
        </div>
      </article>

      <div className="grid">
        <article className="card">
          <h3>Who This Is For</h3>
          <ul className="about-list">
            <li>Individuals entering commercial drone operations</li>
            <li>Hobby pilots transitioning to commercial use</li>
            <li>Agriculture and inspection operators</li>
            <li>Construction and infrastructure professionals</li>
            <li>Corporate teams requiring FAA compliance</li>
          </ul>
        </article>
        <article className="card">
          <h3>Outcomes</h3>
          <ul className="about-list">
            {pack.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h3>What&apos;s Included</h3>
          <ul className="about-list">
            <li>Structured video modules</li>
            <li>Sectional chart interpretation drills</li>
            <li>Full question bank</li>
            <li>Unlimited mock exams</li>
            <li>Weak-area performance analytics</li>
            <li>Study plan generator</li>
            <li>Regulatory updates module</li>
            <li>Recurrent training pathway (24-month compliance support)</li>
          </ul>
        </article>
      </div>

      <article className="card about-card">
        <h3>Curriculum</h3>
        <ol className="about-list">
          <li>Regulatory Foundation: FAA intro, Part 107 legal structure, remote pilot responsibilities, certification pathway</li>
          <li>Airspace System: classes A-G, controlled vs uncontrolled, special use airspace, LAANC overview</li>
          <li>Sectional Charts Deep Dive: symbols, airport markings, restricted areas, map interpretation drills</li>
          <li>Weather and Aviation Reports: METAR, TAF, weather hazards, wind impact</li>
          <li>Aircraft Performance: weight and balance, load factors, density altitude concept</li>
          <li>Emergency Procedures: lost link, low battery, weather deterioration, decision hierarchy</li>
          <li>Operations Rules: operations over people, night operations, visual line of sight, waivers</li>
          <li>Risk Management: pre-flight checklist, hazard identification, crew resource management</li>
          <li>Final Exam Preparation: full practice exams, time management, readiness threshold evaluation</li>
        </ol>
        <p className="page-lead">Total modules: 9. Estimated duration: 30-40 hours.</p>
      </article>

      <div className="grid" id="part107-assessment">
        <article className="card">
          <h3>Assessment Model</h3>
          <ul className="about-list">
            <li>Diagnostic baseline test</li>
          <li>Section-based testing</li>
          <li>Full mock exam simulations</li>
          <li>Readiness scoring threshold</li>
        </ul>
      </article>
        <article className="card">
          <h3>Packages</h3>
          <ul className="about-list">
            {pack.pricing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h3>FAQ</h3>
          <ul className="about-list">
            <li>How long does preparation take?</li>
            <li>Is prior flight experience required?</li>
            <li>What score is needed to pass?</li>
            <li>How does recurrent training work?</li>
            <li>Is this course FAA-approved?</li>
          </ul>
        </article>
      </div>

      <article className="card about-card" id="part107-enroll">
        <h3>Enroll (Waitlist)</h3>
        <p className="page-lead">
          Compliance note: No pass guarantees are provided. Training is aligned with FAA standards and built around safe operations.
        </p>
        <form className="simple-form" onSubmit={submitWaitlist}>
          <input className="input" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn btn-primary" type="submit">Join waitlist</button>
          <Link href={localizePath("/contact")} className="btn btn-secondary">Contact</Link>
        </form>
        {status ? <p className="page-lead">{status}</p> : null}
      </article>
    </section>
  );
}
