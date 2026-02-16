"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSettings } from "../../components/AppProviders";

type Answers = {
  certification: "yes" | "no";
  experience: "none" | "basic" | "advanced";
  sector: "agriculture" | "inspection" | "construction" | "public-safety" | "other";
  timeline: "urgent" | "30-60" | "60plus";
};

export default function DiagnosticPage() {
  const { localizePath } = useAppSettings();
  const [answers, setAnswers] = useState<Answers>({
    certification: "yes",
    experience: "none",
    sector: "other",
    timeline: "30-60"
  });

  const recommendation =
    answers.certification === "yes"
      ? "Start with Part 107 Certification Program"
      : answers.experience === "none"
        ? "Start with Flight Skills + Simulator"
        : "Start with Simulator + Industry Track";

  return (
    <section>
      <span className="page-kicker">Enrollment Funnel</span>
      <h1 className="page-title">Diagnostic Assessment</h1>
      <div className="title-accent-line" />

      <div className="stats-strip">
        <div className="stat"><strong>1</strong><span>Landing Page</span></div>
        <div className="stat"><strong>2</strong><span>Diagnostic Quiz</span></div>
        <div className="stat"><strong>3</strong><span>Plan Recommendation</span></div>
        <div className="stat"><strong>4-6</strong><span>Enrollment → Checkout → Dashboard</span></div>
      </div>

      <article className="card about-card">
        <h3>Diagnostic Quiz</h3>
        <form className="simple-form">
          <label>
            Do you need FAA certification?
            <select className="input" value={answers.certification} onChange={(e) => setAnswers((c) => ({ ...c, certification: e.target.value as Answers["certification"] }))}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label>
            Have you flown before?
            <select className="input" value={answers.experience} onChange={(e) => setAnswers((c) => ({ ...c, experience: e.target.value as Answers["experience"] }))}>
              <option value="none">No prior flight experience</option>
              <option value="basic">Basic experience</option>
              <option value="advanced">Advanced experience</option>
            </select>
          </label>
          <label>
            Industry sector?
            <select className="input" value={answers.sector} onChange={(e) => setAnswers((c) => ({ ...c, sector: e.target.value as Answers["sector"] }))}>
              <option value="agriculture">Agriculture</option>
              <option value="inspection">Inspection</option>
              <option value="construction">Construction</option>
              <option value="public-safety">Public Safety</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Timeline for certification?
            <select className="input" value={answers.timeline} onChange={(e) => setAnswers((c) => ({ ...c, timeline: e.target.value as Answers["timeline"] }))}>
              <option value="urgent">Urgent (0-30 days)</option>
              <option value="30-60">30-60 days</option>
              <option value="60plus">60+ days</option>
            </select>
          </label>
        </form>
      </article>

      <article className="card about-card">
        <h3>Plan Recommendation</h3>
        <p>{recommendation}</p>
        <div className="cta-row">
          <Link className="btn btn-primary" href={localizePath("/pricing")}>Enrollment Selection</Link>
          <Link className="btn btn-secondary" href={localizePath("/dashboard")}>Dashboard Access</Link>
        </div>
      </article>

      <article className="card about-card">
        <h3>Post-Purchase Email Flow</h3>
        <ul className="about-list">
          <li>Day 0 — Welcome + Login</li>
          <li>Day 2 — Study Plan</li>
          <li>Day 5 — Progress Reminder</li>
          <li>Day 10 — Skills Reinforcement</li>
          <li>Day 20 — Upgrade Offer</li>
          <li>Day 45 — Completion Push</li>
          <li>Month 18 — Recurrent Reminder</li>
        </ul>
      </article>
    </section>
  );
}
