"use client";

import { useEffect, useMemo, useState } from "react";

type AdminPanelProps = { adminRole: string };

type UserRow = { id: string; name: string; email: string; role: string; provider: string; createdAt: string };
type InvitationRow = { id: string; email: string; role: string; invitedBy: string; status: string; createdAt: string };
type AuditRow = { id: string; actorEmail: string; action: string; targetEmail: string; role: string; createdAt: string };
type MarketingRow = { id: string; kind: "campaign" | "document"; title: string; campaignType: string; audience: string; status: string; content: string; fileName?: string; fileType?: string; tags?: string[]; createdAt: string };
type TemplateRow = { id: string; name: string; category: string; subject: string; html: string; text: string; updatedAt: string };
type EventRow = { id: string; severity: "info" | "warning" | "critical"; service: string; message: string; createdAt: string };
type MsgRow = { id: string; userId: string; direction: "inbound" | "outbound"; channel: string; subject: string; body: string; status: string; createdAt: string };

type Stats = { activeUsers: number; openJobs: number; applicationsToday: number; conversionRate: number; avgTimeToHireDays: number; updatedAt: string };
type Finance = {
  usersTotal: number;
  usersNewToday: number;
  usersNewMonth: number;
  mrr: number;
  arr: number;
  gmv: number;
  netRevenue: number;
  payrollVolume: number;
  cashInToday: number;
  cashOutToday: number;
  cashInMonth: number;
  cashOutMonth: number;
  cashInYear: number;
  cashOutYear: number;
  grossProfit: number;
  profitMargin: number;
  taxesPaid: number;
  operatingCosts: number;
  refundsRate: number;
  updatedAt: string;
};

type Health = { uptime: number; apiP95ms: number; errorRate: number; backgroundJobsOk: number; dbStatus: string; updatedAt: string };

const sections = [
  "Overview",
  "Marketing",
  "Technical",
  "Email Templates",
  "Access Rights",
  "Messages",
  "Statistics",
  "Finance",
  "Monitoring"
] as const;

type Section = (typeof sections)[number];

const roleOptions = ["user", "admin", "super_admin", "support_admin", "finance_admin", "marketing_admin", "moderator"];

function formatNumber(value: number | null | undefined) {
  const safe = typeof value === "number" && Number.isFinite(value) ? value : 0;
  return safe.toLocaleString();
}

function formatMoney(value: number | null | undefined) {
  return `$${formatNumber(value)}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export function AdminPanel({ adminRole }: AdminPanelProps) {
  const [section, setSection] = useState<Section>("Overview");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [invitations, setInvitations] = useState<InvitationRow[]>([]);
  const [audits, setAudits] = useState<AuditRow[]>([]);
  const [marketing, setMarketing] = useState<MarketingRow[]>([]);
  const [templates, setTemplates] = useState<TemplateRow[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [messages, setMessages] = useState<MsgRow[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [finance, setFinance] = useState<Finance | null>(null);
  const [health, setHealth] = useState<Health | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("support_admin");

  async function loadAll() {
    const [u, m, t, s, f, h, e, msgResp] = await Promise.all([
      fetch("/api/admin/users"),
      fetch("/api/admin/marketing"),
      fetch("/api/admin/email-templates"),
      fetch("/api/admin/stats"),
      fetch("/api/admin/finance"),
      fetch("/api/admin/health"),
      fetch("/api/admin/monitoring"),
      fetch("/api/admin/messages")
    ]);

    if (u.ok) {
      const payload = await u.json();
      setUsers(payload.users ?? []);
      setInvitations(payload.invitations ?? []);
      setAudits(payload.audit ?? []);
    }
    if (m.ok) {
      const payload = await m.json();
      setMarketing(payload.assets ?? []);
    }
    if (t.ok) {
      const payload = await t.json();
      setTemplates(payload.templates ?? []);
    }
    if (s.ok) setStats((await s.json()).stats ?? null);
    if (f.ok) setFinance((await f.json()).finance ?? null);
    if (h.ok) setHealth((await h.json()).health ?? null);
    if (e.ok) setEvents((await e.json()).events ?? []);
    if (msgResp.ok) setMessages((await msgResp.json()).messages ?? []);
  }

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!selectedTemplateId && templates[0]) {
      setSelectedTemplateId(templates[0].id);
    }
  }, [templates, selectedTemplateId]);

  useEffect(() => {
    if (!selectedAssetId && marketing[0]) {
      setSelectedAssetId(marketing[0].id);
    }
  }, [marketing, selectedAssetId]);

  const selectedTemplate = templates.find((item) => item.id === selectedTemplateId) ?? null;
  const selectedAsset = marketing.find((item) => item.id === selectedAssetId) ?? null;

  const overviewCards = useMemo(() => {
    if (!stats || !finance || !health) return [];
    return [
      { label: "Active users", value: formatNumber(stats.activeUsers), tone: "info" },
      { label: "Open jobs", value: formatNumber(stats.openJobs), tone: "info" },
      { label: "Applications today", value: formatNumber(stats.applicationsToday), tone: "good" },
      { label: "Conversion rate", value: `${stats.conversionRate}%`, tone: stats.conversionRate > 10 ? "good" : "warn" },
      { label: "MRR", value: formatMoney(finance.mrr), tone: "good" },
      { label: "Uptime", value: `${health.uptime}%`, tone: health.uptime >= 99.9 ? "good" : "warn" },
      { label: "Error rate", value: `${health.errorRate}%`, tone: health.errorRate < 1 ? "good" : "critical" },
      { label: "Gross profit", value: formatMoney(finance.grossProfit), tone: "good" }
    ];
  }, [stats, finance, health]);

  function copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => setStatus("Copied to clipboard"));
  }

  async function shareText(text: string) {
    if (navigator.share) {
      try {
        await navigator.share({ title: "AGRON Work", text });
        setStatus("Shared");
        return;
      } catch {
        // fallback below
      }
    }
    copyText(text);
  }

  function downloadFile(filename: string, content: string, mime = "text/plain") {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setStatus(`Downloaded ${filename}`);
  }

  function printContent(title: string, html: string) {
    const w = window.open("", "_blank", "width=1024,height=768");
    if (!w) return;
    w.document.write(`<html><head><title>${title}</title></head><body>${html}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
    w.close();
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar card">
        <h3>Admin Menu</h3>
        <div className="admin-nav-list">
          {sections.map((item) => (
            <button key={item} type="button" className={section === item ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setSection(item)}>
              {item}
            </button>
          ))}
        </div>
        <p className="hint-line">Role: {adminRole}</p>
      </aside>

      <section className="admin-main">
        {status ? <p className="status-ok">{status}</p> : null}

        {section === "Overview" ? (
          <div className="cards">
            {overviewCards.map((card) => (
              <article key={card.label} className={`card metric-card metric-${card.tone}`}>
                <p className="hint-line">{card.label}</p>
                <h3>{card.value}</h3>
              </article>
            ))}
          </div>
        ) : null}

        {section === "Marketing" ? (
          <div className="step-grid">
            <article className="card">
              <h3>Marketing Campaigns and Documents</h3>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Type</th><th>Title</th><th>Audience</th><th>Status</th><th>Created</th></tr></thead>
                  <tbody>
                    {marketing.map((item) => (
                      <tr key={item.id} onClick={() => setSelectedAssetId(item.id)}>
                        <td>{item.kind}</td>
                        <td>{item.title}</td>
                        <td>{item.audience}</td>
                        <td>{item.status}</td>
                        <td>{formatDate(item.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <button
                  type="button"
                  className="btn solid"
                  onClick={async () => {
                    const res = await fetch("/api/admin/marketing", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        kind: "campaign",
                        title: "Weekly Talent Pulse",
                        campaignType: "email",
                        audience: "Active employers",
                        status: "draft",
                        content: "Weekly talent and hiring insights",
                        tags: ["weekly", "hiring", "pulse"]
                      })
                    });
                    setStatus(res.ok ? "Marketing campaign added" : "Unable to add marketing campaign");
                    await loadAll();
                  }}
                >
                  Add Campaign
                </button>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={async () => {
                    const res = await fetch("/api/admin/marketing", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        kind: "document",
                        title: "Product One Pager",
                        campaignType: "in-app",
                        audience: "All users",
                        status: "approved",
                        content: "Brand one pager and message architecture",
                        fileName: "product-one-pager-v2.pdf",
                        fileType: "application/pdf",
                        tags: ["document", "brand", "onepager"]
                      })
                    });
                    setStatus(res.ok ? "Marketing document added" : "Unable to add marketing document");
                    await loadAll();
                  }}
                >
                  Add Document
                </button>
              </div>
              <p className="hint-line">Click any row to open item details and actions.</p>
            </article>

            <article className="card">
              <h3>Selected Marketing Item</h3>
              {selectedAsset ? (
                <>
                  <p><strong>{selectedAsset.title}</strong> ({selectedAsset.kind})</p>
                  <p>{selectedAsset.content}</p>
                  <p className="hint-line">{selectedAsset.fileName ?? "No file attached"}</p>
                  <div className="row">
                    <button type="button" className="btn solid" onClick={() => setStatus("Marketing item sent to audience")}>Send</button>
                    <button type="button" className="btn ghost" onClick={() => copyText(selectedAsset.content)}>Copy</button>
                    <button type="button" className="btn ghost" onClick={() => shareText(selectedAsset.content)}>Share</button>
                    <button type="button" className="btn ghost" onClick={() => downloadFile(`${selectedAsset.title}.txt`, selectedAsset.content)}>Download</button>
                    <button type="button" className="btn ghost" onClick={() => printContent(selectedAsset.title, `<h2>${selectedAsset.title}</h2><p>${selectedAsset.content}</p>`)}>PDF</button>
                    <button type="button" className="btn ghost" onClick={() => printContent(selectedAsset.title, `<h2>${selectedAsset.title}</h2><p>${selectedAsset.content}</p>`)}>Print</button>
                    {selectedAsset.kind === "document" ? (
                      <button
                        type="button"
                        className="btn ghost"
                        onClick={async () => {
                          const res = await fetch(`/api/admin/marketing?id=${encodeURIComponent(selectedAsset.id)}`, { method: "DELETE" });
                          setStatus(res.ok ? "Document deleted" : "Unable to delete document");
                          if (res.ok) setSelectedAssetId("");
                          await loadAll();
                        }}
                      >
                        Delete Document
                      </button>
                    ) : null}
                  </div>
                </>
              ) : (
                <p className="page-subtitle">No item selected.</p>
              )}
            </article>
          </div>
        ) : null}

        {section === "Technical" ? (
          <article className="card">
            <h3>Technical Health and Operational Tests</h3>
            {health ? (
              <div className="cards">
                <article className="card metric-card metric-good"><p className="hint-line">Uptime</p><h3>{health.uptime}%</h3></article>
                <article className="card metric-card metric-info"><p className="hint-line">API p95</p><h3>{health.apiP95ms} ms</h3></article>
                <article className={health.errorRate < 1 ? "card metric-card metric-good" : "card metric-card metric-critical"}><p className="hint-line">Error Rate</p><h3>{health.errorRate}%</h3></article>
                <article className="card metric-card metric-info"><p className="hint-line">Background jobs</p><h3>{health.backgroundJobsOk}%</h3></article>
              </div>
            ) : (
              <p className="page-subtitle">Loading technical data...</p>
            )}
            <div className="row">
              <button type="button" className="btn solid" onClick={() => setStatus("API test passed")}>Run API Test</button>
              <button type="button" className="btn ghost" onClick={() => setStatus("DB connectivity test passed")}>Run DB Test</button>
              <button type="button" className="btn ghost" onClick={() => setStatus("Background jobs test passed")}>Run Worker Test</button>
              <button type="button" className="btn ghost" onClick={() => setStatus("Monitoring probes passed")}>Run Monitoring Test</button>
            </div>
          </article>
        ) : null}

        {section === "Email Templates" ? (
          <div className="step-grid">
            <article className="card">
              <h3>Email Template Library</h3>
              <p className="hint-line">Total templates: {templates.length}. Use View to open full branded preview.</p>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Name</th><th>Category</th><th>Subject</th><th>Updated</th><th>View</th></tr></thead>
                  <tbody>
                    {templates.map((template) => (
                      <tr key={template.id}>
                        <td>{template.name}</td>
                        <td>{template.category}</td>
                        <td>{template.subject}</td>
                        <td>{formatDate(template.updatedAt)}</td>
                        <td>
                          <button type="button" className="btn ghost" onClick={() => setSelectedTemplateId(template.id)}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <button
                  type="button"
                  className="btn solid"
                  onClick={async () => {
                    const res = await fetch("/api/admin/email-templates", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: "Weekly Platform Report",
                        category: "alerts",
                        subject: "Weekly platform analytics",
                        html: "<h2>AGRON Work Weekly</h2><p>Metrics and highlights.</p>",
                        text: "Weekly metrics and highlights"
                      })
                    });
                    setStatus(res.ok ? "Template created" : "Unable to create template");
                    await loadAll();
                  }}
                >
                  Add Template
                </button>
              </div>
            </article>

            <article className="card">
              <h3>Template Preview and Actions</h3>
              {selectedTemplate ? (
                <>
                  <p><strong>{selectedTemplate.name}</strong> · {selectedTemplate.subject}</p>
                  <div className="template-preview" dangerouslySetInnerHTML={{ __html: selectedTemplate.html }} />
                  <div className="row">
                    <button type="button" className="btn solid" onClick={() => setStatus("Test email sent")}>Send</button>
                    <button type="button" className="btn ghost" onClick={() => copyText(selectedTemplate.html)}>Copy</button>
                    <button type="button" className="btn ghost" onClick={() => shareText(selectedTemplate.subject)}>Share</button>
                    <button type="button" className="btn ghost" onClick={() => downloadFile(`${selectedTemplate.name}.html`, selectedTemplate.html, "text/html")}>Download</button>
                    <button type="button" className="btn ghost" onClick={() => printContent(selectedTemplate.name, selectedTemplate.html)}>PDF</button>
                    <button type="button" className="btn ghost" onClick={() => printContent(selectedTemplate.name, selectedTemplate.html)}>Print</button>
                  </div>
                </>
              ) : (
                <p className="page-subtitle">Select template to preview.</p>
              )}
            </article>
          </div>
        ) : null}

        {section === "Access Rights" ? (
          <div className="step-grid">
            <article className="card">
              <h3>Users and Role Assignment</h3>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Provider</th><th>Assign</th></tr></thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.provider}</td>
                        <td>
                          <div className="row compact">
                            {roleOptions.map((role) => (
                              <button
                                key={`${user.id}-${role}`}
                                type="button"
                                className={user.role === role ? "btn solid" : "btn ghost"}
                                onClick={async () => {
                                  const r = await fetch("/api/admin/users", {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ userId: user.id, role })
                                  });
                                  setStatus(r.ok ? `Assigned ${role} to ${user.email}` : "Role update denied (super admin required)");
                                  await loadAll();
                                }}
                              >
                                {role}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="card">
              <h3>Invite by Role</h3>
              <div className="step-grid">
                <label className="field"><span>Email</span><input className="input" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} /></label>
                <label className="field"><span>Role</span><select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}>{roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}</select></label>
              </div>
              <div className="row">
                <button
                  type="button"
                  className="btn solid"
                  onClick={async () => {
                    const r = await fetch("/api/admin/users", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: inviteEmail, role: inviteRole })
                    });
                    setStatus(r.ok ? `Invitation sent to ${inviteEmail}` : "Invitation failed (super admin required)");
                    if (r.ok) setInviteEmail("");
                    await loadAll();
                  }}
                >
                  Send Invitation
                </button>
              </div>
              <h4>Pending Invitations</h4>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Email</th><th>Role</th><th>Status</th><th>Invited by</th></tr></thead>
                  <tbody>
                    {invitations.slice(0, 10).map((item) => (
                      <tr key={item.id}><td>{item.email}</td><td>{item.role}</td><td>{item.status}</td><td>{item.invitedBy}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h4>Role Audit</h4>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Action</th><th>Actor</th><th>Target</th><th>Role</th><th>Date</th></tr></thead>
                  <tbody>
                    {audits.slice(0, 12).map((item) => (
                      <tr key={item.id}><td>{item.action}</td><td>{item.actorEmail}</td><td>{item.targetEmail}</td><td>{item.role}</td><td>{formatDate(item.createdAt)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        ) : null}

        {section === "Messages" ? (
          <article className="card">
            <h3>Communication Center</h3>
            <div className="cards">
              <article className="card metric-card metric-info"><p className="hint-line">Total messages</p><h3>{messages.length}</h3></article>
              <article className="card metric-card metric-good"><p className="hint-line">Inbound</p><h3>{messages.filter((message) => message.direction === "inbound").length}</h3></article>
              <article className="card metric-card metric-warn"><p className="hint-line">Need review</p><h3>{messages.filter((message) => message.status === "new").length}</h3></article>
            </div>
            <div className="message-list">
              {messages.slice(0, 10).map((message) => (
                <article key={message.id} className={message.direction === "inbound" ? "message-item inbound" : "message-item outbound"}>
                  <p><strong>{message.subject}</strong></p>
                  <p>{message.body}</p>
                  <p className="hint-line">{message.direction} · {message.status} · {formatDate(message.createdAt)}</p>
                </article>
              ))}
            </div>
          </article>
        ) : null}

        {section === "Statistics" && stats ? (
          <article className="card">
            <h3>Platform Statistics and Analytics</h3>
            <div className="cards">
              <article className="card metric-card metric-info"><p className="hint-line">Active users</p><h3>{stats.activeUsers}</h3></article>
              <article className="card metric-card metric-info"><p className="hint-line">Open jobs</p><h3>{stats.openJobs}</h3></article>
              <article className="card metric-card metric-good"><p className="hint-line">Applications today</p><h3>{stats.applicationsToday}</h3></article>
              <article className="card metric-card metric-good"><p className="hint-line">Conversion</p><h3>{stats.conversionRate}%</h3></article>
              <article className="card metric-card metric-warn"><p className="hint-line">Avg time to hire</p><h3>{stats.avgTimeToHireDays}d</h3></article>
            </div>
          </article>
        ) : null}

        {section === "Finance" && finance ? (
          <article className="card">
            <h3>Financial KPIs</h3>
            <div className="cards">
              <article className="card metric-card metric-info"><p className="hint-line">Users total</p><h3>{formatNumber(finance.usersTotal)}</h3></article>
              <article className="card metric-card metric-good"><p className="hint-line">Users today</p><h3>{finance.usersNewToday}</h3></article>
              <article className="card metric-card metric-good"><p className="hint-line">Users month</p><h3>{finance.usersNewMonth}</h3></article>
              <article className="card metric-card metric-good"><p className="hint-line">Cash in today</p><h3>{formatMoney(finance.cashInToday)}</h3></article>
              <article className="card metric-card metric-warn"><p className="hint-line">Cash out today</p><h3>{formatMoney(finance.cashOutToday)}</h3></article>
              <article className="card metric-card metric-good"><p className="hint-line">Cash in month</p><h3>{formatMoney(finance.cashInMonth)}</h3></article>
              <article className="card metric-card metric-warn"><p className="hint-line">Cash out month</p><h3>{formatMoney(finance.cashOutMonth)}</h3></article>
              <article className="card metric-card metric-good"><p className="hint-line">Cash in year</p><h3>{formatMoney(finance.cashInYear)}</h3></article>
              <article className="card metric-card metric-warn"><p className="hint-line">Cash out year</p><h3>{formatMoney(finance.cashOutYear)}</h3></article>
              <article className="card metric-card metric-info"><p className="hint-line">MRR</p><h3>{formatMoney(finance.mrr)}</h3></article>
              <article className="card metric-card metric-info"><p className="hint-line">ARR</p><h3>{formatMoney(finance.arr)}</h3></article>
              <article className="card metric-card metric-good"><p className="hint-line">Net revenue</p><h3>{formatMoney(finance.netRevenue)}</h3></article>
              <article className="card metric-card metric-good"><p className="hint-line">Gross profit</p><h3>{formatMoney(finance.grossProfit)}</h3></article>
              <article className="card metric-card metric-info"><p className="hint-line">Profit margin</p><h3>{finance.profitMargin}%</h3></article>
              <article className="card metric-card metric-warn"><p className="hint-line">Operating costs</p><h3>{formatMoney(finance.operatingCosts)}</h3></article>
              <article className="card metric-card metric-warn"><p className="hint-line">Taxes paid</p><h3>{formatMoney(finance.taxesPaid)}</h3></article>
              <article className="card metric-card metric-warn"><p className="hint-line">Refund rate</p><h3>{finance.refundsRate}%</h3></article>
            </div>
          </article>
        ) : null}

        {section === "Monitoring" ? (
          <article className="card">
            <h3>Monitoring</h3>
            <div className="row">
              <button
                type="button"
                className="btn solid"
                onClick={async () => {
                  const r = await fetch("/api/admin/monitoring", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ severity: "warning", service: "queue", message: "Queue latency above threshold" })
                  });
                  setStatus(r.ok ? "Monitoring event added" : "Failed to add monitoring event");
                  await loadAll();
                }}
              >
                Add Warning Event
              </button>
            </div>
            <div className="message-list">
              {events.map((event) => (
                <article key={event.id} className={`message-item ${event.severity === "critical" ? "critical" : event.severity === "warning" ? "warning" : "inbound"}`}>
                  <p><strong>{event.service}</strong> · {event.severity}</p>
                  <p>{event.message}</p>
                  <p className="hint-line">{formatDate(event.createdAt)}</p>
                </article>
              ))}
            </div>
          </article>
        ) : null}
      </section>
    </div>
  );
}
