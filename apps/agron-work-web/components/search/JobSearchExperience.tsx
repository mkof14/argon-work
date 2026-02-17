"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { roles } from "../../lib/roles";

type PostedFilter = "all" | "24h" | "7d";
type SortMode = "relevance" | "salary-desc" | "salary-asc" | "level";

function salaryFloor(level: string) {
  if (level === "Intern") return 25000;
  if (level === "Junior") return 65000;
  if (level === "Middle") return 80000;
  if (level === "Senior") return 120000;
  if (level === "Lead") return 140000;
  if (level === "Head" || level === "Director") return 165000;
  return 80000;
}

function levelRank(level: string) {
  const ranks: Record<string, number> = {
    Intern: 1,
    Junior: 2,
    Middle: 3,
    Senior: 4,
    Lead: 5,
    Head: 6,
    Director: 7
  };
  return ranks[level] ?? 0;
}

export function JobSearchExperience() {
  const router = useRouter();
  const params = useSearchParams();

  const [what, setWhat] = useState(params.get("what") ?? "");
  const [where, setWhere] = useState(params.get("where") ?? "Remote");
  const [posted, setPosted] = useState<PostedFilter>("all");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedEmployment, setSelectedEmployment] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("relevance");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = what.trim().toLowerCase();
    const base = roles.filter((role) => {
      const queryOk =
        q.length === 0 ||
        role.title.toLowerCase().includes(q) ||
        role.domain.toLowerCase().includes(q) ||
        role.tags.some((tag) => tag.toLowerCase().includes(q));

      const remoteOk = !remoteOnly || role.mode === "Remote" || role.mode === "Hybrid";
      const typeOk = selectedEmployment === "all" || role.tags.some((tag) => tag.toLowerCase().includes(selectedEmployment));
      const postedOk = posted === "all" || (posted === "24h" ? role.level !== "Intern" : role.level !== "Head");

      return queryOk && remoteOk && typeOk && postedOk;
    });
    const withSalary = base.map((role) => ({ ...role, salary: salaryFloor(role.level) }));

    if (sortMode === "salary-desc") return withSalary.sort((a, b) => b.salary - a.salary);
    if (sortMode === "salary-asc") return withSalary.sort((a, b) => a.salary - b.salary);
    if (sortMode === "level") return withSalary.sort((a, b) => levelRank(b.level) - levelRank(a.level));
    return withSalary;
  }, [what, remoteOnly, selectedEmployment, posted, sortMode]);

  const [activeId, setActiveId] = useState(filtered[0]?.id ?? null);
  const active = filtered.find((role) => role.id === activeId) ?? filtered[0] ?? null;

  function runSearch() {
    const next = new URLSearchParams();
    if (what.trim()) next.set("what", what.trim());
    if (where.trim()) next.set("where", where.trim());
    router.push(`/search?${next.toString()}`);
  }

  const currentStep = filtered.length === 0 ? 1 : active ? 2 : 1;
  const finalStep = active ? 3 : 2;
  const remoteCount = filtered.filter((role) => role.mode === "Remote" || role.mode === "Hybrid").length;
  const savedCount = savedIds.length;

  return (
    <section>
      <article className="card search-hero-indeed">
        <h1 className="page-title">Find jobs</h1>
        <p className="page-subtitle">Use the flow: search roles, review role details, then apply or save for later.</p>
        <div className="step-meta">
          <strong>Step {currentStep} of {finalStep}</strong>
          <span>Search → Review → Apply</span>
        </div>
        <div className="progress-track"><span className="progress-bar" style={{ width: `${Math.round((currentStep / finalStep) * 100)}%` }} /></div>
        <div className="indeed-search-bar">
          <label className="field search-field-wide">
            <span>What</span>
            <input
              className="input"
              value={what}
              onChange={(event) => setWhat(event.target.value)}
              placeholder="Job title, keywords, or company"
            />
          </label>
          <label className="field search-field-narrow">
            <span>Where</span>
            <input
              className="input"
              value={where}
              onChange={(event) => setWhere(event.target.value)}
              placeholder="City, state, zip, or remote"
            />
          </label>
          <button type="button" className="btn solid" onClick={runSearch}>Find jobs</button>
        </div>
        <details className="clean-collapse search-filters-collapse">
          <summary>More filters</summary>
          <div className="filter-row">
            <button type="button" className={posted === "24h" ? "filter-chip active" : "filter-chip"} onClick={() => setPosted(posted === "24h" ? "all" : "24h")}>Last 24 hours</button>
            <button type="button" className={posted === "7d" ? "filter-chip active" : "filter-chip"} onClick={() => setPosted(posted === "7d" ? "all" : "7d")}>Last 7 days</button>
            <button type="button" className={remoteOnly ? "filter-chip active" : "filter-chip"} onClick={() => setRemoteOnly((v) => !v)}>Remote/Hybrid</button>
            <select value={selectedEmployment} onChange={(event) => setSelectedEmployment(event.target.value)}>
              <option value="all">All employment types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="temporary">Temporary</option>
              <option value="internship">Internship</option>
            </select>
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
              <option value="relevance">Sort: Relevance</option>
              <option value="salary-desc">Sort: Salary high to low</option>
              <option value="salary-asc">Sort: Salary low to high</option>
              <option value="level">Sort: Seniority</option>
            </select>
          </div>
        </details>
        <div className="chips">
          <span className="chip">Matching roles: {filtered.length}</span>
          <span className="chip">Remote/Hybrid: {remoteCount}</span>
          <span className="chip">Saved: {savedCount}</span>
        </div>
      </article>

      <div className="results-layout">
        <div className="results-list">
          <p className="result-line">Jobs found: {filtered.length}</p>
          {filtered.map((role) => (
            <button
              type="button"
              key={role.id}
              className={active?.id === role.id ? "job-card active" : "job-card"}
              onClick={() => setActiveId(role.id)}
            >
              <h3>{role.title}</h3>
              <p>AGRON Work Partner Company</p>
              <p>{where || "United States"} · {role.mode}</p>
              <p>From ${salaryFloor(role.level).toLocaleString()} a year</p>
              <div className="chips">
                <span className="chip">{role.domain}</span>
                <span className="chip">{role.level}</span>
                {savedIds.includes(role.id) ? <span className="chip">Saved</span> : null}
              </div>
            </button>
          ))}
        </div>

        <aside className="card job-detail-panel">
          {active ? (
            <>
              <h2>{active.title}</h2>
              <p className="page-subtitle">AGRON Work Partner Company · {where || "United States"}</p>
              <div className="chips">
                <span className="chip">{active.mode}</span>
                <span className="chip">{active.domain}</span>
                <span className="chip">{active.level}</span>
              </div>
              <p>{active.summary}</p>
              <details className="clean-collapse">
                <summary>Key skills</summary>
                <ul className="legal-list">
                  {active.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </details>
              <details className="clean-collapse">
                <summary>Employment and indicators</summary>
                <ul className="legal-list">
                  <li>Full-time / Contract / Part-time options by employer</li>
                  <li>Salary baseline and skill-based growth path</li>
                  <li>Remote, hybrid, and on-site workflows</li>
                  <li>Verified onboarding and profile compliance</li>
                </ul>
              </details>
              <div className="row">
                <a className="btn solid" href="/auth/login?mode=register">Apply now</a>
                <a className="btn ghost" href={`/roles/${active.id}`}>Open full profile</a>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() =>
                    setSavedIds((prev) =>
                      prev.includes(active.id) ? prev.filter((id) => id !== active.id) : [...prev, active.id]
                    )
                  }
                >
                  {savedIds.includes(active.id) ? "Remove saved" : "Save role"}
                </button>
              </div>
            </>
          ) : (
            <p className="page-subtitle">No jobs match current filters.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
