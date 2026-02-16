export type Locale = "en" | "es" | "de" | "fr" | "ar" | "ru" | "uk" | "he";

export const locales: Locale[] = ["en", "es", "de", "fr", "ar", "ru", "uk", "he"];
export const rtlLocales: Locale[] = ["ar", "he"];

export type Translation = {
  localeLabel: string;
  brandTagline: string;
  nav: Record<"home" | "programs" | "pricing" | "about" | "contact" | "admin" | "login", string>;
  controls: {
    language: string;
    theme: string;
    light: string;
    dark: string;
  };
  home: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrograms: string;
    ctaPricing: string;
    features: string[];
  };
  programs: {
    title: string;
    tracks: { title: string; description: string }[];
  };
  pricing: {
    title: string;
    emailLabel: string;
    checkout: string;
    creating: string;
    error: string;
    plans: { name: string; price: string; priceId: string; items: string[] }[];
  };
  about: { title: string; p1: string; p2: string };
  contact: { title: string; email: string; sales: string; partnerships: string };
  login: { title: string; info: string };
  dashboard: { title: string; cards: string[] };
  admin: { title: string; intro: string; cards: string[] };
  footer: {
    mission: string;
    menuTitle: string;
    accountTitle: string;
    legalTitle: string;
    legal: Record<"terms" | "privacy" | "cookies" | "disclaimer" | "accessibility" | "refund", string>;
    copyright: string;
  };
  legalPages: Record<"terms" | "privacy" | "cookies" | "disclaimer" | "accessibility" | "refund", { title: string; paragraphs: string[] }>;
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

const baseEnglish: Translation = {
  localeLabel: "English",
  brandTagline: "Drone Academy + Operations",
  nav: {
    home: "Home",
    programs: "Programs",
    pricing: "Pricing",
    about: "About",
    contact: "Contact",
    admin: "Admin",
    login: "Log In"
  },
  controls: { language: "Language", theme: "Theme", light: "Light", dark: "Dark" },
  home: {
    badge: "Enterprise Drone Training",
    title: "AGRON: training, certification, simulation, and real missions",
    subtitle:
      "A clear and visual desktop/mobile platform for drone pilot education in agriculture, delivery, monitoring, and field operations.",
    ctaPrograms: "View Programs",
    ctaPricing: "Open Pricing",
    features: [
      "Part 107 prep and certification tracks",
      "Simulation missions with AI scoring",
      "Agronomic field reports with recommendations",
      "Subscription and enterprise payment flows",
      "Skill tracking from study to paid missions",
      "Student, instructor, and organization dashboards"
    ]
  },
  programs: {
    title: "Training Programs",
    tracks: [
      { title: "Base 107", description: "Regulation, safety, and exam preparation with adaptive tests." },
      { title: "Agro Pro", description: "Field mapping, scan interpretation, and agronomic recommendations." },
      { title: "Delivery Ops", description: "Food, medicine, and parcel delivery workflows with SLA control." },
      { title: "Security & Monitoring", description: "Patrol, incident observation, and operational reporting." }
    ]
  },
  pricing: {
    title: "Pricing and Payments",
    emailLabel: "Checkout email",
    checkout: "Proceed to Checkout",
    creating: "Creating session...",
    error: "Unable to create a payment session. Check API and Stripe configuration.",
    plans: [
      { name: "Starter", price: "$49/mo", priceId: "price_starter_monthly", items: ["Part 107 track", "Tests and basic analytics", "1 simulation profile"] },
      {
        name: "Professional",
        price: "$149/mo",
        priceId: "price_pro_monthly",
        items: ["All tracks", "AI reports", "Advanced simulations", "Instructor support"]
      },
      {
        name: "Enterprise",
        price: "Custom",
        priceId: "price_enterprise_custom",
        items: ["B2B roles", "SLA and integrations", "Multi-organization", "Governance and audit"]
      }
    ]
  },
  about: {
    title: "About AGRON",
    p1: "AGRON unifies pilot education, simulation, certification, and real-world operations in one reliable system.",
    p2: "The core objective is reducing time from first training to first paid mission while keeping strict safety and quality control."
  },
  contact: {
    title: "Contact",
    email: "Email: partners@agron.aero",
    sales: "Sales: +1 (000) 000-0000",
    partnerships: "Partnerships: enterprise onboarding and pilot deployment programs."
  },
  login: {
    title: "Log In to AGRON",
    info: "The sign-in form is connected to API endpoint /auth/login."
  },
  dashboard: {
    title: "Dashboard",
    cards: ["Course progress", "Simulation sessions", "Certificates and statuses"]
  },
  admin: {
    title: "Admin Panel",
    intro: "Manage organizations, users, subscriptions, reports, and compliance controls from one place.",
    cards: ["User and role management", "Subscription controls", "Audit and legal records"]
  },
  footer: {
    mission: "AGRON builds skilled drone pilots for safe, measurable, and job-ready operations.",
    menuTitle: "Menu",
    accountTitle: "Account",
    legalTitle: "Legal",
    legal: {
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      disclaimer: "Disclaimer",
      accessibility: "Accessibility Statement",
      refund: "Refund Policy"
    },
    copyright: "Copyright © 2026 AGRON. All rights reserved."
  },
  legalPages: {
    terms: {
      title: "Terms of Service",
      paragraphs: [
        "By using AGRON, you agree to lawful, safe, and responsible platform use.",
        "Training materials and simulation data are licensed for authorized users only.",
        "Users are responsible for regulatory compliance in their jurisdiction.",
        "AGRON may suspend accounts for fraud, abuse, or safety violations."
      ]
    },
    privacy: {
      title: "Privacy Policy",
      paragraphs: [
        "AGRON collects account, training, and mission data to deliver core services.",
        "Data is processed with least-privilege access and security controls.",
        "We do not sell personal data and only share with required service providers.",
        "Users can request data access, correction, and deletion based on applicable law."
      ]
    },
    cookies: {
      title: "Cookie Policy",
      paragraphs: [
        "Cookies are used for authentication, session stability, and analytics.",
        "Essential cookies are required for login and secure navigation.",
        "Preference cookies store language and theme settings.",
        "Users can manage cookies in browser settings."
      ]
    },
    disclaimer: {
      title: "Disclaimer",
      paragraphs: [
        "Educational and analytical outputs support decision-making and do not replace regulatory guidance.",
        "Mission recommendations must be reviewed by authorized personnel.",
        "AGRON is not liable for misuse outside approved operating procedures.",
        "Service availability may vary during maintenance windows."
      ]
    },
    accessibility: {
      title: "Accessibility Statement",
      paragraphs: [
        "AGRON targets clear layouts, readable contrast, and keyboard-friendly navigation.",
        "We continuously improve accessibility across desktop and mobile interfaces.",
        "Users can submit accessibility feedback to support@agron.aero.",
        "Accessibility requests are reviewed and prioritized in product updates."
      ]
    },
    refund: {
      title: "Refund Policy",
      paragraphs: [
        "Subscription charges are billed as agreed in selected plans.",
        "Refund requests are evaluated case-by-case within contract terms.",
        "Enterprise agreements may define custom billing and refund clauses.",
        "For refund support, contact billing@agron.aero with account details."
      ]
    }
  }
};

function copyWith(overrides: DeepPartial<Translation>): Translation {
  return {
    ...baseEnglish,
    ...overrides,
    nav: { ...baseEnglish.nav, ...(overrides.nav ?? {}) } as Translation["nav"],
    controls: { ...baseEnglish.controls, ...(overrides.controls ?? {}) } as Translation["controls"],
    home: { ...baseEnglish.home, ...(overrides.home ?? {}) } as Translation["home"],
    programs: { ...baseEnglish.programs, ...(overrides.programs ?? {}) } as Translation["programs"],
    pricing: { ...baseEnglish.pricing, ...(overrides.pricing ?? {}) } as Translation["pricing"],
    about: { ...baseEnglish.about, ...(overrides.about ?? {}) } as Translation["about"],
    contact: { ...baseEnglish.contact, ...(overrides.contact ?? {}) } as Translation["contact"],
    login: { ...baseEnglish.login, ...(overrides.login ?? {}) } as Translation["login"],
    dashboard: { ...baseEnglish.dashboard, ...(overrides.dashboard ?? {}) } as Translation["dashboard"],
    admin: { ...baseEnglish.admin, ...(overrides.admin ?? {}) } as Translation["admin"],
    footer: {
      ...baseEnglish.footer,
      ...(overrides.footer ?? {}),
      legal: { ...baseEnglish.footer.legal, ...(overrides.footer?.legal ?? {}) }
    } as Translation["footer"],
    legalPages: {
      ...baseEnglish.legalPages,
      ...(overrides.legalPages ?? {})
    } as Translation["legalPages"]
  };
}

export const translations: Record<Locale, Translation> = {
  en: baseEnglish,
  es: copyWith({
    localeLabel: "Español",
    nav: { home: "Inicio", programs: "Programas", pricing: "Precios", about: "Acerca", contact: "Contacto", admin: "Admin", login: "Entrar" },
    home: {
      title: "AGRON: formación, certificación, simulación y misiones reales",
      subtitle: "Plataforma clara y visual para escritorio y móvil para pilotos de drones.",
      ctaPrograms: "Ver Programas",
      ctaPricing: "Ver Precios"
    },
    programs: { title: "Programas de Formación" },
    pricing: { title: "Precios y Pagos", emailLabel: "Correo para pago", checkout: "Ir al pago", creating: "Creando sesión..." },
    about: { title: "Sobre AGRON" },
    contact: { title: "Contacto" },
    dashboard: { title: "Panel" },
    admin: { title: "Panel de Admin" },
    footer: { menuTitle: "Menú", accountTitle: "Cuenta", legalTitle: "Legal", copyright: "Copyright © 2026 AGRON. Todos los derechos reservados." },
    legalPages: {
      terms: { title: "Términos del Servicio", paragraphs: ["Al usar AGRON, acepta un uso legal y seguro.", "Los materiales de formación son para usuarios autorizados.", "Cada usuario cumple normativas de su jurisdicción.", "AGRON puede suspender cuentas por abuso o fraude."] },
      privacy: { title: "Política de Privacidad", paragraphs: ["Recopilamos datos de cuenta y formación para operar el servicio.", "Aplicamos controles de seguridad y mínimo privilegio.", "No vendemos datos personales.", "Puede solicitar acceso, corrección y eliminación de datos."] },
      cookies: { title: "Política de Cookies", paragraphs: ["Usamos cookies para autenticación y estabilidad.", "Las cookies esenciales son necesarias para iniciar sesión.", "Las preferencias guardan idioma y tema.", "Puede gestionar cookies en su navegador."] },
      disclaimer: { title: "Aviso Legal", paragraphs: ["Las salidas analíticas apoyan decisiones y no sustituyen regulación.", "Las recomendaciones de misión requieren revisión autorizada.", "No nos responsabilizamos por uso fuera de procedimientos.", "La disponibilidad puede variar por mantenimiento."] },
      accessibility: { title: "Accesibilidad", paragraphs: ["Priorizamos claridad visual y navegación por teclado.", "Mejoramos continuamente accesibilidad en web y móvil.", "Envíe comentarios a support@agron.aero.", "Las solicitudes se priorizan en actualizaciones."] },
      refund: { title: "Política de Reembolso", paragraphs: ["Los cargos siguen el plan contratado.", "Los reembolsos se evalúan según contrato.", "Enterprise puede tener cláusulas personalizadas.", "Contacte billing@agron.aero para soporte."] }
    }
  }),
  de: copyWith({
    localeLabel: "Deutsch",
    nav: { home: "Start", programs: "Programme", pricing: "Preise", about: "Über", contact: "Kontakt", admin: "Admin", login: "Anmelden" },
    home: { title: "AGRON: Training, Zertifizierung, Simulation und reale Einsätze", subtitle: "Klare, visuelle Desktop- und Mobile-Plattform für Drohnenpiloten.", ctaPrograms: "Programme ansehen", ctaPricing: "Preise öffnen" },
    programs: { title: "Trainingsprogramme" },
    pricing: { title: "Preise und Zahlungen", emailLabel: "Checkout-E-Mail", checkout: "Zur Kasse", creating: "Sitzung wird erstellt..." },
    about: { title: "Über AGRON" },
    contact: { title: "Kontakt" },
    dashboard: { title: "Dashboard" },
    admin: { title: "Admin-Panel" },
    footer: { menuTitle: "Menü", accountTitle: "Konto", legalTitle: "Rechtliches", copyright: "Copyright © 2026 AGRON. Alle Rechte vorbehalten." }
  }),
  fr: copyWith({
    localeLabel: "Français",
    nav: { home: "Accueil", programs: "Programmes", pricing: "Tarifs", about: "À propos", contact: "Contact", admin: "Admin", login: "Connexion" },
    home: { title: "AGRON : formation, certification, simulation et missions réelles", subtitle: "Plateforme claire et visuelle desktop/mobile pour pilotes de drones.", ctaPrograms: "Voir Programmes", ctaPricing: "Voir Tarifs" },
    programs: { title: "Programmes de Formation" },
    pricing: { title: "Tarifs et Paiements", emailLabel: "Email de paiement", checkout: "Passer au paiement", creating: "Création de session..." },
    about: { title: "À propos d'AGRON" },
    contact: { title: "Contact" },
    admin: { title: "Panneau Admin" },
    footer: { menuTitle: "Menu", accountTitle: "Compte", legalTitle: "Légal", copyright: "Copyright © 2026 AGRON. Tous droits réservés." }
  }),
  ar: copyWith({
    localeLabel: "العربية",
    nav: { home: "الرئيسية", programs: "البرامج", pricing: "الأسعار", about: "حول", contact: "اتصال", admin: "الإدارة", login: "تسجيل الدخول" },
    controls: { language: "اللغة", theme: "المظهر", light: "فاتح", dark: "داكن" },
    home: { title: "AGRON: تدريب واعتماد ومحاكاة ومهام حقيقية", subtitle: "منصة واضحة ومرئية للحاسوب والجوال لتدريب طياري الدرون.", ctaPrograms: "عرض البرامج", ctaPricing: "عرض الأسعار" },
    programs: { title: "برامج التدريب" },
    pricing: { title: "الأسعار والدفع", emailLabel: "بريد الدفع", checkout: "الانتقال للدفع", creating: "جاري إنشاء الجلسة..." },
    about: { title: "حول AGRON" },
    contact: { title: "اتصل بنا" },
    dashboard: { title: "لوحة التحكم" },
    admin: { title: "لوحة الإدارة" },
    footer: { menuTitle: "القائمة", accountTitle: "الحساب", legalTitle: "قانوني", copyright: "حقوق النشر © 2026 AGRON. جميع الحقوق محفوظة." }
  }),
  ru: copyWith({
    localeLabel: "Русский",
    nav: { home: "Главная", programs: "Программы", pricing: "Тарифы", about: "О нас", contact: "Контакты", admin: "Админ", login: "Войти" },
    controls: { language: "Язык", theme: "Тема", light: "Светлая", dark: "Темная" },
    home: { title: "AGRON: обучение, сертификация, симуляция и реальные миссии", subtitle: "Понятная визуальная платформа для desktop и mobile обучения пилотов дронов.", ctaPrograms: "Смотреть программы", ctaPricing: "Открыть тарифы" },
    programs: { title: "Программы подготовки" },
    pricing: { title: "Тарифы и платежи", emailLabel: "Email для оплаты", checkout: "Перейти к оплате", creating: "Создание сессии..." },
    about: { title: "О платформе AGRON" },
    contact: { title: "Контакты" },
    dashboard: { title: "Панель управления" },
    admin: { title: "Админ-панель" },
    footer: { menuTitle: "Меню", accountTitle: "Кабинет", legalTitle: "Документы", copyright: "Копирайт © 2026 AGRON. Все права защищены." }
  }),
  uk: copyWith({
    localeLabel: "Українська",
    nav: { home: "Головна", programs: "Програми", pricing: "Тарифи", about: "Про нас", contact: "Контакти", admin: "Адмін", login: "Увійти" },
    controls: { language: "Мова", theme: "Тема", light: "Світла", dark: "Темна" },
    home: { title: "AGRON: навчання, сертифікація, симуляція та реальні місії", subtitle: "Зручна візуальна платформа для desktop/mobile навчання пілотів дронів.", ctaPrograms: "Переглянути програми", ctaPricing: "Відкрити тарифи" },
    programs: { title: "Програми підготовки" },
    pricing: { title: "Тарифи та платежі", emailLabel: "Email для оплати", checkout: "Перейти до оплати", creating: "Створення сесії..." },
    about: { title: "Про платформу AGRON" },
    contact: { title: "Контакти" },
    dashboard: { title: "Панель керування" },
    admin: { title: "Адмін-панель" },
    footer: { menuTitle: "Меню", accountTitle: "Кабінет", legalTitle: "Правові", copyright: "Копірайт © 2026 AGRON. Усі права захищені." }
  }),
  he: copyWith({
    localeLabel: "עברית",
    nav: { home: "בית", programs: "תוכניות", pricing: "מחירים", about: "אודות", contact: "צור קשר", admin: "ניהול", login: "התחברות" },
    controls: { language: "שפה", theme: "ערכת נושא", light: "בהיר", dark: "כהה" },
    home: { title: "AGRON: הכשרה, הסמכה, סימולציה ומשימות אמיתיות", subtitle: "פלטפורמה ברורה וחזותית לדסקטופ ולמובייל להכשרת טייסי רחפנים.", ctaPrograms: "צפה בתוכניות", ctaPricing: "צפה במחירים" },
    programs: { title: "תוכניות הכשרה" },
    pricing: { title: "מחירים ותשלומים", emailLabel: "אימייל לתשלום", checkout: "המשך לתשלום", creating: "יוצר סשן..." },
    about: { title: "אודות AGRON" },
    contact: { title: "צור קשר" },
    dashboard: { title: "לוח בקרה" },
    admin: { title: "פאנל ניהול" },
    footer: { menuTitle: "תפריט", accountTitle: "חשבון", legalTitle: "משפטי", copyright: "זכויות יוצרים © 2026 AGRON. כל הזכויות שמורות." }
  })
};
