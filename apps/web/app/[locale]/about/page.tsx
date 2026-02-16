import type { Metadata } from "next";

export { default } from "../../about/page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const aboutMeta = {
  en: {
    title: "About AGRON | Professional Drone Training & Operational Readiness",
    description:
      "AGRON delivers structured drone training aligned with FAA Part 107 standards, combining regulatory knowledge, simulator-based practice, and operational discipline."
  },
  ru: {
    title: "О компании AGRON | Профессиональное обучение пилотов дронов",
    description:
      "AGRON предоставляет структурированное обучение дронам в соответствии с FAA Part 107, объединяя теорию, симуляцию и операционную дисциплину."
  },
  uk: {
    title: "Про AGRON | Професійне навчання операторів дронів",
    description:
      "AGRON надає структуроване навчання відповідно до FAA Part 107 з поєднанням симуляції та операційної дисципліни."
  },
  es: {
    title: "Sobre AGRON | Formación Profesional en Drones",
    description:
      "AGRON ofrece formación estructurada alineada con FAA Part 107, combinando conocimiento regulatorio, simulación y disciplina operativa."
  },
  ar: {
    title: "حول AGRON | تدريب احترافي للطائرات بدون طيار",
    description:
      "AGRON تقدم تدريبًا منظمًا متوافقًا مع FAA Part 107 مع تركيز على المحاكاة والانضباط التشغيلي."
  },
  he: {
    title: "אודות AGRON | הכשרה מקצועית לרחפנים",
    description:
      "AGRON מספקת הכשרה מובנית בהתאם ל-FAA Part 107 עם דגש על סימולציה ומשמעת תפעולית."
  }
} as const;

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as keyof typeof aboutMeta;
  const data = aboutMeta[locale] ?? aboutMeta.en;

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: `${siteUrl}/en/about`,
        es: `${siteUrl}/es/about`,
        ru: `${siteUrl}/ru/about`,
        uk: `${siteUrl}/uk/about`,
        ar: `${siteUrl}/ar/about`,
        he: `${siteUrl}/he/about`,
        "x-default": `${siteUrl}/en/about`
      }
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${siteUrl}/${locale}/about`
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description
    }
  };
}
