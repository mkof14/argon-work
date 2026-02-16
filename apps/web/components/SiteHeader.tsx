"use client";

import Link from "next/link";
import { useAppSettings, useTranslation } from "./AppProviders";
import { BrandLogo } from "./BrandLogo";
import { translations } from "../lib/i18n";
import { trackEvent } from "../lib/analytics";
import { AuthControls } from "./AuthControls";

const enabledLocales = ["en", "es", "ru", "uk", "ar", "he"] as const;
const navLabels = {
  simulator: { en: "Simulator", es: "Simulador", ru: "Симулятор", uk: "Симулятор", ar: "المحاكي", he: "סימולטור" },
  corporate: { en: "Corporate", es: "Corporativo", ru: "Корпоратив", uk: "Корпоратив", ar: "مؤسسي", he: "ארגוני" },
  faq: { en: "FAQ", es: "FAQ", ru: "FAQ", uk: "FAQ", ar: "الأسئلة الشائعة", he: "שאלות נפוצות" }
} as const;

export function SiteHeader() {
  const t = useTranslation();
  const { locale, setLocale, localizePath, theme, toggleTheme } = useAppSettings();
  const shortLocale = (enabledLocales.includes(locale as (typeof enabledLocales)[number]) ? locale : "en") as (typeof enabledLocales)[number];

  return (
    <header className="nav">
      <BrandLogo compact href={localizePath("/")} />
      <nav className="nav-links">
        <Link href={localizePath("/programs")}>{t.nav.programs}</Link>
        <Link href={localizePath("/simulator")}>{navLabels.simulator[shortLocale]}</Link>
        <Link href={localizePath("/corporate")}>{navLabels.corporate[shortLocale]}</Link>
        <Link href={localizePath("/about")}>{t.nav.about}</Link>
        <Link href={localizePath("/contact")}>{t.nav.contact}</Link>
      </nav>
      <div className="control-row">
        <details className="lang-dropdown header-lang">
          <summary className="lang-dropdown-trigger" aria-label={t.controls.language}>
            <span className="globe-icon" aria-hidden="true" />
          </summary>
          <div className="lang-dropdown-menu" role="listbox" aria-label={t.controls.language}>
            {enabledLocales.map((item) => (
              <button
                key={item}
                type="button"
                className={locale === item ? "lang-chip active" : "lang-chip"}
                onClick={() => {
                  trackEvent("language_switch", { source: "header", locale_to: item });
                  setLocale(item);
                }}
              >
                {translations[item].localeLabel}
              </button>
            ))}
          </div>
        </details>
        <button
          className="mini-control theme-toggle"
          type="button"
          onClick={toggleTheme}
          title={t.controls.theme}
          aria-label={t.controls.theme}
        >
          <span className={theme === "light" ? "theme-orb sun-mode" : "theme-orb moon-mode"} />
        </button>
        <AuthControls />
      </div>
    </header>
  );
}
