import Link from "next/link";

const faqSections = [
  {
    title: "Getting Started",
    items: [
      {
        q: "What is AGRON Work?",
        a: "AGRON Work is a direct job and hiring platform for drone, robotics, AI, ML, data, automation, field service, and product/program professionals."
      },
      {
        q: "Who can use this platform?",
        a: "Job seekers, employers, enterprise teams, recruiters inside hiring teams, and platform admins can use AGRON Work."
      },
      {
        q: "How do I start as a job seeker?",
        a: "Create an account, complete your profile, upload your resume, choose target roles, then use Find Jobs filters and apply directly."
      },
      {
        q: "How do I start as an employer?",
        a: "Open the Employer Hub, define role requirements and salary range, publish jobs, then shortlist and message candidates."
      },
      {
        q: "Is AGRON Work available in multiple domains?",
        a: "Yes. You can browse Drone Ops, Remote Control, Robotics, Monitoring, AI/ML, Data/IT, Automation, Product & PM, and Field Service."
      }
    ]
  },
  {
    title: "Accounts and Authentication",
    items: [
      {
        q: "How do Sign In / Sign Up work?",
        a: "Use one Sign In/Up flow. New users register with onboarding steps; existing users log in with credentials."
      },
      {
        q: "Can I sign in with Google?",
        a: "Yes. Google authentication is supported in the auth flow."
      },
      {
        q: "Do I need to verify email and phone?",
        a: "Yes. Verification is part of onboarding and improves account trust and hiring quality."
      },
      {
        q: "Can I reset profile data later?",
        a: "Yes. You can edit profile fields, resume content, photo icon, and settings any time."
      },
      {
        q: "Why was my login blocked?",
        a: "Most often because of wrong credentials, expired session, or missing verification data."
      }
    ]
  },
  {
    title: "Profile and Resume",
    items: [
      {
        q: "Can I upload photo to the profile icon?",
        a: "Yes. In Profile, use the round avatar area or Add Photo to Profile Icon button. The photo appears in profile and header user icon."
      },
      {
        q: "Can I upload a resume document?",
        a: "Yes. In Resume tab you can upload PDF, DOC, or DOCX, then download or remove the file."
      },
      {
        q: "Can I still use text resume fields?",
        a: "Yes. Summary, experience, education, certifications, and languages remain editable alongside document upload."
      },
      {
        q: "How can I improve profile visibility?",
        a: "Add a clear title, measurable achievements, relevant skills, certifications, and updated location/work mode preferences."
      },
      {
        q: "Where do I manage reviews and settings?",
        a: "Inside Profile tabs: My Reviews and Settings."
      }
    ]
  },
  {
    title: "Find Jobs and Applications",
    items: [
      {
        q: "How does Find Jobs ranking work?",
        a: "Results are filtered by query, location, mode, posted window, employment type, and optional sorting by salary or seniority."
      },
      {
        q: "Can I save jobs for later?",
        a: "Yes. Use Save role in Find Jobs or catalog cards."
      },
      {
        q: "How do I apply?",
        a: "Open a role card, review details, then click Apply. You will be directed through account/profile readiness if needed."
      },
      {
        q: "Can I search only remote jobs?",
        a: "Yes. Use Remote/Hybrid filter and location field with remote keywords."
      },
      {
        q: "How do I track applications?",
        a: "Use Dashboard and Messages to track statuses and communication."
      },
      {
        q: "Is there a dedicated search API now?",
        a: "Yes. AGRON Work includes a unified search endpoint that combines role catalog results and published hiring jobs with relevance scoring."
      }
    ]
  },
  {
    title: "Open Jobs and Projects",
    items: [
      {
        q: "What is Open Jobs and Projects page for?",
        a: "It combines role discovery, project tracks, KPI snapshots, and next-step actions for fast navigation."
      },
      {
        q: "What project tracks are available?",
        a: "Examples include UAV inspection rollouts, teleoperation centers, robotics fleet reliability, AI pipelines, data governance, and automation programs."
      },
      {
        q: "Can I filter by level and domain?",
        a: "Yes. Catalog filters support domain, level, mode, and keyword matching."
      },
      {
        q: "Can I move from projects to applications directly?",
        a: "Yes. From role cards and links you can go directly to role profiles and apply flow."
      }
    ]
  },
  {
    title: "AI Tools and Hiring Lab",
    items: [
      {
        q: "What can AI Tools do for job seekers?",
        a: "AI match checks, cover-letter generation, interview preparation, and controlled auto-apply workflows."
      },
      {
        q: "Can I set safe limits for auto-apply?",
        a: "Yes. Configure daily limits, minimum match score, mode (preview/auto), work modes, and domain preferences."
      },
      {
        q: "What is Hiring Lab used for?",
        a: "Hiring Lab supports scorecards, screener questions, benchmarks, anti-scam checks, invite-to-apply, and explainable hiring notes."
      },
      {
        q: "Are AI decisions transparent?",
        a: "Yes. The platform includes explainability-oriented notes and structured decision logic."
      },
      {
        q: "Does Hiring Lab include ATS pipeline stages?",
        a: "Yes. ATS Pipeline supports candidate flow across Applied, Screen, Interview, Offer, Hired, and Rejected stages with notes and score updates."
      }
    ]
  },
  {
    title: "Learning Center and Training",
    items: [
      {
        q: "What is Learning Center?",
        a: "Learning Center is a guided training page with grouped tracks from first onboarding steps to advanced hiring and admin workflows."
      },
      {
        q: "Where do I start if I am new?",
        a: "Start with Track 1: First Steps, then continue with Job Search and Applications. Each track includes modules and direct action buttons."
      },
      {
        q: "Does Learning Center include employer training?",
        a: "Yes. It includes dedicated groups for Employer Quick Start and ATS Pipeline operations."
      },
      {
        q: "Can I use Learning Center for team onboarding?",
        a: "Yes. The grouped modules are designed for self-onboarding and team onboarding routines."
      },
      {
        q: "Where do I open Learning Center?",
        a: "Use the Learning Center link in the footer sections and All Pages list."
      }
    ]
  },
  {
    title: "Messaging, Notifications, and Privacy",
    items: [
      {
        q: "How do messages work?",
        a: "Use Messages for direct communication between candidates and employers, including updates and status discussions."
      },
      {
        q: "Can I control notifications?",
        a: "Yes. Profile Settings include email and SMS notification toggles."
      },
      {
        q: "Who can see my profile?",
        a: "Visibility is controlled by your settings and platform access logic."
      },
      {
        q: "Where can I review legal policies?",
        a: "Open Legal Center for Terms, Privacy, Cookies, AI Disclosure, Accessibility, and related documents."
      },
      {
        q: "Is there API-level protection against auth abuse?",
        a: "Yes. Authentication endpoints include request rate limiting and controlled responses for repeated attempts."
      }
    ]
  },
  {
    title: "Admin, Operations, and Billing",
    items: [
      {
        q: "What does Admin Panel include?",
        a: "Overview metrics, marketing assets, technical checks, email template library, access rights, messages, statistics, finance, and monitoring."
      },
      {
        q: "Can admin manage roles and permissions?",
        a: "Yes. Admin rights support role assignment, invites, and role audit tracking."
      },
      {
        q: "Are email templates branded?",
        a: "Yes. Templates use AGRON Work branding and support preview, send, copy, share, download, PDF, and print actions."
      },
      {
        q: "Can marketing documents be deleted?",
        a: "Yes. Marketing document records include delete action in admin workflows."
      },
      {
        q: "Where can I get support for billing or enterprise setup?",
        a: "Use Contact and Support pages for billing, enterprise onboarding, and technical assistance."
      }
    ]
  }
] as const;

export default function FaqPage() {
  const faqEntities = faqSections.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  );

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqEntities
          })
        }}
      />
      <p className="kicker">FAQ</p>
      <h1 className="page-title">Frequently Asked Questions</h1>
      <p className="page-subtitle">
        Quick answers across onboarding, profile, resume, search, AI tools, hiring workflows, admin features, legal, and support.
      </p>

      <div className="accordion-grid">
        {faqSections.map((section) => (
          <article key={section.title} className="card">
            <h3>{section.title}</h3>
            <div className="list">
              {section.items.map((item, index) => (
                <details key={item.q} className="clean-collapse" open={index === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </article>
        ))}
      </div>

      <article className="card role-profile-card">
        <details className="clean-collapse" open>
          <summary>Did not find your question?</summary>
          <p>
            Open Support or Contact and send your request. Include page name, account email, and clear steps to reproduce if this is a technical issue.
          </p>
          <div className="row">
            <Link href="/support" className="btn solid">Open Support</Link>
            <Link href="/contact" className="btn ghost">Open Contact</Link>
            <Link href="/legal" className="btn ghost">Open Legal Center</Link>
          </div>
        </details>
      </article>
    </section>
  );
}
