import { useEffect, useState } from "react";
import { applyDirection, getPersistedLocale, setPersistedLocale } from "../i18n";
import { DEFAULT_LOCALE, type LocaleCode } from "../config/locales";

export function useLocale() {
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getPersistedLocale().then((stored) => {
      applyDirection(stored);
      setLocaleState(stored);
      setReady(true);
    });
  }, []);

  async function setLocale(nextLocale: LocaleCode) {
    applyDirection(nextLocale);
    setLocaleState(nextLocale);
    await setPersistedLocale(nextLocale);
  }

  return { locale, setLocale, ready };
}
