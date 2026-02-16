import { NextRequest, NextResponse } from "next/server";

const supportedLocales = ["en", "es", "ru", "uk", "ar", "he"];
const defaultLocale = "en";

function detectLocale(header: string | null) {
  if (!header) return defaultLocale;
  const normalized = header.toLowerCase();
  for (const locale of supportedLocales) {
    if (normalized.includes(locale)) {
      return locale;
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hasLocalePrefix = supportedLocales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get("agron_locale")?.value;
  const locale = supportedLocales.includes(cookieLocale ?? "")
    ? cookieLocale!
    : detectLocale(request.headers.get("accept-language"));

  const nextUrl = request.nextUrl.clone();
  nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(nextUrl);
  response.cookies.set("agron_locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"]
};
