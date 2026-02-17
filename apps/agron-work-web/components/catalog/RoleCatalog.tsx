"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { allDomains, allLevels, allModes, RoleCard } from "../../lib/roles";

type Props = {
  roles: RoleCard[];
  title?: string;
  subtitle?: string;
  presetDomain?: string;
};

export function RoleCatalog({ roles, title, subtitle, presetDomain = "all" }: Props) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState(presetDomain);
  const [level, setLevel] = useState("all");
  const [mode, setMode] = useState("all");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return roles.filter((role) => {
      const byDomain = domain === "all" || role.domain === domain;
      const byLevel = level === "all" || role.level === level;
      const byMode = mode === "all" || role.mode === mode;
      const byQuery =
        q.length === 0 ||
        role.title.toLowerCase().includes(q) ||
        role.summary.toLowerCase().includes(q) ||
        role.tags.some((tag) => tag.toLowerCase().includes(q));

      return byDomain && byLevel && byMode && byQuery;
    });
  }, [roles, query, domain, level, mode]);

  return (
    <section className="catalog">
      {title ? <h1 className="page-title">{title}</h1> : null}
      {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
      <div className="chips">
        <span className="chip">Filtered roles: {filtered.length}</span>
        <span className="chip">Saved roles: {savedIds.length}</span>
      </div>

      <article className="filter-panel card">
        <details className="clean-collapse" open>
          <summary>Search and filters</summary>
          <div className="filters">
            <label className="field">
              <span>Search</span>
              <input
                className="input"
                placeholder="Role, technology, skill, keyword"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <label className="field">
              <span>Domain</span>
              <select value={domain} onChange={(event) => setDomain(event.target.value)}>
                <option value="all">All domains</option>
                {allDomains.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Level</span>
              <select value={level} onChange={(event) => setLevel(event.target.value)}>
                <option value="all">All levels</option>
                {allLevels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Work mode</span>
              <select value={mode} onChange={(event) => setMode(event.target.value)}>
                <option value="all">All modes</option>
                {allModes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </details>
      </article>

      <p className="result-line">Found roles: {filtered.length}</p>

      <div className="catalog-grid">
        {filtered.map((role) => (
          <article key={role.id} className="card role-card">
            <p className="meta">{role.domain} · {role.level} · {role.mode}</p>
            <h3>{role.title}</h3>
            <p>{role.summary}</p>
            <details className="clean-collapse">
              <summary>Skills</summary>
              <div className="chips">
                {role.tags.map((tag) => (
                  <span className="chip" key={`${role.id}-${tag}`}>{tag}</span>
                ))}
              </div>
            </details>
            <div className="row">
              <Link className="btn ghost" href={`/roles/${role.id}`}>Open profile</Link>
              <Link className="btn solid" href="/auth/login?mode=register">Apply</Link>
              <button
                type="button"
                className="btn ghost"
                onClick={() =>
                  setSavedIds((prev) =>
                    prev.includes(role.id) ? prev.filter((id) => id !== role.id) : [...prev, role.id]
                  )
                }
              >
                {savedIds.includes(role.id) ? "Saved" : "Save"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
