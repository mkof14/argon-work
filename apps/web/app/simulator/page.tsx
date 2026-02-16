"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSettings } from "../../components/AppProviders";
import { trackEvent } from "../../lib/analytics";
import { getProgramsPack } from "../../content/programs-pack";

export default function SimulatorPage() {
  const { locale, localizePath } = useAppSettings();
  const pack = getProgramsPack(locale).simulator;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("Submitting...");
    trackEvent("form_start", { form: "waitlist", page: "simulator", locale });

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale, email, platform: "web", interest: "simulator", sourcePage: "simulator", website: "" })
    });

    if (response.ok) {
      setStatus("You’re in. We’ll email you when access opens.");
      trackEvent("form_submit", { form: "waitlist", page: "simulator", locale, status: "success" });
      return;
    }

    setStatus("Submission failed.");
    trackEvent("form_submit", { form: "waitlist", page: "simulator", locale, status: "error" });
  }

  return (
    <section>
      <span className="page-kicker">Simulator App</span>
      <h1 className="page-title">{pack.title}</h1>
      <div className="title-accent-line" />

      <article className="card about-card">
        <p>{pack.subtitle}</p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="#sim-waitlist" onClick={() => trackEvent("cta_click", { page: "simulator", cta: "early_access", locale })}>
            Join Early Access
          </Link>
          <Link className="btn btn-secondary" href={localizePath("/corporate")} onClick={() => trackEvent("cta_click", { page: "simulator", cta: "enterprise_licensing", locale })}>
            Enterprise Licensing
          </Link>
        </div>
      </article>

      <div className="grid">
        <article className="card">
          <h3>{pack.featuresTitle}</h3>
          <ul className="about-list">
            {pack.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h3>Scenario Library</h3>
          <ul className="about-list">
            <li>Agriculture field perimeter mapping</li>
            <li>Infrastructure inspection route</li>
            <li>Construction monitoring grid</li>
            <li>Emergency mapping simulation</li>
          </ul>
        </article>
        <article className="card">
          <h3>Analytics</h3>
          <ul className="about-list">
            <li>Stability index</li>
            <li>Control smoothness score</li>
            <li>Completion time</li>
            <li>Safety compliance score</li>
            <li>Trend history</li>
          </ul>
        </article>
      </div>

      <article className="card about-card">
        <h3>Tiers</h3>
        <ul className="about-list">
          {pack.pricing.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="card about-card">
        <h3>Simulator Physics Specification</h3>
        <p>
          Objective: build a structured training simulator that models stable quadcopter flight for skill development, not arcade gameplay.
        </p>
        <ul className="about-list">
          <li>Priorities: control discipline, stability tolerance, wind compensation, mission accuracy, safety rule compliance</li>
          <li>Drone type: standard quadcopter, 4 motors, fixed pitch propellers, GPS + ATTI modes</li>
          <li>Core variables: position (X/Y/Z), velocity (Vx/Vy/Vz), orientation (roll/pitch/yaw), angular velocity, throttle input</li>
        </ul>
      </article>

      <div className="grid">
        <article className="card">
          <h3>Control Input Model</h3>
          <ul className="about-list">
            <li>Inputs: throttle, yaw, pitch, roll</li>
            <li>Configurable deadzone</li>
            <li>Sensitivity curve: linear / exponential</li>
            <li>Smoothing filter</li>
          </ul>
        </article>
        <article className="card">
          <h3>Flight Modes</h3>
          <ul className="about-list">
            <li>GPS Stabilized: position hold, drift compensation, automatic braking</li>
            <li>ATTI: no position hold, wind drift active, pilot correction required</li>
            <li>Manual Advanced (future): reduced stabilization, higher sensitivity</li>
          </ul>
        </article>
        <article className="card">
          <h3>Wind System</h3>
          <ul className="about-list">
            <li>Speed: 0-25 mph</li>
            <li>Direction: 0-360 degrees</li>
            <li>Gust variability</li>
            <li>Training levels: 0-5 mph, 5-12 mph, 12-20 mph</li>
            <li>Horizontal wind vector applied to velocity (stronger effect in ATTI)</li>
          </ul>
        </article>
        <article className="card">
          <h3>Gravity, Thrust, Battery</h3>
          <ul className="about-list">
            <li>Gravity: -9.81 m/s2 equivalent (scaled)</li>
            <li>Lift proportional to throttle</li>
            <li>Hover threshold calibrated near 50-55% throttle</li>
            <li>Battery factors: capacity, drain rate, load multiplier</li>
            <li>Warnings: 25% low, 10% critical, optional forced descent mode</li>
          </ul>
        </article>
        <article className="card">
          <h3>Safety and Collision</h3>
          <ul className="about-list">
            <li>Geofence perimeter warning and violation logging</li>
            <li>Configurable altitude ceiling (default 400 ft equivalent)</li>
            <li>Collision objects: trees, towers, buildings, terrain elevation</li>
            <li>Collision handling: stop, score penalty, mission failure when severe</li>
          </ul>
        </article>
        <article className="card">
          <h3>Scoring and Analytics</h3>
          <ul className="about-list">
            <li>Stability score: drift variance, input smoothness, hover accuracy</li>
            <li>Precision score: landing deviation, waypoint accuracy</li>
            <li>Safety score: geofence/altitude/battery violations</li>
            <li>Completion time + composite performance index (weighted)</li>
            <li>Score sync endpoint: POST /api/simulator-score</li>
          </ul>
        </article>
      </div>

      <article className="card about-card" id="sim-waitlist">
        <h3>Join the waitlist for early access</h3>
        <form className="simple-form" onSubmit={submit}>
          <input className="input" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn btn-primary" type="submit">Join waitlist</button>
        </form>
        {status ? <p className="page-lead">{status}</p> : null}
      </article>
    </section>
  );
}
