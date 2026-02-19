import Link from "next/link";

const boostSteps = [
  {
    title: "Step 1: Define Goal and Filters",
    points: [
      "Choose target roles, salary floor, and work mode.",
      "Set domains: drone ops, robotics, AI/ML, data, automation.",
      "Save focused search presets for faster daily workflow."
    ]
  },
  {
    title: "Step 2: Role-Fit and ATS Readiness",
    points: [
      "Run role-fit scoring with explainable factors.",
      "Check ATS keywords and missing skill evidence.",
      "Generate resume variant per priority vacancy."
    ]
  },
  {
    title: "Step 3: AI Copilot Assist",
    points: [
      "Enable preview mode for safe assisted applications.",
      "Set guardrails: minimum score and daily limits.",
      "Review generated cover letter and answers before submit."
    ]
  },
  {
    title: "Step 4: Application Hub Control",
    points: [
      "Track all applications by stage and last activity.",
      "Set follow-up reminders and messaging cadence.",
      "Analyze conversion: apply -> interview -> offer."
    ]
  }
] as const;

const bestPractices = [
  "Apply in batches to high-fit roles, not random volume.",
  "Use measurable achievements in resume bullets.",
  "Keep one resume baseline plus role-specific versions.",
  "Reply to employer messages within 24 hours.",
  "Review weekly conversion and remove low-yield flows."
] as const;

export default function ApplicationBoostPage() {
  return (
    <section>
      <p className="kicker">Application Boost</p>
      <h1 className="page-title">Application Boost with AI Copilot and ATS Optimization</h1>
      <p className="page-subtitle">
        Practical workflow to increase interview conversion while keeping full user control over every application action.
      </p>

      <article className="card role-profile-card">
        <details className="clean-collapse" open>
          <summary>What is Application Boost?</summary>
          <p>
            Application Boost is a structured process for better outcomes: smarter targeting, ATS-ready resume versions,
            controlled AI assistance, and clean tracking in one Application Hub.
          </p>
          <div className="row">
            <Link className="btn solid" href="/ai-tools">Open AI Tools</Link>
            <Link className="btn ghost" href="/search">Find Jobs</Link>
            <Link className="btn ghost" href="/learning-center">Open Learning Center</Link>
          </div>
        </details>
      </article>

      <div className="accordion-grid">
        {boostSteps.map((step, index) => (
          <article className="card" key={step.title}>
            <h3>{step.title}</h3>
            <details className="clean-collapse" open={index === 0}>
              <summary>Show actions</summary>
              <ol className="legal-list">
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ol>
            </details>
          </article>
        ))}
      </div>

      <article className="card role-profile-card">
        <h3>Best Practices</h3>
        <ul className="legal-list">
          {bestPractices.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="row">
          <Link className="btn ghost" href="/dashboard">Open Application Hub</Link>
          <Link className="btn ghost" href="/faq">Open FAQ</Link>
          <Link className="btn ghost" href="/support">Open Support</Link>
        </div>
      </article>
    </section>
  );
}
