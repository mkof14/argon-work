import type { Metadata } from "next";
import { notFound } from "next/navigation";

const supportedLocales = ["en", "es", "ru", "uk", "ar", "he"] as const;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const localeMeta = {
  en: {
    title: "AGRON | Drone Training and Simulator",
    description: "Professional drone training, FAA Part 107 prep, and simulator workflows."
  },
  es: {
    title: "AGRON | Entrenamiento de drones y simulador",
    description: "Entrenamiento profesional de drones, preparación Part 107 y simulador."
  },
  ru: {
    title: "AGRON | Обучение пилотов дронов и симулятор",
    description: "Профессиональное обучение пилотов дронов, подготовка Part 107 и симулятор."
  },
  uk: {
    title: "AGRON | Навчання операторів дронів та симулятор",
    description: "Професійне навчання операторів дронів, підготовка Part 107 і симулятор."
  },
  ar: {
    title: "AGRON | تدريب الطائرات بدون طيار والمحاكي",
    description: "تدريب احترافي للطائرات بدون طيار وإعداد Part 107 ومسارات المحاكاة."
  },
  he: {
    title: "AGRON | הדרכת רחפנים וסימולטור",
    description: "הכשרה מקצועית לרחפנים, הכנה ל-Part 107 ותרחישי סימולציה."
  }
} as const;

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as (typeof supportedLocales)[number];
  const data = localeMeta[locale] ?? localeMeta.en;

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        es: `${siteUrl}/es`,
        ru: `${siteUrl}/ru`,
        uk: `${siteUrl}/uk`,
        ar: `${siteUrl}/ar`,
        he: `${siteUrl}/he`,
        "x-default": `${siteUrl}/en`
      }
    },
    openGraph: {
      title: data.title,
      description: data.description,
      locale,
      url: `${siteUrl}/${locale}`
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description
    }
  };
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as (typeof supportedLocales)[number];
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";
  return (
    <div lang={locale} dir={dir}>
      {children}
    </div>
  );
}
