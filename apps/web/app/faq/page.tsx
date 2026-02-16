"use client";

import { useAppSettings } from "../../components/AppProviders";

type FaqLocale = "en" | "ru" | "uk" | "es" | "ar" | "he";

type FaqContent = {
  pageTitle: string;
  generalTitle: string;
  simulatorTitle: string;
  corporateTitle: string;
  general: Array<{ q: string; a: string }>;
  simulator: Array<{ q: string; a: string }>;
  corporate: Array<{ q: string; a: string }>;
};

const faqPack: Record<FaqLocale, FaqContent> = {
  en: {
    pageTitle: "FAQ",
    generalTitle: "FAQ - General",
    simulatorTitle: "FAQ - Simulator",
    corporateTitle: "FAQ - Corporate",
    general: [
      { q: "What is FAA Part 107?", a: "FAA Part 107 is the U.S. regulation governing commercial drone operations." },
      { q: "Do I need prior flight experience?", a: "No. The program is structured for beginners and professionals." },
      { q: "How long does preparation take?", a: "Most students complete preparation within 3-6 weeks." },
      { q: "Is this course FAA-approved?", a: "AGRON is a training provider. Certification is issued by the FAA after passing the official exam." },
      { q: "What score do I need to pass the FAA exam?", a: "A minimum score of 70% is required." },
      { q: "Do you guarantee passing the exam?", a: "We do not guarantee results. We provide structured preparation and measurable progress tracking." },
      { q: "How does recurrent training work?", a: "FAA requires renewal every 24 months. AGRON provides structured recurrent modules." },
      { q: "Can I train entirely online?", a: "Yes. All academic content is delivered online." },
      { q: "Is the simulator required?", a: "No. The simulator enhances practical readiness but is optional." },
      { q: "Do you provide certificates?", a: "AGRON provides completion certificates. Official certification comes from the FAA." }
    ],
    simulator: [
      { q: "Is the simulator realistic?", a: "Yes. It is built with structured flight physics and mission scenarios." },
      { q: "Can I connect a real controller?", a: "Yes, supported controllers can be integrated." },
      { q: "Does simulator training replace real flight?", a: "No. It supplements real flight practice." },
      { q: "Is there a free version?", a: "Yes. A basic version is available." }
    ],
    corporate: [
      { q: "Do you offer enterprise pricing?", a: "Yes. Corporate packages are available." },
      { q: "Can we track team progress?", a: "Yes. Corporate dashboards provide reporting." },
      { q: "Do you provide on-site training?", a: "Hybrid programs can include instructor-led sessions." }
    ]
  },
  ru: {
    pageTitle: "FAQ",
    generalTitle: "FAQ - Общие вопросы",
    simulatorTitle: "FAQ - Симулятор",
    corporateTitle: "FAQ - Корпоративное обучение",
    general: [
      { q: "Что такое FAA Part 107?", a: "Это регламент США для коммерческого использования дронов." },
      { q: "Нужен ли опыт полетов?", a: "Нет. Программа подходит для начинающих." },
      { q: "Сколько длится подготовка?", a: "В среднем 3-6 недель." },
      { q: "Гарантируете ли вы сдачу экзамена?", a: "Нет. Мы предоставляем структурированную подготовку." },
      { q: "Обязателен ли симулятор?", a: "Нет, но он усиливает практическую подготовку." }
    ],
    simulator: [
      { q: "Реалистична ли симуляция?", a: "Да, используются сценарии и модель физики полета." },
      { q: "Можно ли подключить контроллер?", a: "Да, поддерживаемые устройства подключаются." }
    ],
    corporate: [
      { q: "Есть ли корпоративные тарифы?", a: "Да, предусмотрены пакеты для компаний." },
      { q: "Можно ли отслеживать прогресс сотрудников?", a: "Да, доступен корпоративный дашборд." }
    ]
  },
  uk: {
    pageTitle: "FAQ",
    generalTitle: "FAQ - Загальні",
    simulatorTitle: "FAQ - Симулятор",
    corporateTitle: "FAQ - Корпоративне",
    general: [
      { q: "Що таке FAA Part 107?", a: "Це регламент США для комерційних польотів." },
      { q: "Чи потрібен досвід?", a: "Ні. Програма підходить для новачків." },
      { q: "Чи гарантується складання іспиту?", a: "Ні. Ми забезпечуємо системну підготовку." }
    ],
    simulator: [{ q: "Чи реалістична симуляція?", a: "Так. Використовується фізична модель польоту." }],
    corporate: [{ q: "Чи є пакети для компаній?", a: "Так, доступні корпоративні рішення." }]
  },
  es: {
    pageTitle: "FAQ",
    generalTitle: "FAQ - General",
    simulatorTitle: "FAQ - Simulador",
    corporateTitle: "FAQ - Corporativo",
    general: [
      { q: "¿Qué es FAA Part 107?", a: "Es la regulación estadounidense para operaciones comerciales con drones." },
      { q: "¿Necesito experiencia previa?", a: "No. El programa es apto para principiantes." },
      { q: "¿Garantizan aprobar el examen?", a: "No. Ofrecemos preparación estructurada." }
    ],
    simulator: [{ q: "¿Es realista la simulación?", a: "Sí, incluye física estructurada y escenarios." }],
    corporate: [{ q: "¿Ofrecen planes empresariales?", a: "Sí, existen paquetes corporativos." }]
  },
  ar: {
    pageTitle: "الأسئلة الشائعة",
    generalTitle: "الأسئلة الشائعة - عام",
    simulatorTitle: "الأسئلة الشائعة - المحاكاة",
    corporateTitle: "الأسئلة الشائعة - الشركات",
    general: [
      { q: "ما هو FAA Part 107؟", a: "هو التنظيم الأمريكي لعمليات الطائرات بدون طيار التجارية." },
      { q: "هل أحتاج إلى خبرة سابقة؟", a: "لا، البرنامج مناسب للمبتدئين." },
      { q: "هل تضمنون النجاح في الاختبار؟", a: "لا، نوفر إعدادًا منظمًا فقط." }
    ],
    simulator: [{ q: "هل المحاكاة واقعية؟", a: "نعم، تعتمد على نموذج فيزيائي منظم." }],
    corporate: [{ q: "هل توجد خطط للشركات؟", a: "نعم، تتوفر باقات مؤسسية." }]
  },
  he: {
    pageTitle: "שאלות נפוצות",
    generalTitle: "שאלות נפוצות - כללי",
    simulatorTitle: "שאלות נפוצות - סימולטור",
    corporateTitle: "שאלות נפוצות - ארגוני",
    general: [
      { q: "מהו FAA Part 107?", a: "זהו הרגולציה האמריקאית להפעלת רחפנים מסחרית." },
      { q: "האם דרוש ניסיון קודם?", a: "לא, התוכנית מתאימה למתחילים." },
      { q: "האם יש הבטחת מעבר?", a: "לא, אנו מספקים הכנה מובנית בלבד." }
    ],
    simulator: [{ q: "האם הסימולציה מציאותית?", a: "כן, מבוססת על מודל פיזיקלי מובנה." }],
    corporate: [{ q: "האם קיימות תוכניות לארגונים?", a: "כן, זמינות חבילות ארגוניות." }]
  }
};

export default function FAQPage() {
  const { locale } = useAppSettings();
  const content = faqPack[(locale in faqPack ? locale : "en") as FaqLocale];

  function renderAccordion(items: Array<{ q: string; a: string }>, sectionKey: string) {
    return items.map((item, index) => (
      <details className="faq-item" key={`${sectionKey}-${item.q}`}>
        <summary className="faq-question">
          <span>{item.q}</span>
          <span className="faq-plus" aria-hidden="true">
            +
          </span>
        </summary>
        <div className="faq-answer">
          <p>{item.a}</p>
        </div>
      </details>
    ));
  }

  return (
    <section>
      <span className="page-kicker">Answers and Policy</span>
      <h1 className="page-title">{content.pageTitle}</h1>
      <div className="title-accent-line" />

      <article className="card about-card faq-accordion">
        <h3>{content.generalTitle}</h3>
        {renderAccordion(content.general, "general")}
      </article>

      <article className="card about-card faq-accordion">
        <h3>{content.simulatorTitle}</h3>
        {renderAccordion(content.simulator, "simulator")}
      </article>

      <article className="card about-card faq-accordion">
        <h3>{content.corporateTitle}</h3>
        {renderAccordion(content.corporate, "corporate")}
      </article>
    </section>
  );
}
