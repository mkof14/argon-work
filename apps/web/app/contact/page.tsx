"use client";

import Image from "next/image";
import { useTranslation } from "../../components/AppProviders";
import { LeadForm } from "../../components/LeadForm";

export default function ContactPage() {
  const t = useTranslation();

  return (
    <section>
      <span className="page-kicker">Partnership Channel</span>
      <h1 className="page-title">{t.contact.title}</h1>
      <div className="title-accent-line" />
      <div className="about-image-compact">
        <article className="card" style={{ marginBottom: 16 }}>
          <Image
            src="/brand/AGRON_Training_Center.webp"
            alt="AGRON training center"
            width={1536}
            height={1024}
            className="programs-hero-image"
          />
        </article>
      </div>
      <div className="grid">
        <article className="card">
          <p>{t.contact.partnerships}</p>
        </article>
        <article className="card">
          <p>{t.contact.sales}</p>
        </article>
        <article className="card">
          <p>{t.contact.email}</p>
        </article>
        <article className="card">
          <h3>Calendar Booking</h3>
          <p>Example booking link: https://cal.example.com/agron</p>
        </article>
      </div>
      <LeadForm
        sourcePage="contact"
        className="about-card"
        title="Build Your Drone Capability with Structure"
        subtitle="Tell us your goal. We’ll recommend the correct training path."
        submitLabel="Request Training Plan"
        successMessage="Thank you. Our team will contact you shortly."
      />
    </section>
  );
}
