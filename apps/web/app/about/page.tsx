"use client";

import Image from "next/image";
import { useAppSettings } from "../../components/AppProviders";

type LocaleKey = "en" | "ru" | "uk" | "es" | "ar" | "he";

type AboutLocaleContent = {
  kicker: string;
  pageTitle: string;
  additions: Array<{ title: string; content: string }>;
};

const aboutContent: Record<LocaleKey, AboutLocaleContent> = {
  en: {
    kicker: "Mission and Standards",
    pageTitle: "About AGRON",
    additions: [
      {
        title: "Operational Training Framework",
        content:
          "AGRON training is built on a structured operational framework rather than fragmented lessons. We combine regulatory knowledge aligned with FAA Part 107, simulator-based repetition, mission-based scenarios, standardized procedures, and risk assessment discipline. Certification is never separated from practical capability."
      },
      {
        title: "Experience Adapted to American Standards",
        content:
          "AGRON integrates real-world operational experience and adapts it responsibly within U.S. legal and regulatory frameworks. All programs align with FAA regulations, commercial drone law, civilian safety standards, and corporate compliance requirements."
      },
      {
        title: "Safety Is a System, Not a Slogan",
        content:
          "Each program integrates structured checklists, airspace verification, environmental awareness, emergency protocols, and maintenance standards. Professional drone operations are built on predictable systems."
      },
      {
        title: "International Perspective, American Execution",
        content:
          "AGRON operates globally while maintaining strict jurisdictional compliance. Training is available in English, Spanish, Russian, Ukrainian, Arabic, and Hebrew."
      },
      {
        title: "Our Commitment",
        content:
          "Structured learning. Measurable skill development. Regulatory alignment. Practical readiness. Professional accountability."
      }
    ]
  },
  ru: {
    kicker: "Миссия и стандарты",
    pageTitle: "О AGRON",
    additions: [
      {
        title: "Операционная система обучения",
        content:
          "Обучение AGRON построено на структурированной модели, объединяющей требования FAA Part 107, практику в симуляторе, сценарные миссии и дисциплину оценки рисков."
      },
      {
        title: "Опыт, адаптированный к стандартам США",
        content:
          "Мы интегрируем реальный операционный опыт и адаптируем его в рамках законодательства США и регламентов FAA."
      },
      {
        title: "Безопасность — это система",
        content:
          "Каждая программа включает чек-листы, проверку воздушного пространства, протоколы чрезвычайных ситуаций и стандарты технического обслуживания."
      },
      {
        title: "Международный подход, американская реализация",
        content:
          "AGRON работает глобально, строго соблюдая требования каждой юрисдикции. Обучение доступно на 6 языках."
      },
      {
        title: "Наша ответственность",
        content:
          "Структурированное обучение. Измеримые навыки. Соответствие регламентам. Практическая готовность."
      }
    ]
  },
  uk: {
    kicker: "Місія та стандарти",
    pageTitle: "Про AGRON",
    additions: [
      {
        title: "Операційна модель навчання",
        content:
          "Навчання AGRON поєднує вимоги FAA Part 107, симуляційні вправи та сценарні місії з вимірюваними результатами."
      },
      {
        title: "Досвід, адаптований до стандартів США",
        content:
          "Ми інтегруємо практичний досвід у межах американської правової системи та регуляторних вимог."
      },
      {
        title: "Безпека як система",
        content:
          "Програми включають чек-листи, перевірку повітряного простору та протоколи надзвичайних ситуацій."
      },
      {
        title: "Міжнародна перспектива",
        content:
          "Навчання доступне кількома мовами з урахуванням місцевого регулювання."
      },
      {
        title: "Наші принципи",
        content:
          "Системність. Вимірюваність. Відповідність регламентам. Практична готовність."
      }
    ]
  },
  es: {
    kicker: "Mision y Estandares",
    pageTitle: "Sobre AGRON",
    additions: [
      {
        title: "Marco Operativo de Entrenamiento",
        content:
          "El entrenamiento integra FAA Part 107, simulación estructurada y escenarios prácticos con resultados medibles."
      },
      {
        title: "Experiencia Adaptada a Estándares Americanos",
        content:
          "Adaptamos experiencia operativa real dentro del marco legal y regulatorio de Estados Unidos."
      },
      {
        title: "La Seguridad es un Sistema",
        content:
          "Cada programa incluye listas de verificación, validación de espacio aéreo y protocolos de emergencia."
      },
      {
        title: "Perspectiva Internacional",
        content:
          "Formación disponible en múltiples idiomas con cumplimiento regulatorio específico por jurisdicción."
      },
      {
        title: "Nuestro Compromiso",
        content:
          "Formación estructurada. Desarrollo medible. Cumplimiento normativo. Preparación práctica."
      }
    ]
  },
  ar: {
    kicker: "المهمة والمعايير",
    pageTitle: "حول AGRON",
    additions: [
      {
        title: "إطار التدريب التشغيلي",
        content:
          "يجمع التدريب بين متطلبات FAA Part 107 والمحاكاة المنظمة والسيناريوهات العملية بنتائج قابلة للقياس."
      },
      {
        title: "خبرة متكيفة مع المعايير الأمريكية",
        content:
          "نقوم بتكييف الخبرة التشغيلية ضمن الإطار القانوني والتنظيمي للولايات المتحدة."
      },
      {
        title: "السلامة كنظام",
        content:
          "تشمل البرامج قوائم فحص وإجراءات تحقق من المجال الجوي وبروتوكولات طوارئ."
      },
      {
        title: "رؤية دولية",
        content:
          "التدريب متاح بعدة لغات مع الالتزام باللوائح المحلية."
      },
      {
        title: "التزامنا",
        content:
          "تعليم منظم. تطوير قابل للقياس. التزام تنظيمي. جاهزية عملية."
      }
    ]
  },
  he: {
    kicker: "משימה וסטנדרטים",
    pageTitle: "אודות AGRON",
    additions: [
      {
        title: "מסגרת אימון תפעולית",
        content:
          "ההכשרה משלבת דרישות FAA Part 107, סימולציה מובנית ותרחישים מעשיים עם תוצאות מדידות."
      },
      {
        title: "ניסיון מותאם לסטנדרטים אמריקאיים",
        content:
          "אנו מתאימים ניסיון תפעולי במסגרת החוק והרגולציה בארה״ב."
      },
      {
        title: "בטיחות כמערכת",
        content:
          "התוכניות כוללות רשימות בדיקה, אימות מרחב אווירי ונהלי חירום."
      },
      {
        title: "פרספקטיבה בינלאומית",
        content:
          "ההכשרה זמינה במספר שפות תוך עמידה בדרישות רגולטוריות מקומיות."
      },
      {
        title: "המחויבות שלנו",
        content:
          "למידה מובנית. פיתוח מדיד. עמידה רגולטורית. מוכנות מעשית."
      }
    ]
  }
};

export default function AboutPage() {
  const { locale } = useAppSettings();
  const content = aboutContent[(locale in aboutContent ? locale : "en") as LocaleKey];

  return (
    <section>
      <span className="page-kicker">{content.kicker}</span>
      <h1 className="page-title">{content.pageTitle}</h1>
      <div className="title-accent-line" />

      <div className="about-image-compact">
        <article className="card" style={{ marginBottom: 16 }}>
          <Image
            src="/brand/AGRON_Main_Banner.webp"
            alt="AGRON training and simulation center"
            width={1536}
            height={1024}
            className="programs-hero-image"
          />
        </article>
      </div>

      <article className="card about-card">
        <p>
          AGRON is a professional team built around real operational experience in unmanned
          systems. We do not teach theory detached from reality. We transfer practical knowledge
          formed under the most demanding conditions where drones are not a hobby or a business
          tool, but a means of protecting lives.
        </p>
        <p>
          Today, some of the most advanced tactical and operational drone experience in the world
          is being shaped in Ukraine. In an environment where speed, precision, resilience, and
          adaptation determine survival, drone operators have developed methods, techniques, and
          training standards that go far beyond conventional civilian programs.
        </p>
        <p>
          We learn directly from professionals who operate on the front line, individuals who use
          unmanned systems to protect communities, defend infrastructure, and support national
          security.
        </p>
      </article>

      <article className="card about-card">
        <p>
          We are proud to work with courageous Ukrainian specialists who have demonstrated
          discipline, ingenuity, and technical mastery under extreme pressure. Their experience is
          not abstract knowledge. It is real-world application refined in the most challenging
          operational environment.
        </p>
        <p>
          AGRON adapts that hard-earned expertise to the American context. We integrate frontline
          tactical insights with U.S. aviation regulations, FAA Part 107 standards, and structured
          training methodology suitable for commercial, industrial, agricultural, and security
          applications.
        </p>
      </article>

      <article className="card about-card">
        <h3>Our Mission</h3>
        <p>
          Our mission is aligned with American values: responsibility, preparedness, technological
          leadership, and protection of people and infrastructure. The United States leads the
          world in innovation, aviation, and freedom. AGRON contributes by building a new
          generation of disciplined, skilled drone operators who combine regulatory compliance,
          technical precision, and operational awareness.
        </p>
      </article>

      <article className="card about-card">
        <h3>We Stand For</h3>
        <ul className="about-list">
          <li>Professionalism grounded in real operational experience</li>
          <li>Structured, standards-based training aligned with FAA regulations</li>
          <li>Practical simulation and mission-based learning</li>
          <li>Discipline, accountability, and safety</li>
          <li>Respect for those who defend their country and those who build its future</li>
        </ul>
      </article>

      <article className="card about-card">
        <p>
          AGRON represents a bridge between hard-tested battlefield experience and structured
          American aviation standards. We honor the courage of Ukrainian operators and the strength
          of American leadership in aviation and technology.
        </p>
        <p>
          Our work is built on respect, competence, and responsibility because unmanned systems are
          not just devices. They are tools that, in capable hands, protect lives and strengthen
          nations.
        </p>
      </article>

      {content.additions.map((block) => (
        <article className="card about-card" key={block.title}>
          <h3>{block.title}</h3>
          <p>{block.content}</p>
        </article>
      ))}

      <div className="about-image-compact">
        <article className="card">
          <Image
            src="/brand/AGRON_Drone_Rover.webp"
            alt="AGRON drone and rover systems"
            width={1536}
            height={1024}
            className="programs-hero-image"
          />
        </article>
      </div>
    </section>
  );
}
