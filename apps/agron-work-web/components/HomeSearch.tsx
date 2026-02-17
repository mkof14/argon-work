"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function HomeSearch() {
  const router = useRouter();
  const [what, setWhat] = useState("");
  const [where, setWhere] = useState("Remote");
  const [employmentType, setEmploymentType] = useState("Full-time");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (what.trim()) params.set("what", what.trim());
    if (where.trim()) params.set("where", where.trim());
    if (employmentType.trim()) params.set("type", employmentType.trim());
    router.push(`/search?${params.toString()}`);
  }

  return (
    <article className="card search-box">
      <h3>Find jobs the traditional way</h3>
      <form className="indeed-search-bar" onSubmit={onSubmit}>
        <label className="field search-field-wide">
          <span>What</span>
          <input
            className="input"
            placeholder="Job title, keywords, or company"
            value={what}
            onChange={(event) => setWhat(event.target.value)}
          />
        </label>
        <label className="field search-field-narrow">
          <span>Where</span>
          <input
            className="input"
            placeholder="City, state, ZIP, or remote"
            value={where}
            onChange={(event) => setWhere(event.target.value)}
          />
        </label>
        <button type="submit" className="btn solid">Find jobs</button>
      </form>
      <details className="clean-collapse home-search-collapse" open>
        <summary>Employment Type and Mode</summary>
        <div className="row compact search-row-inline">
          <label className="field search-type-field">
            <span>Employment type</span>
            <select value={employmentType} onChange={(event) => setEmploymentType(event.target.value)}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </label>
        </div>
      </details>
      <details className="clean-collapse home-search-collapse">
        <summary>Why this platform</summary>
        <div className="home-benefits-row">
          <article className="home-benefit">
            <h4>Direct Hiring</h4>
            <p>Post jobs, receive applications, shortlist candidates, and hire without middlemen.</p>
          </article>
          <article className="home-benefit">
            <h4>Verified Skills</h4>
            <p>Skill passports, certifications, project history, and trust signals for better hiring quality.</p>
          </article>
          <article className="home-benefit">
            <h4>Simple Process</h4>
            <p>Clear onboarding, clear filters, and clear hiring status for both sides.</p>
          </article>
        </div>
      </details>
    </article>
  );
}
