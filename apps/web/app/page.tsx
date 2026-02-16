"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAppSettings, useTranslation } from "../components/AppProviders";
import { trackEvent } from "../lib/analytics";
import { LeadForm } from "../components/LeadForm";

export default function HomePage() {
  const t = useTranslation();
  const { locale, localizePath } = useAppSettings();
  const [activeDetailId, setActiveDetailId] = useState<string>("part107");

  const detailMap = useMemo(
    () => ({
      part107: {
        title: "Part 107 Prep and Certification Tracks",
        text: "Structured FAA Part 107 preparation with progressive modules, exam simulations, compliance checklists, and instructor-reviewed readiness milestones."
      },
      sim24: {
        title: "24/7 Simulation Missions with AI Scoring",
        text: "Mission scenarios available at any time with automated scoring, error breakdowns, safety flags, and repeatable performance benchmarking."
      },
      aiReports: {
        title: "AI Agronomic Reports and Recommendations",
        text: "Field intelligence reports generated from mission outputs, including zone-level observations, risk indicators, and practical recommendation blocks."
      },
      b2bFlows: {
        title: "B2B Subscription and Enterprise Payment Flows",
        text: "Role-based billing control for teams, subscriptions for individual pilots, and enterprise-ready operational reporting with payment lifecycle tracking."
      },
      skillPath: {
        title: "Skill Tracking from Study to Paid Missions",
        text: "Competency progression tracked across coursework, simulation outcomes, and real mission readiness to shorten time-to-first-paid-assignment."
      },
      roleDash: {
        title: "Student, Instructor, and Organization Dashboards",
        text: "Dedicated interfaces for each role with KPI visibility, training status, mission assignments, approvals, and structured action workflows."
      }
    }),
    []
  );

  const orderedDetails = [
    "part107",
    "sim24",
    "aiReports",
    "b2bFlows",
    "skillPath",
    "roleDash"
  ] as const;

  const activeDetail = detailMap[activeDetailId as keyof typeof detailMap];

  useEffect(() => {
    let hit50 = false;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      if (!hit50 && pct >= 50) {
        hit50 = true;
        trackEvent("scroll_depth", { page: "home", depth: 50, locale });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [locale]);

  return (
    <section>
      <div className="hero">
        <div className="hero-drone-wrap" aria-hidden="true">
          <div className="drone-real-scene">
            <div className="drone-real-flight">
              <span className="drone-core-dot" />
              <span className="real-prop real-prop-fl" />
              <span className="real-prop real-prop-fr" />
              <span className="real-prop real-prop-rl" />
              <span className="real-prop real-prop-rr" />
            </div>
            <div className="drone-real-shadow" />
          </div>
        </div>
        <span className="badge">{t.home.badge}</span>
        <h1>{t.home.title}</h1>
        <p>{t.home.subtitle}</p>
        <div className="cta-row">
          <Link href={localizePath("/part-107")} className="btn btn-primary" onClick={() => trackEvent("cta_click", { page: "home", cta: "start_part_107", locale })}>
            Start Part 107
          </Link>
          <Link href={localizePath("/simulator")} className="btn btn-secondary" onClick={() => trackEvent("cta_click", { page: "home", cta: "try_simulator", locale })}>
            Try Simulator
          </Link>
          <Link href={localizePath("/corporate")} className="btn btn-secondary" onClick={() => trackEvent("cta_click", { page: "home", cta: "corporate_training", locale })}>
            Corporate Training
          </Link>
          <Link href={localizePath("/programs")} className="btn btn-secondary" onClick={() => trackEvent("cta_click", { page: "home", cta: "view_programs", locale })}>
            {t.home.ctaPrograms}
          </Link>
          <Link href={localizePath("/pricing")} className="btn btn-secondary" onClick={() => trackEvent("cta_click", { page: "home", cta: "open_pricing", locale })}>
            {t.home.ctaPricing}
          </Link>
          <Link href={localizePath("/diagnostic")} className="btn btn-secondary" onClick={() => trackEvent("cta_click", { page: "home", cta: "diagnostic_assessment", locale })}>
            Take Diagnostic Assessment
          </Link>
        </div>
        <p className="page-lead">Start with a short diagnostic test - we build your study plan from your weak areas.</p>
        <LeadForm sourcePage="home" className="lead-capture" />

        <div className="stats-strip">
          <div className="stat">
            <strong>107+</strong>
            <span>{t.home.features[0]}</span>
            <button className="btn btn-secondary stat-btn" onClick={() => setActiveDetailId("part107")}>
              Open full description
            </button>
          </div>
          <div className="stat">
            <strong>24/7</strong>
            <span>{t.home.features[1]}</span>
            <button className="btn btn-secondary stat-btn" onClick={() => setActiveDetailId("sim24")}>
              Open full description
            </button>
          </div>
          <div className="stat">
            <strong>AI</strong>
            <span>{t.home.features[2]}</span>
            <button className="btn btn-secondary stat-btn" onClick={() => setActiveDetailId("aiReports")}>
              Open full description
            </button>
          </div>
          <div className="stat">
            <strong>B2B</strong>
            <span>{t.home.features[3]}</span>
            <button className="btn btn-secondary stat-btn" onClick={() => setActiveDetailId("b2bFlows")}>
              Open full description
            </button>
          </div>
        </div>
      </div>

      <div className="grid">
        {t.home.features.map((item, index) => (
          <article className="card" key={item}>
            <p>{item}</p>
            <button
              className="btn btn-secondary"
              onClick={() => setActiveDetailId(orderedDetails[index] ?? "roleDash")}
            >
              View details
            </button>
          </article>
        ))}
      </div>

      <article className="card home-detail-panel">
        <h3>{activeDetail.title}</h3>
        <p>{activeDetail.text}</p>
      </article>

      <div className="home-image-bottom">
        <article className="card">
          <Image
            src="/brand/AGRON_Core_Model.webp"
            alt="AGRON Core Model"
            width={1536}
            height={1024}
            className="programs-hero-image"
          />
        </article>
      </div>
    </section>
  );
}
