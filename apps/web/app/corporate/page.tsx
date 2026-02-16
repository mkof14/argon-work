"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSettings } from "../../components/AppProviders";
import { trackEvent } from "../../lib/analytics";

export default function CorporatePage() {
  const { locale, localizePath } = useAppSettings();
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    company: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    teamSize: "",
    useCase: "",
    timeline: "",
    message: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    website: ""
  });

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("Submitting...");
    trackEvent("form_start", { form: "corporate_inquiry", page: "corporate", locale });

    const response = await fetch("/api/corporate-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale, sourcePage: "corporate", ...form })
    });

    if (response.ok) {
      setStatus("Request submitted.");
      trackEvent("form_submit", { form: "corporate_inquiry", page: "corporate", locale, status: "success" });
      return;
    }

    setStatus("Submission failed.");
    trackEvent("form_submit", { form: "corporate_inquiry", page: "corporate", locale, status: "error" });
  }

  return (
    <section>
      <span className="page-kicker">Corporate / Government</span>
      <h1 className="page-title">Corporate / Government</h1>
      <div className="title-accent-line" />

      <div className="grid">
        <article className="card">
          <h3>Agriculture Drone Operations Track</h3>
          <p>Field operations training with compliance and repeatable execution standards.</p>
          <h4>Outcomes</h4>
          <ul className="about-list">
            <li>Structured field mission planning</li>
            <li>Perimeter safety discipline</li>
            <li>Workflow standardization</li>
            <li>Data delivery structure</li>
            <li>Equipment lifecycle management</li>
          </ul>
          <h4>Modules</h4>
          <ul className="about-list">
            <li>Field Assessment Protocol</li>
            <li>Airspace Risk Review</li>
            <li>Mission Route Discipline</li>
            <li>Battery Rotation and Logistics</li>
            <li>Reporting Standards</li>
          </ul>
          <div className="cta-row">
            <Link className="btn btn-primary" href="#corporate-form">Request a Training Proposal</Link>
            <Link className="btn btn-secondary" href={localizePath("/contact")}>Talk to Sales</Link>
          </div>
        </article>
        <article className="card">
          <h3>Infrastructure and Inspection Track</h3>
          <p>Inspection-focused route control, camera discipline, and reporting workflow.</p>
          <h4>Outcomes</h4>
          <ul className="about-list">
            <li>Repeatable inspection routes</li>
            <li>Camera stability discipline</li>
            <li>Documentation workflow</li>
            <li>Risk zone awareness</li>
          </ul>
          <h4>Modules</h4>
          <ul className="about-list">
            <li>Structure Assessment Planning</li>
            <li>Vertical Asset Inspection</li>
            <li>Distance and Clearance Control</li>
            <li>Client Reporting Standards</li>
          </ul>
          <div className="cta-row">
            <Link className="btn btn-primary" href="#corporate-form">Request Proposal</Link>
            <Link className="btn btn-secondary" href="#corporate-form">See Training Outline</Link>
          </div>
        </article>
        <article className="card">
          <h3>Public Safety and Emergency Response Track</h3>
          <p>Civilian emergency response support with mapping discipline and coordinated execution.</p>
          <h4>Outcomes</h4>
          <ul className="about-list">
            <li>Structured search pattern execution</li>
            <li>Incident mapping fundamentals</li>
            <li>Coordination discipline</li>
            <li>Risk perimeter awareness</li>
          </ul>
          <div className="cta-row">
            <Link className="btn btn-primary" href="#corporate-form">Request Proposal</Link>
          </div>
        </article>
        <article className="card">
          <h3>Corporate Training Package</h3>
          <p>Multi-seat training with standardized team capability development.</p>
          <h4>Includes</h4>
          <ul className="about-list">
            <li>Multi-seat licensing</li>
            <li>Team performance dashboard</li>
            <li>Instructor-led workshops</li>
            <li>Standardized evaluation</li>
            <li>Compliance documentation</li>
          </ul>
          <div className="cta-row">
            <Link className="btn btn-primary" href="#corporate-form">Request Corporate Proposal</Link>
            <Link className="btn btn-secondary" href={localizePath("/contact")}>Book a Discovery Call</Link>
          </div>
        </article>
        <article className="card">
          <h3>Enterprise Simulator Lab</h3>
          <p>Coming soon: dedicated simulator lab deployment for enterprise teams with local administration.</p>
          <div className="cta-row">
            <Link className="btn btn-secondary" href="#corporate-form">Request Enterprise Lab Brief</Link>
          </div>
        </article>
        <article className="card">
          <h3>Case Studies</h3>
          <p>Case studies and deployment summaries are available during the proposal stage.</p>
        </article>
      </div>

      <article className="card about-card" id="corporate-form">
        <h3>Request Training Proposal</h3>
        <form className="simple-form" onSubmit={submit}>
          <input className="input" placeholder="Company" required value={form.company} onChange={(e) => update("company", e.target.value)} />
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => update("name", e.target.value)} />
          <input className="input" placeholder="Role" required value={form.role} onChange={(e) => update("role", e.target.value)} />
          <input className="input" type="email" placeholder="Email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
          <input className="input" placeholder="Phone (optional)" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          <input className="input" placeholder="Team size" value={form.teamSize} onChange={(e) => update("teamSize", e.target.value)} />
          <input className="input" placeholder="Primary use case" value={form.useCase} onChange={(e) => update("useCase", e.target.value)} />
          <input className="input" placeholder="Timeline" value={form.timeline} onChange={(e) => update("timeline", e.target.value)} />
          <textarea className="input" placeholder="Training goals" value={form.message} onChange={(e) => update("message", e.target.value)} />
          <input className="input" style={{ display: "none" }} value={form.utmSource} onChange={(e) => update("utmSource", e.target.value)} />
          <input className="input" style={{ display: "none" }} value={form.utmMedium} onChange={(e) => update("utmMedium", e.target.value)} />
          <input className="input" style={{ display: "none" }} value={form.utmCampaign} onChange={(e) => update("utmCampaign", e.target.value)} />
          <input className="input" style={{ display: "none" }} tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} />
          <button className="btn btn-primary" type="submit">Submit Proposal Request</button>
        </form>
        {status ? <p className="page-lead">{status}</p> : null}
      </article>

      <article className="card about-card">
        <h3>Corporate Training Track Structure</h3>
        <ol className="about-list">
          <li>Phase 1: Part 107 certification</li>
          <li>Phase 2: Simulator certification</li>
          <li>Phase 3: Industry-specific training</li>
          <li>Phase 4: Annual compliance audit</li>
        </ol>
        <h4>Corporate Deliverables</h4>
        <ul className="about-list">
          <li>Completion certificates</li>
          <li>Compliance report</li>
          <li>Skill assessment summary</li>
          <li>Training analytics export</li>
        </ul>
      </article>
    </section>
  );
}
