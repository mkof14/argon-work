import en from "../../messages/en/common.json";
import ru from "../../messages/ru/common.json";
import uk from "../../messages/uk/common.json";
import es from "../../messages/es/common.json";
import ar from "../../messages/ar/common.json";
import he from "../../messages/he/common.json";
import type { LocaleCode } from "../config/locales";

export type MessageDict = typeof en;

export const messages: Record<LocaleCode, MessageDict> = {
  en,
  ru,
  uk,
  es,
  ar,
  he
};
