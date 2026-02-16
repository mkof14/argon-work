"use client";

import { useState } from "react";
import { useAppSettings } from "./AppProviders";
import { trackEvent } from "../lib/analytics";

type LeadFormProps = {
  sourcePage: string;
  className?: string;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
  successMessage?: string;
};

export function LeadForm({
  sourcePage,
  className,
  title = "Get a training plan",
  subtitle = "Tell us your goal - we’ll reply with the right track and timeline.",
  submitLabel = "Send",
  successMessage = "Thanks. We’ll respond by email."
}: LeadFormProps) {
  const { locale } = useAppSettings();
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    email: "",
    name: "",
    interest: "part-107",
    company: "",
    message: "",
    website: ""
  });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("Submitting...");
    trackEvent("form_start", { form: "lead", page: sourcePage, locale });

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        email: form.email,
        name: form.name,
        interest: form.interest,
        company: form.interest === "corporate" ? form.company : "",
        message: form.message,
        sourcePage,
        website: form.website
      })
    });

    if (response.ok) {
      setStatus(successMessage);
      setForm({
        email: "",
        name: "",
        interest: "part-107",
        company: "",
        message: "",
        website: ""
      });
      trackEvent("form_submit", { form: "lead", page: sourcePage, locale, status: "success" });
      return;
    }

    setStatus("Submission failed.");
    trackEvent("form_submit", { form: "lead", page: sourcePage, locale, status: "error" });
  }

  return (
    <article className={`card ${className ?? ""}`.trim()}>
      <h3>{title}</h3>
      <p className="page-lead">{subtitle}</p>
      <form className="simple-form" onSubmit={submit}>
        <input
          className="input"
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
        />
        <input
          className="input"
          placeholder="Name (optional)"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
        />
        <select
          className="input"
          value={form.interest}
          onChange={(event) => setForm((current) => ({ ...current, interest: event.target.value }))}
        >
          <option value="part-107">Part 107</option>
          <option value="flight-skills">Flight Skills</option>
          <option value="simulator">Simulator</option>
          <option value="corporate">Corporate training</option>
        </select>
        {form.interest === "corporate" ? (
          <input
            className="input"
            placeholder="Company"
            value={form.company}
            onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
          />
        ) : null}
        <textarea
          className="input"
          placeholder="Message (optional)"
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
        />
        <input
          className="input"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
        />
        <button className="btn btn-primary" type="submit">{submitLabel}</button>
      </form>
      {status ? <p className="page-lead">{status}</p> : null}
    </article>
  );
}
