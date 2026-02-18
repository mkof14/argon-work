import type { Metadata } from "next";
import { WorkHeader } from "../components/WorkHeader";
import { WorkFooter } from "../components/WorkFooter";
import { SiteTopicGuide } from "../components/SiteTopicGuide";
import { RouteThemeSync } from "../components/RouteThemeSync";
import { getSiteUrl } from "../lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AGRON Work",
    template: "%s | AGRON Work"
  },
  description: "Direct hiring platform for drone, robotics, AI, ML, data and automation professionals.",
  keywords: [
    "jobs",
    "hiring",
    "drone pilot jobs",
    "robotics jobs",
    "AI jobs",
    "ML jobs",
    "data jobs",
    "automation jobs",
    "remote operations",
    "AGRON Work"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "AGRON Work",
    description: "Direct hiring for autonomous-era professionals and employers.",
    url: siteUrl,
    siteName: "AGRON Work",
    type: "website",
    images: [
      {
        url: "/brand/agron_blue.webp",
        width: 1200,
        height: 630,
        alt: "AGRON Work"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AGRON Work",
    description: "Direct hiring platform for drone, robotics, AI and data roles.",
    images: ["/brand/agron_blue.webp"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <RouteThemeSync />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AGRON Work",
              alternateName: "Aerial-Ground Robotics Operations Network Work",
              url: siteUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/search?what={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <main className="shell">
          <WorkHeader />
          {children}
          <SiteTopicGuide />
          <WorkFooter />
        </main>
      </body>
    </html>
  );
}
