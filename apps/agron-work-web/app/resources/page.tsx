const resources = [
  { title: "Hiring Playbook", text: "How to structure role requirements and screening criteria." },
  { title: "Salary Benchmarks", text: "Compensation references by level and work mode." },
  { title: "Skills Templates", text: "Job title and skills templates for common hi-tech roles." },
  { title: "Interview Checklists", text: "Interview formats for technical and operations positions." },
  { title: "Onboarding Checklist", text: "Verification, profile quality, communication setup, and first delivery plan." },
  { title: "KPI Dashboard Guide", text: "Which metrics to track in hiring, engagement, and retention." }
];

const kits = [
  "Employer starter kit",
  "Candidate profile kit",
  "Resume quality checklist",
  "Role scoring matrix",
  "Campaign message examples",
  "Operational support runbook"
];

export default function ResourcesPage() {
  return (
    <section>
      <p className="kicker">Resources</p>
      <h1 className="page-title">Guides and Templates</h1>
      <p className="page-subtitle">Simple resources for employers and job seekers.</p>
      <div className="cards compact-cards">
        {resources.map((item) => (
          <details key={item.title} className="card clean-collapse">
            <summary>{item.title}</summary>
            <p>{item.text}</p>
          </details>
        ))}
      </div>

      <article className="card role-profile-card">
        <details className="clean-collapse">
          <summary>Ready-to-use Kits</summary>
          <div className="chips">
            {kits.map((item) => (
              <span className="chip" key={item}>{item}</span>
            ))}
          </div>
        </details>
      </article>
    </section>
  );
}
