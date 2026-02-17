import Link from "next/link";

const services = [
  {
    title: "Remote Command Centers",
    text: "24/7 remote control for drone and robotic fleets with operator shifts, failover protocols, and live incident escalation."
  },
  {
    title: "Observation and Monitoring",
    text: "Video streams, telemetry dashboards, anomaly detection, and event triage for infrastructure, agriculture, and logistics operations."
  },
  {
    title: "Operational Analytics",
    text: "Mission performance metrics, predictive maintenance scoring, and AI-generated reports for faster decisions."
  },
  {
    title: "Automation and Orchestration",
    text: "Workflow automation, AI-agent pipelines, and process orchestration for high-volume operations."
  },
  {
    title: "Enterprise Hiring Programs",
    text: "Dedicated staffing tracks for junior to director-level experts in AI, robotics, data, and field services."
  },
  {
    title: "Project and Program Delivery",
    text: "Project managers, program leaders, and operations managers to run large-scale autonomous service rollouts."
  }
];

const serviceFlows = [
  "Profile + resume + verification",
  "Search + match + shortlist",
  "Messaging + interview + offer",
  "Delivery + analytics + reporting",
  "Admin governance + rights + monitoring"
];

export default function ServicesPage() {
  return (
    <section>
      <h1 className="page-title">Platform Services</h1>
      <p className="page-subtitle">
        End-to-end services for remote operations, monitoring, analytics, automation, and talent delivery.
      </p>
      <article className="card role-profile-card">
        <details className="clean-collapse" open>
          <summary>Service Implementation Logic</summary>
          <ol className="legal-list">
            <li>Assess operation goals, workloads, and coverage requirements.</li>
            <li>Select service modules and staffing model.</li>
            <li>Launch workflows with monitoring and SLA baselines.</li>
            <li>Continuously optimize through analytics and automation.</li>
          </ol>
        </details>
      </article>
      <div className="chips">
        <span className="chip">24/7 Ops Coverage</span>
        <span className="chip">Incident Escalation Matrix</span>
        <span className="chip">SLA + KPI Reporting</span>
      </div>
      <div className="cards compact-cards">
        {services.slice(0, 4).map((service) => (
          <details key={service.title} className="card clean-collapse">
            <summary>{service.title}</summary>
            <p>{service.text}</p>
          </details>
        ))}
      </div>

      <article className="card role-profile-card">
        <h3>Service Flow</h3>
        <ul className="legal-list">
          {serviceFlows.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <div className="row">
        <Link className="btn solid" href="/ai-tools">Open AI Tools</Link>
        <Link className="btn ghost" href="/contact">Request enterprise setup</Link>
      </div>
    </section>
  );
}
