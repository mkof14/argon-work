"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "../../components/AppProviders";

type AdminSection =
  | "site"
  | "qa"
  | "learning"
  | "materials"
  | "marketing"
  | "ads"
  | "email"
  | "fields"
  | "roles"
  | "super"
  | "reports";

type EmailTemplate = {
  key: string;
  title: string;
  subject: string;
  useCase: string;
  body: string;
  cta: string;
};

type ToolState = {
  id: string;
  title: string;
  description: string;
};

export default function AdminPage() {
  const t = useTranslation();
  const [activeSection, setActiveSection] = useState<AdminSection>("site");
  const [adminMessage, setAdminMessage] = useState<string>("Ready.");
  const [selectedEmailKey, setSelectedEmailKey] = useState<string>("welcome");
  const [qaLog, setQaLog] = useState<string[]>([]);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [toolState, setToolState] = useState<ToolState | null>(null);
  const [toolInput, setToolInput] = useState("default");
  const [toolNotes, setToolNotes] = useState("");
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const emailTemplates: EmailTemplate[] = [
    {
      key: "welcome",
      title: "Welcome / Onboarding",
      subject: "Welcome to AGRON - Your training access is ready",
      useCase: "First account activation, platform intro, next-step CTA",
      body:
        "Hello {{first_name}},\n\nWelcome to AGRON. Your account is active and your training dashboard is ready. Start with your onboarding module and complete your first mission simulation.\n\nBest regards,\nAGRON Team",
      cta: "Open Dashboard"
    },
    {
      key: "verify",
      title: "Email Verification",
      subject: "Verify your AGRON account",
      useCase: "Security verification for new users and role changes",
      body:
        "Hello {{first_name}},\n\nPlease verify your AGRON account to activate secure access. Click the verification link below. This link expires in 30 minutes.\n\nAGRON Security",
      cta: "Verify Email"
    },
    {
      key: "password",
      title: "Password Reset",
      subject: "Reset your AGRON password",
      useCase: "Secure account recovery flow",
      body:
        "Hello {{first_name}},\n\nWe received a password reset request for your AGRON account. If this was you, use the secure reset link below. If not, ignore this message.\n\nAGRON Security",
      cta: "Reset Password"
    },
    {
      key: "course",
      title: "Course Enrollment",
      subject: "You are enrolled in a new AGRON program",
      useCase: "Student assigned to course/module/cohort",
      body:
        "Hello {{first_name}},\n\nYou have been enrolled in {{program_name}}. Please review lesson schedule, required materials, and mission checklist in your dashboard.\n\nAGRON Training Ops",
      cta: "Open Program"
    },
    {
      key: "deadline",
      title: "Deadline Reminder",
      subject: "Training deadline reminder",
      useCase: "Upcoming exam, assignment, or certification date",
      body:
        "Hello {{first_name}},\n\nReminder: {{module_name}} deadline is {{deadline_date}}. Complete required tasks to remain on track for certification.\n\nAGRON Academy",
      cta: "Resume Training"
    },
    {
      key: "mission",
      title: "Mission Assignment",
      subject: "New mission assigned in AGRON Ops",
      useCase: "Operational task dispatch to pilot/instructor",
      body:
        "Hello {{first_name}},\n\nA new mission has been assigned: {{mission_title}}. Review mission objectives, safety checks, and reporting requirements before launch.\n\nAGRON Operations",
      cta: "View Mission"
    },
    {
      key: "payment",
      title: "Payment Receipt",
      subject: "Payment confirmed - AGRON subscription",
      useCase: "Invoice/receipt confirmation after checkout",
      body:
        "Hello {{first_name}},\n\nPayment received successfully. Plan: {{plan_name}}. Invoice ID: {{invoice_id}}. Thank you for choosing AGRON.\n\nAGRON Billing",
      cta: "View Invoice"
    },
    {
      key: "failed",
      title: "Payment Failed",
      subject: "Payment issue on your AGRON account",
      useCase: "Failed renewal, card update required",
      body:
        "Hello {{first_name}},\n\nWe could not process your payment for {{plan_name}}. Please update your billing method to avoid service interruption.\n\nAGRON Billing",
      cta: "Update Payment Method"
    },
    {
      key: "certificate",
      title: "Certification Issued",
      subject: "Your AGRON certification is now available",
      useCase: "Course completion and certificate delivery",
      body:
        "Hello {{first_name}},\n\nCongratulations. You completed {{program_name}} and your certificate is now available in your profile.\n\nAGRON Certification Office",
      cta: "Download Certificate"
    },
    {
      key: "enterprise",
      title: "Enterprise Report",
      subject: "Weekly AGRON performance report",
      useCase: "B2B admin analytics and KPI summary",
      body:
        "Hello {{org_admin}},\n\nYour weekly AGRON enterprise report is ready. Review training completion, simulation scores, and mission outcomes.\n\nAGRON Enterprise",
      cta: "Open Report"
    },
    {
      key: "security",
      title: "Security Alert",
      subject: "Important security notice",
      useCase: "Critical account/security event notifications",
      body:
        "Hello {{first_name}},\n\nA security event was detected on your account. Please review recent activity and confirm authorized access.\n\nAGRON Security",
      cta: "Review Activity"
    },
    {
      key: "support",
      title: "Support Resolution",
      subject: "Your AGRON support request was updated",
      useCase: "Ticket updates and closure confirmation",
      body:
        "Hello {{first_name}},\n\nYour support ticket {{ticket_id}} has been updated. Please review the latest response from AGRON support.\n\nAGRON Support",
      cta: "Open Ticket"
    }
  ];

  const sections = useMemo(
    () => [
      { id: "site" as const, label: "Website CMS" },
      { id: "qa" as const, label: "Technical Site Tests" },
      { id: "learning" as const, label: "Learning Programs" },
      { id: "materials" as const, label: "Training Materials" },
      { id: "marketing" as const, label: "Marketing Hub" },
      { id: "ads" as const, label: "Ad Documents" },
      { id: "email" as const, label: "Email Templates" },
      { id: "fields" as const, label: "Site Fields Control" },
      { id: "roles" as const, label: "Admin Roles & Access" },
      { id: "super" as const, label: "Super Admin Control" },
      { id: "reports" as const, label: "Reports & Audit" }
    ],
    []
  );

  const selectedEmail = emailTemplates.find((template) => template.key === selectedEmailKey) ?? emailTemplates[0];
  const sectionTitle = sections.find((section) => section.id === activeSection)?.label ?? "Admin";

  function logAction(message: string) {
    setActionLog((current) => [`${new Date().toLocaleTimeString()} - ${message}`, ...current].slice(0, 12));
    setAdminMessage(message);
  }

  function openTool(id: string, title: string, description: string) {
    setToolState({ id, title, description });
    logAction(`${title} opened.`);
  }

  function executeToolAction() {
    if (!toolState) {
      logAction("No tool selected.");
      return;
    }
    logAction(`${toolState.title} executed with target '${toolInput}'.`);
  }

  function runQa(name: string) {
    const entry = `${new Date().toLocaleTimeString()} - ${name}: PASS`;
    setQaLog((current) => [entry, ...current].slice(0, 8));
    logAction(`${name} completed.`);
  }

  async function handleCopyEmail() {
    const payload = `Subject: ${selectedEmail.subject}\n\n${selectedEmail.body}\n\nCTA: ${selectedEmail.cta}`;
    try {
      await navigator.clipboard.writeText(payload);
      logAction("Email template copied.");
    } catch {
      const temp = document.createElement("textarea");
      temp.value = payload;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
      logAction("Email template copied (fallback).");
    }
  }

  function handleSendEmail() {
    const subject = encodeURIComponent(selectedEmail.subject);
    const body = encodeURIComponent(selectedEmail.body);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
    logAction("Default email client opened.");
  }

  function handleDownloadEmail() {
    const payload = `Subject: ${selectedEmail.subject}\n\n${selectedEmail.body}\n\nCTA: ${selectedEmail.cta}`;
    const blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedEmail.key}-template.txt`;
    link.click();
    URL.revokeObjectURL(url);
    logAction("Email template downloaded.");
  }

  function handlePdfEmail() {
    const popup = window.open("", "_blank", "width=900,height=700");
    if (!popup) {
      logAction("PDF export blocked by popup settings.");
      return;
    }

    popup.document.write(`
      <html>
        <head><title>${selectedEmail.subject}</title></head>
        <body style="font-family: Arial, sans-serif; padding: 24px;">
          <h2>AGRON</h2>
          <p><strong>Subject:</strong> ${selectedEmail.subject}</p>
          <pre style="white-space: pre-wrap; line-height: 1.5;">${selectedEmail.body}</pre>
          <p><strong>CTA:</strong> ${selectedEmail.cta}</p>
        </body>
      </html>
    `);
    popup.document.close();
    popup.focus();
    popup.print();
    logAction("PDF print dialog opened.");
  }

  async function handleShareEmail() {
    const payload = `${selectedEmail.subject}\n\n${selectedEmail.body}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "AGRON Template", text: payload });
        logAction("Template shared.");
        return;
      }
      await navigator.clipboard.writeText(payload);
      logAction("Share unavailable. Template copied instead.");
    } catch {
      logAction("Share cancelled or blocked.");
    }
  }

  function openEmailViewer(key: string) {
    setSelectedEmailKey(key);
    setTimeout(() => {
      viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
    logAction("Template loaded in viewer.");
  }

  return (
    <section>
      <span className="page-kicker">Control Center</span>
      <h1 className="page-title">{t.admin.title}</h1>
      <div className="title-accent-line" />
      <p className="page-lead">{t.admin.intro}</p>

      <div className="admin-layout">
        <aside className="card admin-menu">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={activeSection === section.id ? "admin-menu-item active" : "admin-menu-item"}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </aside>

        <div className="admin-content">
          <article className="card">
            <h3>{sectionTitle}</h3>
            <div className="admin-alert">{adminMessage}</div>

            {toolState ? (
              <div className="admin-toolbox">
                <h4>{toolState.title}</h4>
                <p>{toolState.description}</p>
                <div className="email-actions">
                  <input
                    className="input"
                    value={toolInput}
                    onChange={(event) => setToolInput(event.target.value)}
                    placeholder="Target"
                  />
                  <input
                    className="input"
                    value={toolNotes}
                    onChange={(event) => setToolNotes(event.target.value)}
                    placeholder="Notes"
                  />
                </div>
                <div className="email-actions">
                  <button className="btn btn-secondary" onClick={executeToolAction}>
                    Execute
                  </button>
                  <button className="btn btn-secondary" onClick={() => logAction("Tool config saved.")}>
                    Save Draft
                  </button>
                  <button className="btn btn-secondary" onClick={() => setToolState(null)}>
                    Close Tool
                  </button>
                </div>
              </div>
            ) : null}

            {activeSection === "site" ? (
              <div className="admin-grid">
                <div className="admin-panel"><h4>Pages and Navigation</h4><p>Create, publish, archive, and reorder website pages and menu links.</p><button className="btn btn-secondary" onClick={() => openTool("pages", "Manage Pages", "Control page visibility, ordering, and publication workflow.")}>Manage Pages</button></div>
                <div className="admin-panel"><h4>Header and Footer</h4><p>Edit logo slots, footer menus, legal links, and global contact blocks.</p><button className="btn btn-secondary" onClick={() => openTool("layout", "Layout Areas", "Edit menu/footer blocks and global branding areas.")}>Edit Layout Areas</button></div>
                <div className="admin-panel"><h4>SEO and Metadata</h4><p>Control page titles, open graph data, schema snippets, and canonical URLs.</p><button className="btn btn-secondary" onClick={() => openTool("seo", "SEO Controls", "Manage metadata templates and route-level SEO settings.")}>Open SEO Controls</button></div>
              </div>
            ) : null}

            {activeSection === "learning" ? (
              <div className="admin-grid">
                <div className="admin-panel"><h4>Course Programs</h4><p>Create tracks, modules, lessons, and certification paths for each domain.</p><button className="btn btn-secondary" onClick={() => openTool("programs", "Program Builder", "Create and update course paths and milestones.")}>Program Builder</button></div>
                <div className="admin-panel"><h4>Exams and Simulation Rules</h4><p>Manage exam pools, scoring thresholds, simulation mission templates.</p><button className="btn btn-secondary" onClick={() => openTool("assessment", "Assessment Rules", "Configure grading thresholds and simulation pass criteria.")}>Open Assessment Rules</button></div>
                <div className="admin-panel"><h4>Instructor Assignment</h4><p>Assign instructors to cohorts, topics, office hours, and evaluation queues.</p><button className="btn btn-secondary" onClick={() => openTool("instructors", "Instructor Assignment", "Assign and balance instructor workload across cohorts.")}>Assign Instructors</button></div>
              </div>
            ) : null}

            {activeSection === "materials" ? (
              <div className="admin-grid">
                <div className="admin-panel"><h4>Materials Library</h4><p>Store videos, PDFs, checklists, mission briefs, and practical guides.</p><button className="btn btn-secondary" onClick={() => openTool("library", "Materials Library", "Upload and organize learning assets.")}>Open Library</button></div>
                <div className="admin-panel"><h4>Versioning</h4><p>Track updates by version, approval status, author, and release date.</p><button className="btn btn-secondary" onClick={() => openTool("versions", "Version Review", "Audit and approve material versions.")}>Review Versions</button></div>
                <div className="admin-panel"><h4>Access Policy</h4><p>Set who can view materials by role, program, language, and plan tier.</p><button className="btn btn-secondary" onClick={() => openTool("material-access", "Access Rules", "Define role-based content access policies.")}>Edit Access Rules</button></div>
              </div>
            ) : null}

            {activeSection === "marketing" ? (
              <div className="admin-grid">
                <div className="admin-panel"><h4>Campaign Management</h4><p>Launch campaigns, manage creatives, links, and lifecycle stages.</p><button className="btn btn-secondary" onClick={() => openTool("campaigns", "Campaigns", "Create and execute campaign plans.")}>Open Campaigns</button></div>
                <div className="admin-panel"><h4>Lead Funnels</h4><p>Track lead sources, conversions, retargeting segments, and attribution.</p><button className="btn btn-secondary" onClick={() => openTool("funnel", "Funnel Control", "Analyze conversion pipeline and growth metrics.")}>Funnel Control</button></div>
                <div className="admin-panel"><h4>Brand Assets</h4><p>Centralize logos, brand documents, and social media media-kits.</p><button className="btn btn-secondary" onClick={() => openTool("assets", "Asset Library", "Manage shared brand assets.")}>Asset Library</button></div>
              </div>
            ) : null}

            {activeSection === "ads" ? (
              <div className="admin-grid">
                <div className="admin-panel"><h4>Advertising Documents</h4><p>Keep approved decks, one-pagers, presentations, and partner packets.</p><button className="btn btn-secondary" onClick={() => openTool("ads-docs", "Ad Documents", "Manage publication-ready ad docs.")}>Open Documents</button></div>
                <div className="admin-panel"><h4>Approval Workflow</h4><p>Assign reviewers, legal checks, and publication readiness statuses.</p><button className="btn btn-secondary" onClick={() => openTool("approval", "Approval Workflow", "Route documents through legal and brand approval.")}>Run Approval</button></div>
                <div className="admin-panel"><h4>Distribution List</h4><p>Manage where documents are sent: sales, partners, events, PR.</p><button className="btn btn-secondary" onClick={() => openTool("distribution", "Distribution List", "Configure target channels and send lists.")}>Manage Distribution</button></div>
              </div>
            ) : null}

            {activeSection === "email" ? (
              <div className="admin-grid">
                <div className="admin-panel"><h4>Email Template Builder</h4><p>Edit onboarding, progress, payment, and mission assignment templates.</p><button className="btn btn-secondary" onClick={() => openTool("email-builder", "Email Builder", "Create and maintain branded email templates.")}>Open Template Builder</button></div>
                <div className="admin-panel"><h4>Audience Segments</h4><p>Target students, instructors, enterprise admins, and prospects separately.</p><button className="btn btn-secondary" onClick={() => openTool("segments", "Segment Manager", "Manage recipient segments and targeting rules.")}>Segment Manager</button></div>
                <div className="admin-panel"><h4>Automation Rules</h4><p>Set triggers for reminders, deadlines, certificates, and campaign follow-ups.</p><button className="btn btn-secondary" onClick={() => openTool("email-auto", "Email Automations", "Configure automated trigger-based email flows.")}>Open Automations</button></div>

                <div className="admin-panel admin-panel-wide">
                  <h4>Template Library (All Cases)</h4>
                  <p>Branded AGRON templates with logo, operational message block, and CTA buttons.</p>
                  <div className="email-template-grid">
                    {emailTemplates.map((template) => (
                      <article className={selectedEmailKey === template.key ? "email-template-card active" : "email-template-card"} key={template.key}>
                        <div className="email-template-header">
                          <Image src="/brand/AGRON_Logo_with_Tagline.webp" alt="AGRON logo" width={130} height={86} className="email-logo-mini" />
                          <span className="email-template-tag">{template.title}</span>
                        </div>
                        <div className="email-template-body">
                          <p><strong>Subject:</strong> {template.subject}</p>
                          <p><strong>Use case:</strong> {template.useCase}</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => openEmailViewer(template.key)}>Open in Viewer</button>
                      </article>
                    ))}
                  </div>

                  <div className="email-viewer" ref={viewerRef}>
                    <div className="email-viewer-top">
                      <Image src="/brand/AGRON_Logo_with_Tagline.webp" alt="AGRON logo" width={150} height={100} className="email-logo-mini" />
                      <div>
                        <h5>{selectedEmail.title}</h5>
                        <p><strong>Subject:</strong> {selectedEmail.subject}</p>
                        <p><strong>CTA:</strong> {selectedEmail.cta}</p>
                      </div>
                    </div>
                    <pre className="email-viewer-body">{selectedEmail.body}</pre>
                    <div className="email-actions">
                      <button className="btn btn-secondary" onClick={handleCopyEmail}>Copy</button>
                      <button className="btn btn-secondary" onClick={handleSendEmail}>Send</button>
                      <button className="btn btn-secondary" onClick={handleDownloadEmail}>Download</button>
                      <button className="btn btn-secondary" onClick={handlePdfEmail}>PDF</button>
                      <button className="btn btn-secondary" onClick={handleShareEmail}>Share</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeSection === "qa" ? (
              <div className="admin-grid">
                <div className="admin-panel"><h4>Core Health Checks</h4><p>Automated checks for API health, web page uptime, and auth availability.</p><button className="btn btn-secondary" onClick={() => runQa("Health checks")}>Run Health Checks</button></div>
                <div className="admin-panel"><h4>Frontend QA</h4><p>Validate routes, broken links, responsive layouts, and language toggles.</p><button className="btn btn-secondary" onClick={() => runQa("Frontend tests")}>Run Frontend Tests</button></div>
                <div className="admin-panel"><h4>Payments QA</h4><p>Test checkout/session creation, webhook validation, and receipt templates.</p><button className="btn btn-secondary" onClick={() => runQa("Payment tests")}>Run Payment Tests</button></div>
                <div className="admin-panel"><h4>Content QA</h4><p>Review missing media files, empty blocks, legal pages, and metadata consistency.</p><button className="btn btn-secondary" onClick={() => runQa("Content validation")}>Run Content Validation</button></div>
                <div className="admin-panel"><h4>Role & Permission QA</h4><p>Verify admin/super-admin access matrix and blocked action scenarios.</p><button className="btn btn-secondary" onClick={() => runQa("Access tests")}>Run Access Tests</button></div>
                <div className="admin-panel"><h4>Scheduled Test Suite</h4><p>Configure daily/weekly automated technical tests with summary email reports.</p><button className="btn btn-secondary" onClick={() => runQa("Scheduled test suite")}>Schedule Test Runs</button></div>
                <div className="admin-panel admin-panel-wide">
                  <h4>Latest Technical Test Results</h4>
                  {qaLog.length === 0 ? <p>No test runs yet.</p> : <ul className="about-list">{qaLog.map((line) => <li key={line}>{line}</li>)}</ul>}
                </div>
              </div>
            ) : null}

            {activeSection === "fields" ? (
              <div className="admin-grid">
                <div className="admin-panel"><h4>Website Field Controls</h4><p>Manage editable fields for pages: headlines, CTA blocks, cards, and forms.</p><button className="btn btn-secondary" onClick={() => openTool("field-registry", "Field Registry", "Manage editable website field schema.")}>Field Registry</button></div>
                <div className="admin-panel"><h4>Localization Fields</h4><p>Control multilingual content fields and translation status by language.</p><button className="btn btn-secondary" onClick={() => openTool("localization", "Localization Center", "Track and edit translation fields.")}>Localization Center</button></div>
                <div className="admin-panel"><h4>Validation Rules</h4><p>Define required fields, limits, and publishing constraints.</p><button className="btn btn-secondary" onClick={() => openTool("validation", "Validation Setup", "Define and test validation rules.")}>Validation Setup</button></div>
              </div>
            ) : null}

            {activeSection === "roles" ? (
              <div className="admin-grid">
                <div className="admin-panel"><h4>Role Matrix</h4><p>Create and manage roles: admin, content manager, instructor manager, auditor.</p><button className="btn btn-secondary" onClick={() => openTool("roles-matrix", "Role Matrix", "Manage role hierarchy and role definitions.")}>Open Role Matrix</button></div>
                <div className="admin-panel"><h4>Permission Groups</h4><p>Assign module-level permissions for read/write/publish/delete actions.</p><button className="btn btn-secondary" onClick={() => openTool("permissions", "Permissions", "Configure module permissions per role.")}>Permissions</button></div>
                <div className="admin-panel"><h4>User Assignment</h4><p>Assign administrators to groups, organizations, and responsibility domains.</p><button className="btn btn-secondary" onClick={() => openTool("assign-users", "Assign Users", "Bind users to role groups and scopes.")}>Assign Users</button></div>
              </div>
            ) : null}

            {activeSection === "super" ? (
              <div className="admin-grid">
                <div className="admin-panel"><h4>Super Admin Console</h4><p>Control tenant-level settings, critical permissions, and emergency lockouts.</p><button className="btn btn-secondary" onClick={() => openTool("super-console", "Super Console", "Control high-level tenant and security settings.")}>Open Super Console</button></div>
                <div className="admin-panel"><h4>Platform Policies</h4><p>Set global compliance rules, retention policy, and legal enforcement actions.</p><button className="btn btn-secondary" onClick={() => openTool("policy", "Policy Center", "Manage global platform policies and compliance.")}>Policy Center</button></div>
                <div className="admin-panel"><h4>System Integrity</h4><p>View security events, suspicious activity reports, and privileged actions.</p><button className="btn btn-secondary" onClick={() => openTool("security", "Security Overview", "Audit critical events and privileged activity.")}>Security Overview</button></div>
              </div>
            ) : null}

            {activeSection === "reports" ? (
              <div className="admin-grid">
                <div className="admin-panel"><h4>Operational Reports</h4><p>Analyze training KPIs, certification rates, and simulation outcomes.</p><button className="btn btn-secondary" onClick={() => openTool("ops-reports", "Operational Reports", "Generate KPI and training performance reports.")}>View Reports</button></div>
                <div className="admin-panel"><h4>Marketing Analytics</h4><p>Track campaign performance, conversion rates, and CAC/LTV trends.</p><button className="btn btn-secondary" onClick={() => openTool("mkt-analytics", "Marketing Analytics", "Analyze growth and acquisition analytics.")}>Marketing Analytics</button></div>
                <div className="admin-panel"><h4>Audit Logs</h4><p>Review admin actions, content changes, and permission modifications.</p><button className="btn btn-secondary" onClick={() => openTool("audit", "Audit Log", "Review platform and admin action logs.")}>Open Audit Log</button></div>
              </div>
            ) : null}
          </article>
        </div>
      </div>

      <div className="card admin-history">
        <h4>Admin Action History</h4>
        {actionLog.length === 0 ? <p>No actions yet.</p> : <ul className="about-list">{actionLog.map((entry) => <li key={entry}>{entry}</li>)}</ul>}
      </div>

      <div className="grid">
        {t.admin.cards.map((card) => (
          <article className="card" key={card}>{card}</article>
        ))}
      </div>
    </section>
  );
}
