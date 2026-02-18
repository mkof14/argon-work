"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function detectSection(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/search") || pathname.startsWith("/jobs") || pathname.startsWith("/roles")) return "search";
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) return "admin";
  if (pathname.startsWith("/ai-tools") || pathname.startsWith("/hiring-lab")) return "ai";
  if (pathname.startsWith("/profile") || pathname.startsWith("/messages") || pathname.startsWith("/auth")) return "profile";
  if (pathname.startsWith("/specialties") || pathname.startsWith("/domains")) return "domains";
  if (pathname.startsWith("/learning-center")) return "platform";
  if (pathname.startsWith("/legal") || pathname.startsWith("/faq")) return "legal";
  return "platform";
}

export function RouteThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    const nextSection = detectSection(pathname ?? "/");
    document.documentElement.setAttribute("data-section", nextSection);
  }, [pathname]);

  return null;
}
