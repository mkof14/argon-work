"use client";

import { useEffect, useMemo, useState } from "react";
import { allDomains, allModes, roles } from "../../lib/roles";

type AiConfig = {
  userId: string;
  applyMode: "preview" | "auto";
  dailyLimit: number;
  minMatchScore: number;
  workModes: ("Remote" | "Hybrid" | "On-site")[];
  domains: string[];
  excludedKeywords: string[];
  titleTargets: string[];
  onboardingCompleted: boolean;
  updatedAt: string;
};

type MatchPayload = {
  role: { id: string; title: string; domain: string };
  score: number;
  matchedTerms: string[];
  missingTerms: string[];
  reason: string;
};

type AiApplication = {
  id: string;
  roleId: string;
  roleTitle: string;
  roleDomain: string;
  mode: "preview" | "auto";
  status: "draft_preview" | "submitted" | "rejected" | "interview" | "offer" | "hired";
  companyName: string;
  matchScore: number;
  reason: string;
  createdAt: string;
};

type AiEvent = {
  id: string;
  action: string;
  details: string;
  createdAt: string;
};

export function AiCareerCopilot() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [config, setConfig] = useState<AiConfig | null>(null);
  const [applications, setApplications] = useState<AiApplication[]>([]);
  const [kpis, setKpis] = useState({
    total: 0,
    drafts: 0,
    submitted: 0,
    interviews: 0,
    offers: 0,
    hired: 0,
    rejected: 0,
    avgMatch: 0,
    interviewRate: 0,
    offerRate: 0,
    hireRate: 0
  });
  const [events, setEvents] = useState<AiEvent[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState(roles[0]?.id ?? "");
  const [match, setMatch] = useState<MatchPayload | null>(null);
  const [previewOnly, setPreviewOnly] = useState(true);

  const [companyName, setCompanyName] = useState("AGRON Partner Company");
  const [highlight, setHighlight] = useState("I delivered AI-assisted remote operations with measurable reliability and speed improvements.");
  const [letter, setLetter] = useState("");
  const [interview, setInterview] = useState<{ questions: string[]; checklist: string[] } | null>(null);

  const onboardingStep = useMemo(() => {
    if (!config) return 1;
    let step = 1;
    if (config.workModes.length > 0 && config.domains.length > 0) step = 2;
    if (config.minMatchScore >= 40 && config.dailyLimit > 0) step = 3;
    if (applications.length > 0) step = 4;
    if (kpis.submitted > 0 || kpis.interviews > 0 || kpis.offers > 0) step = 5;
    return step;
  }, [config, applications.length, kpis.submitted, kpis.interviews, kpis.offers]);

  async function loadData() {
    setLoading(true);
    const [configResp, appResp, dashboardResp] = await Promise.all([
      fetch("/api/ai/config"),
      fetch("/api/ai/applications"),
      fetch("/api/ai/dashboard")
    ]);
    if (configResp.ok) {
      const data = await configResp.json();
      setConfig(data.config);
    }
    if (appResp.ok) {
      const data = await appResp.json();
      setApplications(data.applications ?? []);
    }
    if (dashboardResp.ok) {
      const data = await dashboardResp.json();
      setKpis(data.kpis ?? kpis);
      setEvents(data.events ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function runMatch(roleId: string) {
    const resp = await fetch(`/api/ai/match?roleId=${encodeURIComponent(roleId)}`);
    if (!resp.ok) return;
    const data = await resp.json();
    setMatch(data.match ?? null);
  }

  async function runInterview(roleId: string) {
    const resp = await fetch(`/api/ai/interview?roleId=${encodeURIComponent(roleId)}`);
    if (!resp.ok) return;
    const data = await resp.json();
    setInterview({ questions: data.questions ?? [], checklist: data.checklist ?? [] });
  }

  async function generateLetter() {
    const resp = await fetch("/api/ai/cover-letter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleId: selectedRoleId, companyName, highlight })
    });
    if (!resp.ok) {
      setStatus("Unable to generate cover letter.");
      return;
    }
    const data = await resp.json();
    setLetter(data.letter ?? "");
    setMatch(data.match ?? null);
    setStatus("Cover letter generated.");
  }

  async function saveConfig() {
    if (!config) return;
    const resp = await fetch("/api/ai/config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config)
    });
    if (!resp.ok) {
      setStatus("Unable to save AI config.");
      return;
    }
    const data = await resp.json();
    setConfig(data.config ?? config);
    setStatus("AI config saved.");
    await loadData();
  }

  async function runAutoApply(mode: "preview" | "auto") {
    const resp = await fetch("/api/ai/auto-apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode })
    });
    if (!resp.ok) {
      setStatus("Auto-apply run failed.");
      return;
    }
    const data = await resp.json();
    setStatus(`Auto-apply run complete. Created ${data.created} applications.`);
    await loadData();
  }

  async function updateApplication(applicationId: string, action: "approve" | "reject" | "mark_interview" | "mark_offer" | "mark_hired") {
    const resp = await fetch("/api/ai/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId, action })
    });
    if (!resp.ok) {
      setStatus("Unable to update application stage.");
      return;
    }
    setStatus("Application stage updated.");
    await loadData();
  }

  if (loading) {
    return <p className="page-subtitle">Loading AI workspace...</p>;
  }

  if (!config) {
    return <p className="error-line">AI configuration is unavailable.</p>;
  }

  return (
    <section>
      {status ? <p className="status-ok">{status}</p> : null}
      <article className="card role-profile-card">
        <h3>AI Onboarding</h3>
        <div className="step-meta">
          <strong>Step {onboardingStep} of 5</strong>
          <span>Profile → Preferences → Match Rules → Apply Flow → Funnel Analytics</span>
        </div>
        <div className="progress-track"><span className="progress-bar" style={{ width: `${Math.round((onboardingStep / 5) * 100)}%` }} /></div>
      </article>

      <div className="cards">
        <article className="card metric-card metric-info">
          <p className="hint-line">Avg Match Score</p>
          <h3>{kpis.avgMatch}%</h3>
          <p className="hint-line">Across all AI-tracked applications.</p>
        </article>
        <article className="card metric-card metric-good">
          <p className="hint-line">Submitted</p>
          <h3>{kpis.submitted}</h3>
          <p className="hint-line">Total submitted from AI pipeline.</p>
        </article>
        <article className="card metric-card metric-warn">
          <p className="hint-line">Interviews / Offers</p>
          <h3>{kpis.interviews} / {kpis.offers}</h3>
          <p className="hint-line">Interview rate {kpis.interviewRate}% · Offer rate {kpis.offerRate}%</p>
        </article>
      </div>

      <div className="ai-tools-grid">
        <article className="card ai-tool-card">
          <h3>AI Auto-Apply Control</h3>
          <p className="page-subtitle">Set mode, threshold, and safety filters before launch.</p>
          <label className="field">
            <span>Apply mode</span>
            <select value={config.applyMode} onChange={(event) => setConfig({ ...config, applyMode: event.target.value as "preview" | "auto" })}>
              <option value="preview">Preview (manual approve)</option>
              <option value="auto">Auto (direct submit)</option>
            </select>
          </label>
          <label className="field">
            <span>Daily limit</span>
            <input className="input" type="number" min={1} max={100} value={config.dailyLimit} onChange={(event) => setConfig({ ...config, dailyLimit: Number(event.target.value || 1) })} />
          </label>
          <label className="field">
            <span>Minimum match score (%)</span>
            <input className="input" type="number" min={40} max={100} value={config.minMatchScore} onChange={(event) => setConfig({ ...config, minMatchScore: Number(event.target.value || 40) })} />
          </label>
          <label className="field">
            <span>Exclude keywords (comma separated)</span>
            <input
              className="input"
              value={config.excludedKeywords.join(", ")}
              onChange={(event) => setConfig({ ...config, excludedKeywords: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) })}
            />
          </label>
          <div className="check-grid">
            {allModes.map((mode) => (
              <label key={mode} className="check-item">
                <input
                  type="checkbox"
                  checked={config.workModes.includes(mode)}
                  onChange={() => {
                    const next = config.workModes.includes(mode) ? config.workModes.filter((item) => item !== mode) : [...config.workModes, mode];
                    setConfig({ ...config, workModes: next.length ? next : [...allModes] });
                  }}
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>
          <div className="check-grid">
            {allDomains.map((domain) => (
              <label key={domain} className="check-item">
                <input
                  type="checkbox"
                  checked={config.domains.includes(domain)}
                  onChange={() => {
                    const next = config.domains.includes(domain) ? config.domains.filter((item) => item !== domain) : [...config.domains, domain];
                    setConfig({ ...config, domains: next.length ? next : [...allDomains] });
                  }}
                />
                <span>{domain}</span>
              </label>
            ))}
          </div>
          <div className="row">
            <button type="button" className="btn ghost" onClick={saveConfig}>Save Config</button>
            <button type="button" className="btn solid" onClick={() => runAutoApply(previewOnly ? "preview" : "auto")}>
              Run {previewOnly ? "Preview" : "Auto"} Apply
            </button>
            <label className="check-item">
              <input type="checkbox" checked={previewOnly} onChange={() => setPreviewOnly((v) => !v)} />
              <span>Run in Preview mode</span>
            </label>
          </div>
        </article>

        <article className="card ai-tool-card">
          <h3>AI Resume Match Lab</h3>
          <p className="page-subtitle">Check why a role matches and which keywords are missing.</p>
          <label className="field">
            <span>Target role</span>
            <select value={selectedRoleId} onChange={(event) => setSelectedRoleId(event.target.value)}>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.title} · {role.domain}</option>
              ))}
            </select>
          </label>
          <div className="row">
            <button type="button" className="btn ghost" onClick={() => runMatch(selectedRoleId)}>Run Match</button>
            <button type="button" className="btn ghost" onClick={() => runInterview(selectedRoleId)}>Interview Prep</button>
          </div>
          {match ? (
            <div className="summary-box">
              <p><strong>Score:</strong> {match.score}%</p>
              <p><strong>Reason:</strong> {match.reason}</p>
              <p><strong>Matched:</strong> {match.matchedTerms.join(", ") || "-"}</p>
              <p><strong>Missing:</strong> {match.missingTerms.join(", ") || "-"}</p>
            </div>
          ) : (
            <p className="hint-line">Run match to get role-fit explanation.</p>
          )}
          {interview ? (
            <div className="summary-box">
              <p><strong>Interview questions</strong></p>
              <ul className="legal-list">
                {interview.questions.map((question) => <li key={question}>{question}</li>)}
              </ul>
              <p><strong>Preparation checklist</strong></p>
              <ul className="legal-list">
                {interview.checklist.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ) : null}
        </article>

        <article className="card ai-tool-card">
          <h3>Cover Letter Generator</h3>
          <p className="page-subtitle">Generate and copy a role-specific letter before submission.</p>
          <label className="field">
            <span>Company</span>
            <input className="input" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
          </label>
          <label className="field">
            <span>Your highlight</span>
            <textarea className="input area" value={highlight} onChange={(event) => setHighlight(event.target.value)} />
          </label>
          <div className="row">
            <button type="button" className="btn ghost" onClick={generateLetter}>Generate Letter</button>
            <button
              type="button"
              className="btn solid"
              onClick={async () => {
                await navigator.clipboard.writeText(letter);
                setStatus("Cover letter copied.");
              }}
              disabled={!letter}
            >
              Copy
            </button>
          </div>
          <div className="summary-box">
            <pre className="ai-pre">{letter || "Generate a letter to preview content."}</pre>
          </div>
        </article>

        <article className="card ai-tool-card">
          <h3>Application Queue and Funnel</h3>
          <p className="page-subtitle">Preview approvals, stage updates, and conversion performance.</p>
          <div className="check-item">
            <strong>Total:</strong>&nbsp;{kpis.total} · <strong>Drafts:</strong>&nbsp;{kpis.drafts} · <strong>Hired:</strong>&nbsp;{kpis.hired}
          </div>
          <div className="message-list">
            {applications.slice(0, 10).map((item) => (
              <article key={item.id} className="message-item inbound">
                <p><strong>{item.roleTitle}</strong> · {item.roleDomain}</p>
                <p className="hint-line">{item.status} · {item.matchScore}% · {new Date(item.createdAt).toLocaleString()}</p>
                <p className="hint-line">{item.reason}</p>
                <div className="row compact">
                  {item.status === "draft_preview" ? (
                    <>
                      <button type="button" className="btn solid" onClick={() => updateApplication(item.id, "approve")}>Approve</button>
                      <button type="button" className="btn ghost" onClick={() => updateApplication(item.id, "reject")}>Reject</button>
                    </>
                  ) : null}
                  <button type="button" className="btn ghost" onClick={() => updateApplication(item.id, "mark_interview")}>Interview</button>
                  <button type="button" className="btn ghost" onClick={() => updateApplication(item.id, "mark_offer")}>Offer</button>
                  <button type="button" className="btn ghost" onClick={() => updateApplication(item.id, "mark_hired")}>Hired</button>
                </div>
              </article>
            ))}
          </div>
          <h4>AI Action Log</h4>
          <div className="message-list">
            {events.slice(0, 8).map((event) => (
              <article key={event.id} className="message-item">
                <p><strong>{event.action}</strong></p>
                <p>{event.details}</p>
                <p className="hint-line">{new Date(event.createdAt).toLocaleString()}</p>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
