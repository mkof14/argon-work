import { I18nManager } from "react-native";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isRtlLocale, type LocaleCode } from "../config/locales";
import { getItem, setItem } from "../storage/local-store";
import { messages } from "./messages";

const LOCALE_KEY = "agron_mobile_locale";

export function resolveLocale(input?: string): LocaleCode {
  if (!input) {
    return DEFAULT_LOCALE;
  }

  const normalized = input.toLowerCase().split("-")[0];
  if (SUPPORTED_LOCALES.includes(normalized as LocaleCode)) {
    return normalized as LocaleCode;
  }

  return DEFAULT_LOCALE;
}

export async function getPersistedLocale() {
  const value = await getItem(LOCALE_KEY);
  return resolveLocale(value ?? undefined);
}

export async function setPersistedLocale(locale: LocaleCode) {
  await setItem(LOCALE_KEY, locale);
}

export function applyDirection(locale: LocaleCode): boolean {
  const shouldBeRtl = isRtlLocale(locale);
  if (I18nManager.isRTL !== shouldBeRtl) {
    I18nManager.allowRTL(shouldBeRtl);
    I18nManager.forceRTL(shouldBeRtl);
  }
  return shouldBeRtl;
}

export function t(locale: LocaleCode, key: keyof (typeof messages)["en"]): string {
  return messages[locale][key] ?? messages.en[key];
}
