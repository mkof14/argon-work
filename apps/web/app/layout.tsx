import type { Metadata } from "next";
import { AppProviders } from "../components/AppProviders";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "AGRON",
  description: "Drone training and operations platform",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  icons: {
    icon: "/brand/agron-mark.svg",
    shortcut: "/brand/agron-mark.svg",
    apple: "/brand/agron-mark.svg"
  },
  openGraph: {
    title: "AGRON",
    description: "AERIAL-GROUND ROBOTICS OPERATIONS NETWORK",
    images: ["/brand/agron-logo.svg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <AppProviders>
          <main className="site-shell">
            <SiteHeader />
            {children}
            <SiteFooter />
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
