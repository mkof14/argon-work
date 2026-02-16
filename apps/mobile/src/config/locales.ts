export const SUPPORTED_LOCALES = ["en", "ru", "uk", "es", "ar", "he"] as const;

export type LocaleCode = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: LocaleCode = "en";

export function isRtlLocale(locale: string): boolean {
  return locale === "ar" || locale === "he";
}
