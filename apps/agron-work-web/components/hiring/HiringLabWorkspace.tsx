"use client";

import { useEffect, useMemo, useState } from "react";
import { allDomains, allLevels, allModes } from "../../lib/roles";

type Scorecard = {
  id: string;
  roleTitle: string;
  domain: string;
  level: string;
  competencies: { name: string; weight: number }[];
  screenerQuestions: string[];
  createdAt: string;
};

type Job = {
  id: string;
  title: string;
  domain: string;
  level: string;
  mode: "Remote" | "Hybrid" | "On-site";
  location: string;
  salaryMin: number;
  salaryMax: number;
  employmentType: string;
  description: string;
  screenerQuestions: string[];
  scamRiskScore: number;
  scamFlags: string[];
  benchmarkMin: number;
  benchmarkMax: number;
  status: "draft" | "published";
  createdAt: string;
};

type Invite = {
  id: string;
  jobPostId: string;
  candidateEmail: string;
  status: string;
  introSlot: string;
  note: string;
  createdAt: string;
};

const sections = [
  "Structured Hiring",
  "Screener Questions",
  "Compensation",
  "Invite to Apply",
  "Anti-Scam",
  "AI Explainability"
] as const;

type Section = (typeof sections)[number];

export function HiringLabWorkspace() {
  const [section, setSection] = useState<Section>("Structured Hiring");
  const [status, setStatus] = useState<string | null>(null);
  const [scorecards, setScorecards] = useState<Scorecard[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);

  const [roleTitle, setRoleTitle] = useState("Senior Robotics Integration Engineer");
  const [domain, setDomain] = useState<string>("Robotics");
  const [level, setLevel] = useState<string>("Senior");
  const [mode, setMode] = useState<"Remote" | "Hybrid" | "On-site">("Hybrid");
  const [location, setLocation] = useState("United States");
  const [salaryMin, setSalaryMin] = useState(90000);
  const [salaryMax, setSalaryMax] = useState(160000);
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [description, setDescription] = useState("Lead production robotics integration, reliability, and mission-critical deployment.");
  const [screenerInput, setScreenerInput] = useState("Do you have production robotics deployment experience?\nCan you support incident response on critical systems?");

  const [bench, setBench] = useState<{ min: number; max: number } | null>(null);
  const [risk, setRisk] = useState<{ score: number; verdict: string; flags: string[] } | null>(null);

  const [inviteJobId, setInviteJobId] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSlot, setInviteSlot] = useState("");
  const [inviteNote, setInviteNote] = useState("15-minute intro call to align role expectations and next steps.");

  const [assessJobId, setAssessJobId] = useState("");
  const [assessScorecardId, setAssessScorecardId] = useState("");
  const [assessEmail, setAssessEmail] = useState("");
  const [assessBreakdown, setAssessBreakdown] = useState("Technical depth|30|4\nExecution reliability|25|4\nCommunication|20|3\nOwnership|25|5");
  const [assessmentResult, setAssessmentResult] = useState<{ totalScore: number; recommendation: string } | null>(null);

  async function loadAll() {
    const [scoreResp, jobsResp, inviteResp] = await Promise.all([
      fetch("/api/hiring/scorecards"),
      fetch("/api/hiring/jobs"),
      fetch("/api/hiring/invites")
    ]);
    if (scoreResp.ok) setScorecards((await scoreResp.json()).scorecards ?? []);
    if (jobsResp.ok) setJobs((await jobsResp.json()).jobs ?? []);
    if (inviteResp.ok) setInvites((await inviteResp.json()).invites ?? []);
  }

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!inviteJobId && jobs[0]) setInviteJobId(jobs[0].id);
    if (!assessJobId && jobs[0]) setAssessJobId(jobs[0].id);
    if (!assessScorecardId && scorecards[0]) setAssessScorecardId(scorecards[0].id);
  }, [jobs, scorecards, inviteJobId, assessJobId, assessScorecardId]);

  const screenerQuestions = useMemo(
    () => screenerInput.split("\n").map((item) => item.trim()).filter(Boolean),
    [screenerInput]
  );

  return (
    <section className="hiring-lab">
      {status ? <p className="status-ok">{status}</p> : null}
      <div className="admin-shell">
        <aside className="admin-sidebar card">
          <h3>Hiring Lab</h3>
          <div className="admin-nav-list">
            {sections.map((item) => (
              <button key={item} type="button" className={section === item ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setSection(item)}>
                {item}
              </button>
            ))}
          </div>
        </aside>

        <div className="admin-main">
          {section === "Structured Hiring" ? (
            <article className="card">
              <h3>Scorecard Templates</h3>
              <div className="step-grid">
                <label className="field"><span>Role title</span><input className="input" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} /></label>
                <label className="field"><span>Domain</span><select value={domain} onChange={(e) => setDomain(e.target.value)}>{allDomains.map((d) => <option key={d} value={d}>{d}</option>)}</select></label>
                <label className="field"><span>Level</span><select value={level} onChange={(e) => setLevel(e.target.value)}>{allLevels.map((l) => <option key={l} value={l}>{l}</option>)}</select></label>
              </div>
              <div className="row">
                <button
                  type="button"
                  className="btn solid"
                  onClick={async () => {
                    const res = await fetch("/api/hiring/scorecards", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ roleTitle, domain, level, screenerQuestions })
                    });
                    setStatus(res.ok ? "Scorecard template created." : "Unable to create scorecard.");
                    await loadAll();
                  }}
                >
                  Create Scorecard
                </button>
              </div>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Role</th><th>Domain</th><th>Level</th><th>Competencies</th><th>Screener</th></tr></thead>
                  <tbody>
                    {scorecards.slice(0, 8).map((item) => (
                      <tr key={item.id}>
                        <td>{item.roleTitle}</td>
                        <td>{item.domain}</td>
                        <td>{item.level}</td>
                        <td>{item.competencies.map((c) => `${c.name} (${c.weight})`).join(", ")}</td>
                        <td>{item.screenerQuestions.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ) : null}

          {section === "Screener Questions" ? (
            <article className="card">
              <h3>Knockout / Screener Questions Builder</h3>
              <label className="field">
                <span>Questions (one per line)</span>
                <textarea className="input area" value={screenerInput} onChange={(e) => setScreenerInput(e.target.value)} />
              </label>
              <ul className="legal-list">
                {screenerQuestions.map((q) => <li key={q}>{q}</li>)}
              </ul>
            </article>
          ) : null}

          {section === "Compensation" ? (
            <article className="card">
              <h3>Salary Benchmark and Transparency</h3>
              <div className="step-grid">
                <label className="field"><span>Domain</span><select value={domain} onChange={(e) => setDomain(e.target.value)}>{allDomains.map((d) => <option key={d}>{d}</option>)}</select></label>
                <label className="field"><span>Level</span><select value={level} onChange={(e) => setLevel(e.target.value)}>{allLevels.map((l) => <option key={l}>{l}</option>)}</select></label>
                <label className="field"><span>Mode</span><select value={mode} onChange={(e) => setMode(e.target.value as "Remote" | "Hybrid" | "On-site")}>{allModes.map((m) => <option key={m}>{m}</option>)}</select></label>
              </div>
              <div className="row">
                <button
                  type="button"
                  className="btn solid"
                  onClick={async () => {
                    const res = await fetch(`/api/hiring/benchmarks?domain=${encodeURIComponent(domain)}&level=${encodeURIComponent(level)}&mode=${encodeURIComponent(mode)}`);
                    if (!res.ok) return setStatus("Unable to load benchmark.");
                    const data = await res.json();
                    setBench(data.benchmark ?? null);
                    setSalaryMin(data.benchmark?.min ?? salaryMin);
                    setSalaryMax(data.benchmark?.max ?? salaryMax);
                    setStatus("Benchmark loaded.");
                  }}
                >
                  Load Benchmark
                </button>
              </div>
              {bench ? <p className="ok-line">Suggested range: ${bench.min.toLocaleString()} - ${bench.max.toLocaleString()}</p> : null}
            </article>
          ) : null}

          {section === "Invite to Apply" ? (
            <article className="card">
              <h3>Invite to Apply + Intro Slot</h3>
              <div className="step-grid">
                <label className="field"><span>Job</span><select value={inviteJobId} onChange={(e) => setInviteJobId(e.target.value)}>{jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}</select></label>
                <label className="field"><span>Candidate email</span><input className="input" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} /></label>
                <label className="field"><span>Intro slot</span><input className="input" value={inviteSlot} onChange={(e) => setInviteSlot(e.target.value)} placeholder="2026-02-20 14:00 UTC" /></label>
                <label className="field"><span>Note</span><textarea className="input area" value={inviteNote} onChange={(e) => setInviteNote(e.target.value)} /></label>
              </div>
              <div className="row">
                <button
                  type="button"
                  className="btn solid"
                  onClick={async () => {
                    const res = await fetch("/api/hiring/invites", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ jobPostId: inviteJobId, candidateEmail: inviteEmail, introSlot: inviteSlot, note: inviteNote })
                    });
                    setStatus(res.ok ? "Invite sent." : "Unable to send invite.");
                    if (res.ok) setInviteEmail("");
                    await loadAll();
                  }}
                >
                  Send Invite
                </button>
              </div>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Email</th><th>Status</th><th>Intro Slot</th><th>Date</th></tr></thead>
                  <tbody>
                    {invites.slice(0, 10).map((invite) => (
                      <tr key={invite.id}>
                        <td>{invite.candidateEmail}</td>
                        <td>{invite.status}</td>
                        <td>{invite.introSlot}</td>
                        <td>{new Date(invite.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ) : null}

          {section === "Anti-Scam" ? (
            <article className="card">
              <h3>Scam Risk Scanner</h3>
              <label className="field">
                <span>Job description text</span>
                <textarea className="input area" value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
              <div className="row">
                <button
                  type="button"
                  className="btn solid"
                  onClick={async () => {
                    const res = await fetch("/api/hiring/scam-check", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ text: description })
                    });
                    if (!res.ok) return setStatus("Unable to run scam scan.");
                    const data = await res.json();
                    setRisk(data.risk ?? null);
                    setStatus("Scam scan complete.");
                  }}
                >
                  Run Scam Scan
                </button>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={async () => {
                    const res = await fetch("/api/hiring/jobs", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        title: roleTitle,
                        domain,
                        level,
                        mode,
                        location,
                        salaryMin,
                        salaryMax,
                        employmentType,
                        description,
                        screenerQuestions
                      })
                    });
                    setStatus(res.ok ? "Job draft created with risk + benchmark checks." : "Unable to create job draft.");
                    await loadAll();
                  }}
                >
                  Create Safe Job Draft
                </button>
              </div>
              {risk ? (
                <div className="summary-box">
                  <p><strong>Risk score:</strong> {risk.score} ({risk.verdict})</p>
                  <ul className="legal-list">{risk.flags.map((flag) => <li key={flag}>{flag}</li>)}</ul>
                </div>
              ) : null}
              <h4>Draft Jobs</h4>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Title</th><th>Domain</th><th>Salary</th><th>Risk</th><th>Flags</th></tr></thead>
                  <tbody>
                    {jobs.slice(0, 10).map((job) => (
                      <tr key={job.id}>
                        <td>{job.title}</td>
                        <td>{job.domain}</td>
                        <td>${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</td>
                        <td>{job.scamRiskScore}</td>
                        <td>{job.scamFlags.join(", ") || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ) : null}

          {section === "AI Explainability" ? (
            <article className="card">
              <h3>Explainable Decision Notes (Hiring)</h3>
              <p className="page-subtitle">
                Keep objective notes on why candidate was selected or rejected to ensure transparent and auditable decisions.
              </p>
              <div className="step-grid">
                <label className="field"><span>Job</span><select value={assessJobId} onChange={(e) => setAssessJobId(e.target.value)}>{jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}</select></label>
                <label className="field"><span>Scorecard</span><select value={assessScorecardId} onChange={(e) => setAssessScorecardId(e.target.value)}>{scorecards.map((s) => <option key={s.id} value={s.id}>{s.roleTitle}</option>)}</select></label>
                <label className="field"><span>Candidate email</span><input className="input" value={assessEmail} onChange={(e) => setAssessEmail(e.target.value)} /></label>
                <label className="field"><span>Breakdown: competency|weight|score(1-5)</span><textarea className="input area" value={assessBreakdown} onChange={(e) => setAssessBreakdown(e.target.value)} /></label>
              </div>
              <div className="row">
                <button
                  type="button"
                  className="btn solid"
                  onClick={async () => {
                    const breakdown = assessBreakdown
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line) => {
                        const [competency, weight, score] = line.split("|");
                        return { competency, weight: Number(weight), score: Number(score) };
                      });
                    const res = await fetch("/api/hiring/assessment", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        jobPostId: assessJobId,
                        scorecardId: assessScorecardId,
                        candidateEmail: assessEmail,
                        breakdown
                      })
                    });
                    if (!res.ok) return setStatus("Unable to save assessment.");
                    const data = await res.json();
                    setAssessmentResult({
                      totalScore: data.assessment?.totalScore ?? 0,
                      recommendation: data.assessment?.recommendation ?? "hold"
                    });
                    setStatus("Assessment saved.");
                  }}
                >
                  Save Assessment
                </button>
              </div>
              {assessmentResult ? (
                <p className="ok-line">
                  Total score: {assessmentResult.totalScore}% · Recommendation: {assessmentResult.recommendation}
                </p>
              ) : null}
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}

