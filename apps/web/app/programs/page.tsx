"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useAppSettings } from "../../components/AppProviders";
import { trackEvent } from "../../lib/analytics";
import Link from "next/link";
import { getProgramsPack } from "../../content/programs-pack";

export default function ProgramsPage() {
  const { locale, localizePath } = useAppSettings();
  const pack = getProgramsPack(locale);

  useEffect(() => {
    let hit50 = false;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      if (!hit50 && pct >= 50) {
        hit50 = true;
        trackEvent("scroll_depth", { page: "programs", depth: 50, locale });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [locale]);

  return (
    <section>
      <span className="page-kicker">Programs</span>
      <h1 className="page-title">Professional training tracks for certification, flight skills, simulation, and operations.</h1>
      <div className="title-accent-line" />
      <div className="programs-hero-compact">
        <article className="card" style={{ marginBottom: 16 }}>
          <Image
            src="/brand/AGRON_Technical_Concept.webp"
            alt="AGRON technical concept"
            width={671}
            height={748}
            className="programs-hero-image"
            priority
          />
        </article>
      </div>
      <div className="stats-strip">
        <div className="stat">
          <strong>A</strong>
          <span>Part 107 Certification</span>
        </div>
        <div className="stat">
          <strong>B</strong>
          <span>Flight Skills Program</span>
        </div>
        <div className="stat">
          <strong>C</strong>
          <span>Simulator App</span>
        </div>
        <div className="stat">
          <strong>D-G</strong>
          <span>Industry and Corporate Tracks</span>
        </div>
      </div>
      <div className="grid">
        <article className="card">
          <h3>Part 107 Certification Program</h3>
          <p>{pack.part107.subtitle}</p>
          <div className="cta-row">
            <Link className="btn btn-primary" href={localizePath("/part-107")}>Start Part 107 Training</Link>
            <Link className="btn btn-secondary" href={localizePath("/diagnostic")}>Take Diagnostic Assessment</Link>
            <Link className="btn btn-secondary" href={localizePath("/part-107")}>View Course Syllabus</Link>
          </div>
        </article>
        <article className="card">
          <h3>Flight Skills Program</h3>
          <p>{pack.flightSkills.subtitle}</p>
          <div className="cta-row">
            <Link className="btn btn-primary" href={localizePath("/flight-skills")}>Start Flight Skills</Link>
            <Link className="btn btn-secondary" href={localizePath("/simulator")}>Try Simulator Drills</Link>
            <Link className="btn btn-secondary" href={localizePath("/contact")}>Book a Skills Assessment</Link>
          </div>
        </article>
        <article className="card">
          <h3>AGRON Simulator App</h3>
          <p>{pack.simulator.subtitle}</p>
          <div className="cta-row">
            <Link className="btn btn-primary" href={localizePath("/simulator")}>Join Simulator Waitlist</Link>
            <Link className="btn btn-secondary" href={localizePath("/corporate")}>Request Enterprise Access</Link>
          </div>
        </article>
        <article className="card">
          <h3>Agriculture Drone Operations Track</h3>
          <p>Field operations for agriculture: planning, safety perimeter, and repeatable workflows.</p>
          <div className="cta-row">
            <Link className="btn btn-primary" href={localizePath("/corporate")}>Request a Training Proposal</Link>
            <Link className="btn btn-secondary" href={localizePath("/contact")}>Talk to Sales</Link>
          </div>
        </article>
        <article className="card">
          <h3>Infrastructure and Inspection Track</h3>
          <p>Inspection-ready skills: route discipline, camera stability, and documentation workflow.</p>
          <div className="cta-row">
            <Link className="btn btn-primary" href={localizePath("/corporate")}>Request Proposal</Link>
            <Link className="btn btn-secondary" href={localizePath("/corporate")}>See Training Outline</Link>
          </div>
        </article>
        <article className="card">
          <h3>Public Safety and Emergency Response Track</h3>
          <p>Structured drone support for emergency response: mapping, search patterns, and coordination basics.</p>
          <div className="cta-row">
            <Link className="btn btn-primary" href={localizePath("/corporate")}>Request Proposal</Link>
          </div>
        </article>
        <article className="card">
          <h3>Corporate Training Package</h3>
          <p>Multi-seat training: Part 107 + skills + simulator dashboards for teams.</p>
          <div className="cta-row">
            <Link className="btn btn-primary" href={localizePath("/corporate")}>Request Corporate Proposal</Link>
            <Link className="btn btn-secondary" href={localizePath("/contact")}>Book a Discovery Call</Link>
          </div>
        </article>
      </div>

      <article className="card about-card">
        <h3>LMS + Simulator Technical Architecture</h3>
        <p><strong>Frontend:</strong> Next.js (App Router), next-intl, TailwindCSS, Stripe</p>
        <p><strong>Backend:</strong> Node API routes, Postgres, Prisma ORM</p>
        <p><strong>Storage:</strong> S3-compatible object storage for videos</p>
        <h4>Database Structure</h4>
        <ul className="about-list">
          <li>Users: id, email, passwordHash, locale, role, createdAt</li>
          <li>Enrollments: id, userId, programType, planType, status, createdAt</li>
          <li>Progress: id, userId, moduleId, completionPercent, score, updatedAt</li>
          <li>SimulatorScores: id, userId, scenario, stabilityScore, safetyScore, completionTime, createdAt</li>
          <li>CorporateAccounts: id, companyName, seatLimit, adminUserId</li>
        </ul>
        <h4>LMS Flow</h4>
        <ol className="about-list">
          <li>User registers</li>
          <li>Selects plan</li>
          <li>Stripe checkout</li>
          <li>Enrollment record created</li>
          <li>Dashboard unlocked</li>
          <li>Progress stored</li>
          <li>Certificate issued</li>
        </ol>
        <h4>Simulator Flow</h4>
        <ul className="about-list">
          <li>Phase 1: Web-based simulation (WebGL / Canvas)</li>
          <li>Phase 2: Mobile wrapper (React Native)</li>
          <li>Score sync endpoint: POST /api/simulator-score</li>
        </ul>
      </article>

      <article className="card about-card">
        <h3>Investor-Ready 3 Year Financial Model</h3>
        <h4>Year 1</h4>
        <ul className="about-list">
          <li>500 Part 107 students</li>
          <li>300 Simulator Pro subscriptions</li>
          <li>5 Corporate clients</li>
          <li>Revenue: $343,900</li>
          <li>Expenses: Development $120,000, Marketing $150,000, Operations $100,000</li>
          <li>EBITDA: Investment phase</li>
        </ul>
        <h4>Year 2</h4>
        <ul className="about-list">
          <li>1,500 students</li>
          <li>900 subscriptions</li>
          <li>15 Corporate clients</li>
          <li>Revenue: approximately $1,031,700</li>
          <li>Break-even to positive</li>
        </ul>
        <h4>Year 3</h4>
        <ul className="about-list">
          <li>3,500 students</li>
          <li>2,500 subscriptions</li>
          <li>40 Corporate clients</li>
          <li>Revenue: approximately $2,586,500</li>
          <li>Strong positive margin</li>
          <li>Valuation multiple: 4x-8x revenue</li>
          <li>Projected valuation: $10M-$20M range</li>
        </ul>
      </article>
    </section>
  );
}
