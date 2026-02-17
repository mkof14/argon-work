const channels = [
  { title: "General", email: "hello@agron.work", text: "General platform questions and guidance." },
  { title: "Enterprise", email: "enterprise@agron.work", text: "Enterprise hiring and integration support." },
  { title: "Support", email: "support@agron.work", text: "Technical and account support requests." },
  { title: "Billing", email: "billing@agron.work", text: "Invoices, payments, and billing operations." },
  { title: "Security", email: "security@agron.work", text: "Security reports and responsible disclosure." },
  { title: "Partnerships", email: "partners@agron.work", text: "Partnership and ecosystem proposals." }
];

export default function ContactPage() {
  return (
    <section>
      <p className="kicker">Contact</p>
      <h1 className="page-title">Contact AGRON Work</h1>
      <p className="page-subtitle">Partnerships, enterprise hiring, platform operations, and support.</p>
      <div className="cards compact-cards">
        {channels.map((channel) => (
          <details key={channel.title} className="card clean-collapse">
            <summary>{channel.title}</summary>
            <p>{channel.email}</p>
            <p>{channel.text}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
