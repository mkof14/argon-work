"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSettings, useTranslation } from "./AppProviders";
import { BrandLogo } from "./BrandLogo";
import { translations } from "../lib/i18n";
import { trackEvent } from "../lib/analytics";

const enabledLocales = ["en", "es", "ru", "uk", "ar", "he"] as const;
const navLabels = {
  part107: { en: "Part 107", es: "Part 107", ru: "Part 107", uk: "Part 107", ar: "Part 107", he: "Part 107" },
  simulator: { en: "Simulator", es: "Simulador", ru: "Симулятор", uk: "Симулятор", ar: "المحاكي", he: "סימולטור" },
  corporate: { en: "Corporate", es: "Corporativo", ru: "Корпоратив", uk: "Корпоратив", ar: "مؤسسي", he: "ארגוני" },
  faq: { en: "FAQ", es: "FAQ", ru: "FAQ", uk: "FAQ", ar: "الأسئلة الشائعة", he: "שאלות נפוצות" },
  start: { en: "Start Training", es: "Iniciar entrenamiento", ru: "Начать обучение", uk: "Почати навчання", ar: "ابدأ التدريب", he: "התחל הכשרה" }
} as const;

export function SiteFooter() {
  const t = useTranslation();
  const { locale, setLocale, localizePath, theme, toggleTheme, forceRtl, toggleForceRtl } = useAppSettings();
  const shortLocale = (enabledLocales.includes(locale as (typeof enabledLocales)[number]) ? locale : "en") as (typeof enabledLocales)[number];
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-block">
          <BrandLogo href={localizePath("/")} />
          <p>{t.footer.mission}</p>
        </div>

        <div className="footer-block">
          <h4>{t.footer.menuTitle}</h4>
          <Link href={localizePath("/")}>{t.nav.home}</Link>
          <Link href={localizePath("/programs")}>{t.nav.programs}</Link>
          <Link href={localizePath("/part-107")}>{navLabels.part107[shortLocale]}</Link>
          <Link href={localizePath("/simulator")}>{navLabels.simulator[shortLocale]}</Link>
          <Link href={localizePath("/corporate")}>{navLabels.corporate[shortLocale]}</Link>
          <Link href={localizePath("/faq")}>{navLabels.faq[shortLocale]}</Link>
          <Link href={localizePath("/about")}>{t.nav.about}</Link>
          <Link href={localizePath("/contact")}>{t.nav.contact}</Link>
        </div>

        <div className="footer-block">
          <h4>{t.footer.accountTitle}</h4>
          <Link href={localizePath("/auth/login")}>{t.nav.login}</Link>
          <Link href={localizePath("/dashboard")}>{t.dashboard.title}</Link>
          <Link href={localizePath("/admin")}>{t.nav.admin}</Link>
        </div>

        <div className="footer-block">
          <h4>{t.footer.legalTitle}</h4>
          <Link href={localizePath("/legal/terms")}>{t.footer.legal.terms}</Link>
          <Link href={localizePath("/legal/privacy")}>{t.footer.legal.privacy}</Link>
          <Link href={localizePath("/legal/cookies")}>{t.footer.legal.cookies}</Link>
          <Link href={localizePath("/legal/disclaimer")}>{t.footer.legal.disclaimer}</Link>
          <Link href={localizePath("/legal/accessibility")}>{t.footer.legal.accessibility}</Link>
          <Link href={localizePath("/legal/refund-policy")}>{t.footer.legal.refund}</Link>
        </div>
      </div>
      <div className="footer-language">
        <div className="control-row">
          <details className="lang-dropdown">
            <summary className="lang-dropdown-trigger">
              <span className="globe-icon" aria-hidden="true" /> {translations[locale].localeLabel}
            </summary>
            <div className="lang-dropdown-menu" role="listbox" aria-label={t.controls.language}>
              {enabledLocales.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={locale === item ? "lang-chip active" : "lang-chip"}
                  onClick={() => {
                    trackEvent("language_switch", { source: "footer", locale_to: item });
                    setLocale(item);
                  }}
                >
                  {translations[item].localeLabel}
                </button>
              ))}
            </div>
          </details>
          {process.env.NODE_ENV !== "production" ? (
            <button
              className="mini-control"
              type="button"
              onClick={toggleForceRtl}
              title="Force RTL in dev"
            >
              RTL {forceRtl ? "ON" : "OFF"}
            </button>
          ) : null}
          <button className="mini-control theme-toggle" type="button" onClick={toggleTheme} title={t.controls.theme}>
            <span className={theme === "light" ? "theme-orb sun-mode" : "theme-orb moon-mode"} />
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              trackEvent("cta_click", { source: "footer", cta: "start_training", locale });
              setIsStartModalOpen(true);
            }}
          >
            {navLabels.start[shortLocale]}
          </button>
        </div>
      </div>
      <div className="footer-bottom">{t.footer.copyright}</div>
      {isStartModalOpen ? (
        <div className="cta-modal-backdrop" role="dialog" aria-modal="true" aria-label="Start training">
          <article className="card cta-modal">
            <h3>I want to start with:</h3>
            <div className="cta-modal-grid">
              <Link className="btn btn-primary" href={localizePath("/part-107#part107-enroll")} onClick={() => setIsStartModalOpen(false)}>
                I want Part 107
              </Link>
              <Link className="btn btn-secondary" href={localizePath("/flight-skills#skills-enroll")} onClick={() => setIsStartModalOpen(false)}>
                I want Flight Skills
              </Link>
              <Link className="btn btn-secondary" href={localizePath("/simulator#sim-waitlist")} onClick={() => setIsStartModalOpen(false)}>
                I want Simulator
              </Link>
              <Link className="btn btn-secondary" href={localizePath("/corporate#corporate-form")} onClick={() => setIsStartModalOpen(false)}>
                Corporate training
              </Link>
            </div>
            <button className="btn btn-secondary" type="button" onClick={() => setIsStartModalOpen(false)}>
              Close
            </button>
          </article>
        </div>
      ) : null}
    </footer>
  );
}
