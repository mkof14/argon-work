"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("agron_work_theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("agron_work_theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      applyTheme(stored);
      return;
    }

    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = preferredDark ? "dark" : "light";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        applyTheme(next);
      }}
    >
      <span className={theme === "light" ? "orb sun" : "orb moon"} aria-hidden="true" />
    </button>
  );
}
