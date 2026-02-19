import Link from "next/link";

const firstSteps = [
  "Create account and complete onboarding details.",
  "Verify contact information and set work preferences.",
  "Upload profile photo and resume document.",
  "Select target domains, levels, and work mode.",
  "Run first search and save at least 3 relevant roles.",
  "Use AI match and ATS resume checks before applying.",
  "Generate role-specific resume and cover-letter drafts.",
  "Send first applications and start direct communication.",
  "Track pipeline status and reminders in Application Hub."
] as const;

const learningTracks = [
  {
    title: "Track 1: First Steps",
    summary: "Start from zero: account, profile, resume, and first search.",
    modules: [
      "Create account with Sign In/Up and complete onboarding.",
      "Confirm contact details and set role preferences.",
      "Add profile photo, core skills, and short professional summary.",
      "Upload resume document (PDF/DOC/DOCX) and fill resume sections.",
      "Run first job search and save 3 target roles."
    ],
    actions: [
      { href: "/auth/login?mode=register", label: "Create account" },
      { href: "/profile", label: "Open profile" },
      { href: "/search", label: "Start search" }
    ]
  },
  {
    title: "Track 2: Job Search and Applications",
    summary: "Learn how to find better jobs and apply with a stronger match.",
    modules: [
      "Use filters: domain, level, remote/hybrid, employment type.",
      "Compare jobs by salary range, mode, and role requirements.",
      "Use AI tools for role-fit checks, ATS prep, and cover-letter drafts.",
      "Apply to selected jobs and track progress in Application Hub/messages.",
      "Improve profile and resume based on rejection/feedback patterns."
    ],
    actions: [
      { href: "/search", label: "Find jobs" },
      { href: "/ai-tools", label: "Open AI tools" },
      { href: "/messages", label: "Track communication" },
      { href: "/faq", label: "Open FAQ" }
    ]
  },
  {
    title: "Track 3: AI Application Copilot",
    summary: "Use AI Copilot safely: boost speed while keeping full human control.",
    modules: [
      "Define preferred domains, roles, salary floor, and work mode.",
      "Set auto-assist mode: preview-first or assisted submission.",
      "Set guardrails: daily limits and minimum role-fit threshold.",
      "Review generated resume and cover-letter suggestions before submit.",
      "Audit Copilot actions and disable automation any time."
    ],
    actions: [
      { href: "/ai-tools", label: "Open AI Copilot" },
      { href: "/profile", label: "Update profile data" },
      { href: "/faq", label: "Read AI safety FAQ" }
    ]
  },
  {
    title: "Track 4: Employer Quick Start",
    summary: "Build hiring flow from role design to direct invites.",
    modules: [
      "Open Hiring Lab and create role scorecards.",
      "Build screener questions and compensation benchmark.",
      "Run anti-scam check for job text quality and trust.",
      "Create job draft and send direct candidate invites.",
      "Document transparent hiring decisions with assessment notes."
    ],
    actions: [
      { href: "/hiring-lab", label: "Open hiring lab" },
      { href: "/employers", label: "Employer hub" },
      { href: "/contact", label: "Enterprise contact" }
    ]
  },
  {
    title: "Track 5: ATS Pipeline Operations",
    summary: "Manage candidates across hiring stages in one board.",
    modules: [
      "Add candidate to pipeline with source and score.",
      "Move candidate through Applied -> Screen -> Interview -> Offer.",
      "Use notes per candidate and keep status clean.",
      "Mark hired or rejected with auditable actions.",
      "Review bottlenecks by stage and improve conversion."
    ],
    actions: [
      { href: "/hiring-lab", label: "Open ATS pipeline" },
      { href: "/faq", label: "Read FAQ" },
      { href: "/support", label: "Get support" }
    ]
  },
  {
    title: "Track 6: ATS Resume and Content Optimization",
    summary: "Optimize resume and application content for stronger shortlist quality.",
    modules: [
      "Extract role requirements and critical keywords from vacancy text.",
      "Map required skills to your existing profile and resume evidence.",
      "Generate targeted resume version for each high-priority role.",
      "Generate concise role-specific cover letters with measurable outcomes.",
      "Validate readability, consistency, and recruiter relevance before apply."
    ],
    actions: [
      { href: "/ai-tools", label: "Open resume optimizer" },
      { href: "/profile", label: "Edit resume sections" },
      { href: "/search", label: "Apply to matched roles" }
    ]
  },
  {
    title: "Track 7: Admin and Platform Operations",
    summary: "For admins: governance, monitoring, templates, and quality control.",
    modules: [
      "Configure roles and permission levels.",
      "Manage email templates and communication workflows.",
      "Monitor platform health, finance, and operational indicators.",
      "Review legal pages, policy updates, and compliance tasks.",
      "Maintain service quality with support and incident routines."
    ],
    actions: [
      { href: "/admin", label: "Open admin panel" },
      { href: "/legal", label: "Open legal center" },
      { href: "/resources", label: "Open resources" }
    ]
  },
  {
    title: "Track 8: Security and Trust",
    summary: "Protect account quality and reduce hiring risk.",
    modules: [
      "Use strong account credentials and keep profile data accurate.",
      "Review anti-scam flags for job posts and suspicious messages.",
      "Use trusted communication through platform channels.",
      "Track transparent decision notes for hiring actions.",
      "Follow legal pages for acceptable use and privacy obligations."
    ],
    actions: [
      { href: "/legal", label: "Open legal center" },
      { href: "/faq", label: "Read trust FAQ" },
      { href: "/support", label: "Report issue" }
    ]
  },
  {
    title: "Track 9: Performance and Growth",
    summary: "Improve conversion from profile to interview and offer.",
    modules: [
      "Measure apply-to-response ratio weekly.",
      "Measure application-to-interview conversion per role family.",
      "Update profile and resume using role-specific keywords.",
      "Prioritize roles by realistic match score and salary fit.",
      "Use saved jobs and application cadence planning.",
      "Keep messaging professional and fast.",
      "Use reminder cadence and follow-up templates to reduce drop-off."
    ],
    actions: [
      { href: "/dashboard", label: "Open dashboard" },
      { href: "/profile", label: "Optimize profile" },
      { href: "/search", label: "Find better-fit roles" }
    ]
  },
  {
    title: "Track 10: Team Onboarding Blueprint",
    summary: "Use these modules for internal training and new team members.",
    modules: [
      "Assign onboarding owners by role (job seeker, employer, admin).",
      "Use Learning Center tracks as weekly onboarding checkpoints.",
      "Audit completion using practical actions and outcomes.",
      "Document known blockers and playbooks for quick support.",
      "Repeat improvements monthly with updated templates."
    ],
    actions: [
      { href: "/learning-center", label: "Use this blueprint" },
      { href: "/resources", label: "Open resources" },
      { href: "/contact", label: "Request enterprise setup" }
    ]
  }
] as const;

const recommendations = [
  {
    title: "For Job Seekers",
    points: [
      "Finish profile + resume before first 10 applications.",
      "Use domain-specific keywords (UAV, ROS2, MLOps, SCADA, etc.).",
      "Apply in focused batches (5-10 high-match roles).",
      "Use AI tools to improve role fit explanation and cover letter.",
      "Use ATS checks and job-specific resume versions for top roles.",
      "Reply to messages within 24 hours to keep momentum."
    ],
    links: [
      { href: "/profile", label: "Profile" },
      { href: "/search", label: "Find Jobs" },
      { href: "/ai-tools", label: "AI Tools" }
    ]
  },
  {
    title: "For Employers",
    points: [
      "Start with clear scorecard and salary benchmark.",
      "Publish requirements in concrete, measurable language.",
      "Use screener questions to reduce unqualified volume.",
      "Keep ATS stages updated to avoid candidate drop-off.",
      "Send fast structured feedback after interview stages."
    ],
    links: [
      { href: "/hiring-lab", label: "Hiring Lab" },
      { href: "/employers", label: "Employer Hub" },
      { href: "/services", label: "Services" }
    ]
  },
  {
    title: "For Admin and Ops",
    points: [
      "Review weekly metrics: activation, applications, interview rate.",
      "Audit role permissions and admin actions regularly.",
      "Keep template library and legal pages current.",
      "Monitor support queue and recurring incidents.",
      "Track trust/safety signals and escalate quickly."
    ],
    links: [
      { href: "/admin", label: "Admin Panel" },
      { href: "/support", label: "Support" },
      { href: "/legal", label: "Legal" }
    ]
  },
  {
    title: "For Application Boost",
    points: [
      "Use AI Copilot in preview mode first, then enable assisted mode.",
      "Set strict minimum role-fit score before allowing AI submit.",
      "Use dedicated resume variant for each priority vacancy.",
      "Track follow-up reminders and stalled applications daily.",
      "Audit conversion weekly and remove low-value workflows."
    ],
    links: [
      { href: "/ai-tools", label: "AI Copilot" },
      { href: "/dashboard", label: "Application Hub" },
      { href: "/faq", label: "Boost FAQ" }
    ]
  },
  {
    title: "For Trust, Legal, and Billing",
    points: [
      "Read privacy, terms, cookies, and AI disclosure before large campaigns.",
      "Align billing plans and access rights with actual team structure.",
      "Store communication and decision logs for transparency.",
      "Limit access to sensitive profile and finance data by role.",
      "Review policy updates monthly."
    ],
    links: [
      { href: "/legal", label: "Legal Center" },
      { href: "/admin", label: "Admin Governance" },
      { href: "/support", label: "Support" }
    ]
  }
] as const;

export default function LearningCenterPage() {
  return (
    <section>
      <p className="kicker">Learning Center</p>
      <h1 className="page-title">Learning Center</h1>
      <p className="page-subtitle">
        Learn AGRON Work from the first step to advanced workflows. Clear tracks, simple modules, and direct links to action.
      </p>

      <article className="card role-profile-card">
        <h3>Start Here: First-Step Roadmap</h3>
        <p className="page-subtitle">Use this sequence to launch correctly from day one.</p>
        <div className="learning-roadmap-grid">
          {firstSteps.map((step, index) => (
            <div key={step} className="learning-roadmap-item">
              <span className="learning-roadmap-step">Step {index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="learning-grid">
        {learningTracks.map((track, index) => (
          <article key={track.title} className="card learning-card">
            <div className="learning-head">
              <span className="learning-index">Module Group {index + 1}</span>
              <h3>{track.title}</h3>
            </div>
            <p>{track.summary}</p>
            <details className="clean-collapse" open={index === 0}>
              <summary>Show modules</summary>
              <ol className="legal-list">
                {track.modules.map((module) => (
                  <li key={module}>{module}</li>
                ))}
              </ol>
            </details>
            <div className="row">
              {track.actions.map((action) => (
                <Link key={`${track.title}-${action.href}`} href={action.href} className="btn ghost">
                  {action.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>

      <article className="card role-profile-card">
        <h3>Practical Recommendations</h3>
        <p className="page-subtitle">Recommendations by user type to improve outcomes faster.</p>
        <div className="learning-reco-grid">
          {recommendations.map((item) => (
            <article key={item.title} className="learning-reco-card">
              <h4>{item.title}</h4>
              <ul className="legal-list">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="row compact">
                {item.links.map((link) => (
                  <Link key={`${item.title}-${link.href}`} href={link.href} className="btn ghost">
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </article>

      <article className="card role-profile-card">
        <details className="clean-collapse" open>
          <summary>Recommended learning path</summary>
          <ol className="legal-list">
            <li>First Steps</li>
            <li>Job Search and Applications</li>
            <li>AI Application Copilot</li>
            <li>Employer Quick Start</li>
            <li>ATS Pipeline Operations</li>
            <li>ATS Resume and Content Optimization</li>
            <li>Admin and Platform Operations</li>
            <li>Security and Trust</li>
            <li>Performance and Growth</li>
            <li>Team Onboarding Blueprint</li>
          </ol>
          <div className="row">
            <Link href="/faq" className="btn solid">Open FAQ</Link>
            <Link href="/support" className="btn ghost">Open Support</Link>
            <Link href="/contact" className="btn ghost">Open Contact</Link>
          </div>
        </details>
      </article>
    </section>
  );
}
