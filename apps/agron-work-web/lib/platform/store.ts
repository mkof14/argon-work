import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { resolveDataFile } from "../runtime/data-path";

export type Role =
  | "user"
  | "admin"
  | "super_admin"
  | "support_admin"
  | "finance_admin"
  | "marketing_admin"
  | "moderator";

export type UserProfile = {
  userId: string;
  fullName: string;
  title: string;
  about: string;
  location: string;
  phone: string;
  website?: string;
  skills: string[];
  avatarDataUrl?: string;
  updatedAt: string;
};

export type ResumeRecord = {
  userId: string;
  summary: string;
  experience: string;
  education: string;
  certifications: string;
  languages: string;
  resumeFileName?: string;
  resumeFileType?: string;
  resumeFileDataUrl?: string;
  updatedAt: string;
};

export type MessageRecord = {
  id: string;
  userId: string;
  direction: "inbound" | "outbound";
  channel: "platform" | "email";
  subject: string;
  body: string;
  status: "new" | "read" | "sent";
  createdAt: string;
};

export type MarketingAsset = {
  id: string;
  kind: "campaign" | "document";
  title: string;
  campaignType: "email" | "push" | "in-app";
  audience: string;
  status: "draft" | "approved" | "scheduled";
  content: string;
  fileName?: string;
  fileType?: string;
  tags?: string[];
  createdAt: string;
};

export type EmailTemplate = {
  id: string;
  name: string;
  category: "welcome" | "security" | "alerts" | "marketing" | "billing";
  subject: string;
  html: string;
  text: string;
  updatedAt: string;
};

export type MonitoringEvent = {
  id: string;
  severity: "info" | "warning" | "critical";
  service: string;
  message: string;
  createdAt: string;
};

export type PlatformStats = {
  activeUsers: number;
  openJobs: number;
  applicationsToday: number;
  conversionRate: number;
  avgTimeToHireDays: number;
  updatedAt: string;
};

export type FinanceStats = {
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

export type HealthStats = {
  uptime: number;
  apiP95ms: number;
  errorRate: number;
  backgroundJobsOk: number;
  dbStatus: "healthy" | "degraded";
  updatedAt: string;
};

export type PlatformStore = {
  profiles: UserProfile[];
  resumes: ResumeRecord[];
  messages: MessageRecord[];
  marketingAssets: MarketingAsset[];
  emailTemplates: EmailTemplate[];
  monitoring: MonitoringEvent[];
  stats: PlatformStats;
  finance: FinanceStats;
  health: HealthStats;
  roleInvitations: {
    id: string;
    email: string;
    role: Role;
    invitedBy: string;
    status: "pending" | "accepted" | "revoked";
    createdAt: string;
  }[];
  roleAudit: {
    id: string;
    actorEmail: string;
    action: string;
    targetEmail: string;
    role: Role;
    createdAt: string;
  }[];
};

function now() {
  return new Date().toISOString();
}

function defaultStats(updatedAt = now()): PlatformStats {
  return {
    activeUsers: 1240,
    openJobs: 286,
    applicationsToday: 92,
    conversionRate: 14.8,
    avgTimeToHireDays: 12.4,
    updatedAt
  };
}

function defaultFinance(updatedAt = now()): FinanceStats {
  return {
    usersTotal: 1240,
    usersNewToday: 34,
    usersNewMonth: 412,
    mrr: 48200,
    arr: 578400,
    gmv: 1320000,
    netRevenue: 91300,
    payrollVolume: 701000,
    cashInToday: 18200,
    cashOutToday: 9700,
    cashInMonth: 402000,
    cashOutMonth: 251000,
    cashInYear: 4810000,
    cashOutYear: 3180000,
    grossProfit: 1630000,
    profitMargin: 33.9,
    taxesPaid: 284000,
    operatingCosts: 1420000,
    refundsRate: 1.7,
    updatedAt
  };
}

function defaultHealth(updatedAt = now()): HealthStats {
  return {
    uptime: 99.94,
    apiP95ms: 182,
    errorRate: 0.22,
    backgroundJobsOk: 99.5,
    dbStatus: "healthy",
    updatedAt
  };
}

function brandEmailLayout(title: string, bodyHtml: string) {
  const logoBase = process.env.NEXT_PUBLIC_WORK_SITE_URL ?? "http://localhost:3010";
  return `<!doctype html>
<html>
  <body style="font-family:Arial,sans-serif;background:#f5f8fc;color:#0f2742;padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #d9e4f0;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="background:linear-gradient(135deg,#1868d8,#0b4ea8);padding:16px 20px;color:#fff;">
          <img src="${logoBase}/brand/agron_blue.webp" alt="AGRON Work" style="height:32px;display:block;margin-bottom:8px;" />
          <h2 style="margin:0;font-size:22px;">AGRON Work</h2>
          <p style="margin:4px 0 0;font-size:12px;opacity:0.9;">Aerial-Ground Robotics Operations Network</p>
        </td>
      </tr>
      <tr>
        <td style="padding:20px;">
          <h3 style="margin-top:0;">${title}</h3>
          ${bodyHtml}
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;font-size:12px;color:#56718f;background:#f7fbff;border-top:1px solid #e2edf8;">
          AGRON Work · Direct hiring platform for robotics, drone, AI and data professionals.
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function defaultTemplates(): EmailTemplate[] {
  const updatedAt = now();
  return [
    {
      id: "welcome-account",
      name: "Welcome Account",
      category: "welcome",
      subject: "Welcome to AGRON Work",
      html: brandEmailLayout("Welcome to AGRON Work", "<p>Your account is active. Build your profile and start hiring or applying.</p>"),
      text: "Welcome to AGRON Work. Your account is active.",
      updatedAt
    },
    {
      id: "verify-security",
      name: "Verification Code",
      category: "security",
      subject: "Your verification code",
      html: brandEmailLayout("Security verification", "<p>Use this verification code: <strong>{{code}}</strong></p>"),
      text: "Use this verification code: {{code}}",
      updatedAt
    },
    {
      id: "new-application",
      name: "New Application Alert",
      category: "alerts",
      subject: "New application received",
      html: brandEmailLayout("New application", "<p>You received a new application for <strong>{{job_title}}</strong>.</p>"),
      text: "You received a new application for {{job_title}}.",
      updatedAt
    },
    {
      id: "marketing-campaign",
      name: "Marketing Campaign",
      category: "marketing",
      subject: "New opportunities on AGRON Work",
      html: brandEmailLayout("New opportunities", "<p>Explore high-tech jobs and verified specialists in your domain.</p>"),
      text: "Explore high-tech jobs and verified specialists.",
      updatedAt
    },
    {
      id: "invoice-billing",
      name: "Billing Invoice",
      category: "billing",
      subject: "Your AGRON Work invoice",
      html: brandEmailLayout("Billing update", "<p>Your invoice is ready. Amount: <strong>{{amount}}</strong>.</p>"),
      text: "Your invoice is ready. Amount: {{amount}}.",
      updatedAt
    },
    {
      id: "interview-invite",
      name: "Interview Invite",
      category: "alerts",
      subject: "Interview invitation for {{job_title}}",
      html: brandEmailLayout("Interview invitation", "<p>You are invited to an interview for <strong>{{job_title}}</strong> on {{date_time}}.</p>"),
      text: "Interview invitation for {{job_title}} on {{date_time}}.",
      updatedAt
    },
    {
      id: "offer-letter",
      name: "Offer Letter",
      category: "alerts",
      subject: "Offer received for {{job_title}}",
      html: brandEmailLayout("Offer received", "<p>You received an offer for <strong>{{job_title}}</strong>. Please review terms in your dashboard.</p>"),
      text: "You received an offer for {{job_title}}.",
      updatedAt
    },
    {
      id: "ai-application-submitted",
      name: "AI Application Submitted",
      category: "alerts",
      subject: "Application submitted: {{job_title}}",
      html: brandEmailLayout(
        "Application submitted",
        "<p>Your application for <strong>{{job_title}}</strong> was submitted to {{company_name}}.</p><p>Match score: <strong>{{match_score}}%</strong>.</p>"
      ),
      text: "Your application for {{job_title}} was submitted to {{company_name}}. Match score: {{match_score}}%.",
      updatedAt
    },
    {
      id: "ai-application-rejected",
      name: "AI Application Rejected",
      category: "alerts",
      subject: "Application removed: {{job_title}}",
      html: brandEmailLayout(
        "Application removed",
        "<p>The draft application for <strong>{{job_title}}</strong> was removed from your queue.</p><p>Reason: {{reason}}.</p>"
      ),
      text: "The draft application for {{job_title}} was removed. Reason: {{reason}}.",
      updatedAt
    },
    {
      id: "ai-interview-stage",
      name: "AI Interview Stage",
      category: "alerts",
      subject: "Interview stage: {{job_title}}",
      html: brandEmailLayout(
        "Interview stage reached",
        "<p>Your application for <strong>{{job_title}}</strong> moved to interview stage.</p><p>Company: {{company_name}}.</p>"
      ),
      text: "Your application for {{job_title}} moved to interview stage. Company: {{company_name}}.",
      updatedAt
    },
    {
      id: "ai-offer-stage",
      name: "AI Offer Stage",
      category: "alerts",
      subject: "Offer stage: {{job_title}}",
      html: brandEmailLayout(
        "Offer stage reached",
        "<p>You received an offer-stage update for <strong>{{job_title}}</strong>.</p><p>Company: {{company_name}}.</p>"
      ),
      text: "You received an offer-stage update for {{job_title}}. Company: {{company_name}}.",
      updatedAt
    },
    {
      id: "ai-hired-stage",
      name: "AI Hired Stage",
      category: "alerts",
      subject: "Hired update: {{job_title}}",
      html: brandEmailLayout(
        "Hired update",
        "<p>Congratulations. Your application for <strong>{{job_title}}</strong> moved to hired stage.</p><p>Company: {{company_name}}.</p>"
      ),
      text: "Congratulations. Your application for {{job_title}} moved to hired stage. Company: {{company_name}}.",
      updatedAt
    },
    {
      id: "password-reset",
      name: "Password Reset",
      category: "security",
      subject: "Reset your AGRON Work password",
      html: brandEmailLayout("Password reset", "<p>Use this secure link to reset your password: <a href='{{reset_url}}'>Reset password</a>.</p>"),
      text: "Reset your password: {{reset_url}}",
      updatedAt
    },
    {
      id: "role-invitation",
      name: "Role Invitation",
      category: "alerts",
      subject: "You were invited to AGRON Work admin workspace",
      html: brandEmailLayout("Admin invitation", "<p>You were invited as <strong>{{role}}</strong>. Accept invitation: <a href='{{invite_url}}'>Open invitation</a>.</p>"),
      text: "You were invited as {{role}}. Accept: {{invite_url}}",
      updatedAt
    },
    {
      id: "job-match-daily",
      name: "Daily Job Matches",
      category: "marketing",
      subject: "Your daily AGRON Work matches",
      html: brandEmailLayout("Daily job matches", "<p>Top roles for your profile are ready. Explore <strong>{{matches_count}}</strong> new opportunities today.</p>"),
      text: "You have {{matches_count}} new job matches today.",
      updatedAt
    },
    {
      id: "job-post-approved",
      name: "Job Post Approved",
      category: "alerts",
      subject: "Your job post is now live",
      html: brandEmailLayout("Job post approved", "<p>Your vacancy <strong>{{job_title}}</strong> is now live and visible to candidates.</p>"),
      text: "Your vacancy {{job_title}} is now live.",
      updatedAt
    },
    {
      id: "job-post-rejected",
      name: "Job Post Needs Changes",
      category: "alerts",
      subject: "Action required for your job post",
      html: brandEmailLayout("Job post update needed", "<p>Your post <strong>{{job_title}}</strong> needs updates before publication. Notes: {{moderator_notes}}</p>"),
      text: "Your post {{job_title}} needs updates. Notes: {{moderator_notes}}",
      updatedAt
    },
    {
      id: "candidate-shortlist",
      name: "Candidate Shortlist Ready",
      category: "alerts",
      subject: "Shortlist ready for {{job_title}}",
      html: brandEmailLayout("Shortlist ready", "<p>We prepared a shortlist of <strong>{{candidate_count}}</strong> candidates for {{job_title}}.</p>"),
      text: "Shortlist of {{candidate_count}} candidates is ready for {{job_title}}.",
      updatedAt
    },
    {
      id: "interview-reminder",
      name: "Interview Reminder",
      category: "alerts",
      subject: "Interview reminder: {{job_title}}",
      html: brandEmailLayout("Interview reminder", "<p>Reminder: your interview for <strong>{{job_title}}</strong> starts at {{date_time}}.</p>"),
      text: "Reminder: interview for {{job_title}} at {{date_time}}.",
      updatedAt
    },
    {
      id: "offer-accepted",
      name: "Offer Accepted",
      category: "alerts",
      subject: "Candidate accepted your offer",
      html: brandEmailLayout("Offer accepted", "<p>Candidate <strong>{{candidate_name}}</strong> accepted offer for {{job_title}}.</p>"),
      text: "Candidate {{candidate_name}} accepted offer for {{job_title}}.",
      updatedAt
    },
    {
      id: "offer-declined",
      name: "Offer Declined",
      category: "alerts",
      subject: "Candidate declined the offer",
      html: brandEmailLayout("Offer declined", "<p>Candidate <strong>{{candidate_name}}</strong> declined offer for {{job_title}}.</p>"),
      text: "Candidate {{candidate_name}} declined offer for {{job_title}}.",
      updatedAt
    },
    {
      id: "subscription-renewal",
      name: "Subscription Renewal Notice",
      category: "billing",
      subject: "Your subscription renews on {{date}}",
      html: brandEmailLayout("Subscription renewal", "<p>Your plan renews on <strong>{{date}}</strong>. Amount: {{amount}}.</p>"),
      text: "Your plan renews on {{date}}. Amount: {{amount}}.",
      updatedAt
    },
    {
      id: "payment-failed",
      name: "Payment Failed",
      category: "billing",
      subject: "Payment failed for your AGRON Work plan",
      html: brandEmailLayout("Payment failed", "<p>We could not process payment for your plan. Please update billing method.</p>"),
      text: "Payment failed. Please update your billing method.",
      updatedAt
    },
    {
      id: "trial-ending",
      name: "Trial Ending Soon",
      category: "billing",
      subject: "Your AGRON Work trial ends in {{days_left}} days",
      html: brandEmailLayout("Trial ending", "<p>Your trial ends in <strong>{{days_left}}</strong> days. Choose a plan to keep all features.</p>"),
      text: "Your trial ends in {{days_left}} days.",
      updatedAt
    },
    {
      id: "security-alert-login",
      name: "Security Login Alert",
      category: "security",
      subject: "New login to your account",
      html: brandEmailLayout("New login detected", "<p>New login detected from {{location}} at {{date_time}}. If this wasn't you, reset password now.</p>"),
      text: "New login detected from {{location}} at {{date_time}}.",
      updatedAt
    },
    {
      id: "email-change-confirm",
      name: "Email Change Confirmation",
      category: "security",
      subject: "Confirm your new email address",
      html: brandEmailLayout("Confirm email change", "<p>Confirm your new email: <a href='{{confirm_url}}'>Confirm email</a>.</p>"),
      text: "Confirm your new email: {{confirm_url}}",
      updatedAt
    },
    {
      id: "phone-verification",
      name: "Phone Verification",
      category: "security",
      subject: "Confirm your phone number",
      html: brandEmailLayout("Phone verification", "<p>Use OTP code <strong>{{otp_code}}</strong> to confirm your phone number.</p>"),
      text: "Use OTP code {{otp_code}} to confirm your phone number.",
      updatedAt
    },
    {
      id: "inactive-account-nudge",
      name: "Inactive Account Nudge",
      category: "marketing",
      subject: "We found new roles for you on AGRON Work",
      html: brandEmailLayout("Come back to new opportunities", "<p>Fresh drone, robotics and AI jobs were added this week. Continue where you left off.</p>"),
      text: "New opportunities were added this week. Continue where you left off.",
      updatedAt
    },
    {
      id: "weekly-hiring-digest",
      name: "Weekly Hiring Digest",
      category: "marketing",
      subject: "Weekly hiring digest: robotics, AI and data",
      html: brandEmailLayout("Weekly hiring digest", "<p>Top hiring trends, salary benchmarks and urgent roles for this week.</p>"),
      text: "Top hiring trends and urgent roles for this week.",
      updatedAt
    },
    {
      id: "support-ticket-opened",
      name: "Support Ticket Opened",
      category: "alerts",
      subject: "Your support request is received",
      html: brandEmailLayout("Support request received", "<p>Ticket <strong>{{ticket_id}}</strong> is open. We will update you shortly.</p>"),
      text: "Ticket {{ticket_id}} is open.",
      updatedAt
    },
    {
      id: "support-ticket-resolved",
      name: "Support Ticket Resolved",
      category: "alerts",
      subject: "Your support request was resolved",
      html: brandEmailLayout("Support request resolved", "<p>Ticket <strong>{{ticket_id}}</strong> has been resolved. Please review the response.</p>"),
      text: "Ticket {{ticket_id}} has been resolved.",
      updatedAt
    },
    {
      id: "gdpr-export-ready",
      name: "Data Export Ready",
      category: "alerts",
      subject: "Your data export is ready",
      html: brandEmailLayout("Data export ready", "<p>Your requested data export is ready. Download: <a href='{{export_url}}'>Get export</a>.</p>"),
      text: "Your data export is ready: {{export_url}}",
      updatedAt
    }
  ];
}

function withDefaultTemplates(templates?: EmailTemplate[]) {
  const incoming = Array.isArray(templates) ? templates : [];
  const defaults = defaultTemplates();
  const byId = new Map<string, EmailTemplate>();

  for (const item of incoming) byId.set(item.id, item);
  for (const template of defaults) {
    if (!byId.has(template.id)) byId.set(template.id, template);
  }

  return Array.from(byId.values());
}

function createInitialStore(): PlatformStore {
  const updatedAt = now();
  return {
    profiles: [],
    resumes: [],
    messages: [],
    marketingAssets: [
      {
        id: randomUUID(),
        kind: "campaign",
        title: "Q1 AI Hiring Launch",
        campaignType: "email",
        audience: "AI/ML specialists",
        status: "draft",
        content: "Campaign for high-demand AI hiring tracks.",
        tags: ["ai", "campaign", "q1"],
        fileName: undefined,
        fileType: undefined,
        createdAt: updatedAt
      },
      {
        id: randomUUID(),
        kind: "document",
        title: "Enterprise Outreach Deck",
        campaignType: "in-app",
        audience: "Enterprise clients",
        status: "approved",
        content: "Slides and positioning for enterprise outreach campaign.",
        tags: ["enterprise", "deck", "sales"],
        fileName: "enterprise-outreach-deck-v1.pdf",
        fileType: "application/pdf",
        createdAt: updatedAt
      }
    ],
    emailTemplates: defaultTemplates(),
    monitoring: [
      {
        id: randomUUID(),
        severity: "info",
        service: "api",
        message: "All core services operational",
        createdAt: updatedAt
      }
    ],
    stats: defaultStats(updatedAt),
    finance: defaultFinance(updatedAt),
    health: defaultHealth(updatedAt),
    roleInvitations: [
      {
        id: randomUUID(),
        email: "ops.manager@agron.work",
        role: "support_admin",
        invitedBy: "dnainform@gmail.com",
        status: "pending",
        createdAt: updatedAt
      }
    ],
    roleAudit: [
      {
        id: randomUUID(),
        actorEmail: "dnainform@gmail.com",
        action: "ASSIGN_ROLE",
        targetEmail: "ops.manager@agron.work",
        role: "support_admin",
        createdAt: updatedAt
      }
    ]
  };
}

async function ensureStore() {
  const storeFile = await resolveDataFile("platform-store.json");
  await mkdir(path.dirname(storeFile), { recursive: true });
  try {
    await readFile(storeFile, "utf8");
  } catch {
    const initial = createInitialStore();
    await writeFile(storeFile, `${JSON.stringify(initial, null, 2)}\n`, "utf8");
  }
  return storeFile;
}

export async function readPlatformStore() {
  const storeFile = await ensureStore();
  const raw = await readFile(storeFile, "utf8");
  const parsed = JSON.parse(raw) as Partial<PlatformStore>;
  const updatedAt = now();

  return {
    profiles: parsed.profiles ?? [],
    resumes: parsed.resumes ?? [],
    messages: parsed.messages ?? [],
    marketingAssets: parsed.marketingAssets ?? [],
    emailTemplates: withDefaultTemplates(parsed.emailTemplates),
    monitoring: parsed.monitoring ?? [],
    stats: { ...defaultStats(updatedAt), ...(parsed.stats ?? {}) },
    finance: { ...defaultFinance(updatedAt), ...(parsed.finance ?? {}) },
    health: { ...defaultHealth(updatedAt), ...(parsed.health ?? {}) },
    roleInvitations: parsed.roleInvitations ?? [],
    roleAudit: parsed.roleAudit ?? []
  };
}

export async function writePlatformStore(store: PlatformStore) {
  const storeFile = await ensureStore();
  await writeFile(storeFile, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}
