const topics = [
  "Account access and verification",
  "Profile, resume, and portfolio setup",
  "Posting jobs and managing applications",
  "Role permissions and admin controls",
  "Email templates and campaign operations",
  "Monitoring, technical health, and incidents"
];

export default function SupportPage() {
  return (
    <section>
      <p className="kicker">Support</p>
      <h1 className="page-title">Help and Support</h1>
      <p className="page-subtitle">
        Need help with account access, profile setup, hiring flow, or legal questions? We support both employers and job seekers.
      </p>
      <div className="cards compact-cards">
        <details className="card clean-collapse" open>
          <summary>Account Support</summary>
          <p>Login, verification, onboarding, and profile setup.</p>
        </details>
        <details className="card clean-collapse">
          <summary>Hiring Support</summary>
          <p>Role setup, filters, candidate search, messaging, and process configuration.</p>
        </details>
        <details className="card clean-collapse">
          <summary>Policy Support</summary>
          <p>Legal terms, privacy, compliance, and operational requirements.</p>
        </details>
      </div>

      <article className="card role-profile-card">
        <details className="clean-collapse" open>
          <summary>Support Topics</summary>
          <ul className="legal-list">
            {topics.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </article>
    </section>
  );
}
