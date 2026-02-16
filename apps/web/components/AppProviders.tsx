"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, rtlLocales, translations } from "../lib/i18n";

type Theme = "light" | "dark";
const enabledLocales = ["en", "es", "ru", "uk", "ar", "he"] as const;

type AppContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  localizePath: (path: string) => string;
  theme: Theme;
  toggleTheme: () => void;
  forceRtl: boolean;
  toggleForceRtl: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function extractLocale(pathname: string): Locale | null {
  const segment = pathname.split("/").filter(Boolean)[0] as Locale | undefined;
  if (segment && enabledLocales.includes(segment as (typeof enabledLocales)[number])) {
    return segment;
  }
  return null;
}

function removeLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (
    parts.length > 0 &&
    enabledLocales.includes(parts[0] as (typeof enabledLocales)[number])
  ) {
    const tail = parts.slice(1).join("/");
    return tail ? `/${tail}` : "/";
  }
  return pathname || "/";
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [forceRtl, setForceRtl] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("agron_theme") as Theme | null;
    const storedForceRtl = localStorage.getItem("agron_force_rtl");
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
    }
    if (storedForceRtl === "1") {
      setForceRtl(true);
    }
  }, []);

  useEffect(() => {
    const pathLocale = extractLocale(pathname);

    if (pathLocale) {
      setLocaleState(pathLocale);
      localStorage.setItem("agron_locale", pathLocale);
      document.cookie = `agron_locale=${pathLocale}; path=/; max-age=31536000`;
      document.documentElement.lang = pathLocale;
      document.documentElement.dir =
        forceRtl || rtlLocales.includes(pathLocale) ? "rtl" : "ltr";
      return;
    }

    const storedLocale = localStorage.getItem("agron_locale") as Locale | null;
    if (
      storedLocale &&
      enabledLocales.includes(storedLocale as (typeof enabledLocales)[number])
    ) {
      setLocaleState(storedLocale);
      document.documentElement.lang = storedLocale;
      document.documentElement.dir =
        forceRtl || rtlLocales.includes(storedLocale) ? "rtl" : "ltr";
    }
  }, [pathname, forceRtl]);

  useEffect(() => {
    localStorage.setItem("agron_theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function localizePath(path: string) {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${normalized === "/" ? "" : normalized}`;
  }

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);
    localStorage.setItem("agron_locale", nextLocale);
    document.cookie = `agron_locale=${nextLocale}; path=/; max-age=31536000`;

    const pathWithoutLocale = removeLocalePrefix(pathname);
    const nextPath = `/${nextLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
    router.push(nextPath);
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      localizePath,
      theme,
      toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light")),
      forceRtl,
      toggleForceRtl: () => {
        const next = !forceRtl;
        setForceRtl(next);
        localStorage.setItem("agron_force_rtl", next ? "1" : "0");
        document.documentElement.dir = next || rtlLocales.includes(locale) ? "rtl" : "ltr";
      }
    }),
    [locale, theme, pathname, forceRtl]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppSettings() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppSettings must be used inside AppProviders");
  }

  return context;
}

export function useTranslation() {
  const { locale } = useAppSettings();
  return translations[locale];
}
