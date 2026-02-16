"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSettings } from "../../components/AppProviders";
import { trackEvent } from "../../lib/analytics";
import { getProgramsPack } from "../../content/programs-pack";

export default function FlightSkillsPage() {
  const { locale, localizePath } = useAppSettings();
  const pack = getProgramsPack(locale).flightSkills;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("Submitting...");
    trackEvent("form_start", { form: "waitlist", page: "flight-skills", locale });

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale, email, platform: "web", interest: "flight-skills", sourcePage: "flight-skills", website: "" })
    });

    if (response.ok) {
      setStatus("You’re in. We’ll email you when access opens.");
      trackEvent("form_submit", { form: "waitlist", page: "flight-skills", locale, status: "success" });
      return;
    }

    setStatus("Submission failed.");
    trackEvent("form_submit", { form: "waitlist", page: "flight-skills", locale, status: "error" });
  }

  return (
    <section>
      <span className="page-kicker">Flight Skills Program</span>
      <h1 className="page-title">{pack.title}</h1>
      <div className="title-accent-line" />

      <article className="card about-card">
        <p>{pack.subtitle}</p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="#skills-enroll" onClick={() => trackEvent("cta_click", { page: "flight-skills", cta: "start_skills", locale })}>
            Start Skills Training
          </Link>
          <Link className="btn btn-secondary" href={localizePath("/simulator")} onClick={() => trackEvent("cta_click", { page: "flight-skills", cta: "sim_drills", locale })}>
            Try Simulator Drills
          </Link>
        </div>
      </article>

      <div className="grid">
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
            <li>Simulator-based skill drills</li>
            <li>Real-world checklist integration</li>
            <li>Performance scoring system</li>
            <li>Wind scenario variations</li>
            <li>Emergency simulation scenarios</li>
            <li>Flight planning worksheets</li>
            <li>Post-flight debrief structure</li>
          </ul>
        </article>
        <article className="card">
          <h3>Core Drills</h3>
          <ul className="about-list">
            <li>Hover box stabilization</li>
            <li>Altitude consistency drill</li>
            <li>Crosswind compensation</li>
            <li>Precision landing pad</li>
            <li>Battery management timing</li>
            <li>GPS-loss response simulation</li>
            <li>Return-to-home discipline</li>
          </ul>
        </article>
      </div>

      <article className="card about-card">
        <h3>Assessment</h3>
        <ul className="about-list">
          <li>Stability score</li>
          <li>Deviation tracking</li>
          <li>Mission completion time</li>
          <li>Safety violation counter</li>
          <li>Instructor review (Pro tier)</li>
        </ul>
      </article>

      <article className="card about-card">
        <h3>Flight Skills Course Structure</h3>
        <p className="page-lead">Total duration: 15-20 hours simulator + 5-10 hours field.</p>
        <ol className="about-list">
          <li>Stage 1 - Control Fundamentals: stick orientation, hover hold drill, basic altitude control</li>
          <li>Stage 2 - Precision Control: landing pad accuracy, route tracking, smooth throttle transitions</li>
          <li>Stage 3 - Wind Compensation: crosswind hover, drift correction, ATTI stabilization</li>
          <li>Stage 4 - Mission Execution: waypoint route, time constraint mission, battery return planning</li>
          <li>Stage 5 - Emergency Simulation: GPS failure, sudden wind gust, low battery recovery</li>
        </ol>
        <p className="page-lead">Completion requirement: stability score at or above threshold with zero critical safety violations.</p>
      </article>

      <article className="card about-card">
        <h3>{pack.pricingTitle}</h3>
        <ul className="about-list">
          {pack.pricing.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="card about-card" id="skills-enroll">
        <h3>Enroll (Waitlist)</h3>
        <form className="simple-form" onSubmit={submit}>
          <input className="input" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn btn-primary" type="submit">Join waitlist</button>
          <Link href={localizePath("/contact")} className="btn btn-secondary">Book a Skills Assessment</Link>
        </form>
        {status ? <p className="page-lead">{status}</p> : null}
      </article>
    </section>
  );
}
