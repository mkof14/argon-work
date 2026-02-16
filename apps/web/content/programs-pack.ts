export type ProgramLocale = "en" | "ru" | "uk" | "es" | "ar" | "he";

type ProgramSummary = {
  title: string;
  subtitle: string;
  outcomesTitle: string;
  outcomes: string[];
  pricingTitle: string;
  pricing: string[];
};

type SimulatorSummary = {
  title: string;
  subtitle: string;
  featuresTitle: string;
  features: string[];
  pricingTitle: string;
  pricing: string[];
};

export const programsPack: Record<
  ProgramLocale,
  {
    part107: ProgramSummary;
    flightSkills: ProgramSummary;
    simulator: SimulatorSummary;
  }
> = {
  en: {
    part107: {
      title: "FAA Part 107 Certification Program",
      subtitle: "Structured preparation with measurable progress and exam-day readiness aligned with FAA standards.",
      outcomesTitle: "Outcomes:",
      outcomes: [
        "Full understanding of FAA Part 107 regulations",
        "Airspace classification mastery",
        "Weather interpretation for operational planning",
        "Operational decision-making within regulatory limits",
        "85%+ mock exam performance",
        "Structured exam-day readiness"
      ],
      pricingTitle: "Pricing:",
      pricing: ["Standard — $299", "Pro — $399", "Premium — $599"]
    },
    flightSkills: {
      title: "Flight Skills & Operational Control",
      subtitle: "Manual control discipline, wind management, and structured mission execution.",
      outcomesTitle: "Outcomes:",
      outcomes: [
        "Stable hover control",
        "Precision landing accuracy",
        "Crosswind compensation",
        "Emergency response discipline",
        "Structured pre-flight execution"
      ],
      pricingTitle: "Pricing:",
      pricing: ["Self-paced — $349", "Hybrid — $899"]
    },
    simulator: {
      title: "AGRON Simulator",
      subtitle: "Structured drone training through controlled simulation.",
      featuresTitle: "Features:",
      features: [
        "Realistic flight physics",
        "Controller integration",
        "Wind simulation",
        "Scenario-based missions",
        "Performance analytics"
      ],
      pricingTitle: "Pricing:",
      pricing: ["Free", "Pro — $29/month", "Annual — $249/year", "Enterprise — Custom"]
    }
  },
  ru: {
    part107: {
      title: "Программа подготовки к FAA Part 107",
      subtitle: "Структурированная подготовка с измеримым прогрессом и готовностью к экзамену.",
      outcomesTitle: "Результаты:",
      outcomes: [
        "Полное понимание регламентов FAA Part 107",
        "Уверенная работа с картами воздушного пространства",
        "Анализ погодных условий",
        "Регуляторно корректные решения",
        "85%+ на пробных тестах",
        "Готовность к экзамену"
      ],
      pricingTitle: "Стоимость:",
      pricing: ["Standard — $299", "Pro — $399", "Premium — $599"]
    },
    flightSkills: {
      title: "Навыки управления и операционный контроль.",
      subtitle: "Практические навыки полета",
      outcomesTitle: "Результаты:",
      outcomes: [
        "Стабильное удержание позиции",
        "Точная посадка",
        "Компенсация бокового ветра",
        "Реакция на аварийные ситуации",
        "Чек-листы перед полетом"
      ],
      pricingTitle: "Стоимость:",
      pricing: ["Self-paced — $349", "Hybrid — $899"]
    },
    simulator: {
      title: "СИМУЛЯТОР AGRON",
      subtitle: "Структурированное обучение через симуляцию.",
      featuresTitle: "Функции:",
      features: [
        "Реалистичная физика",
        "Поддержка контроллеров",
        "Моделирование ветра",
        "Сценарии миссий",
        "Аналитика навыков"
      ],
      pricingTitle: "Стоимость:",
      pricing: ["Free", "Pro — $29/месяц", "Annual — $249/год", "Enterprise — Индивидуально"]
    }
  },
  uk: {
    part107: {
      title: "Підготовка до FAA Part 107",
      subtitle: "Структуроване навчання з вимірюваним прогресом.",
      outcomesTitle: "Результати:",
      outcomes: [
        "Повне розуміння регламентів",
        "Робота з повітряними картами",
        "Аналіз погодних умов",
        "Регуляторна дисципліна",
        "85%+ на тестах"
      ],
      pricingTitle: "Вартість:",
      pricing: ["Standard — $299", "Pro — $399", "Premium — $599"]
    },
    flightSkills: {
      title: "НАВИЧКИ ПОЛЬОТУ",
      subtitle: "Операційний контроль та дисципліна.",
      outcomesTitle: "Результати:",
      outcomes: [
        "Стабільне зависання",
        "Точна посадка",
        "Компенсація вітру",
        "Реакція на надзвичайні ситуації"
      ],
      pricingTitle: "Вартість:",
      pricing: ["Self-paced — $349", "Hybrid — $899"]
    },
    simulator: {
      title: "СИМУЛЯТОР AGRON",
      subtitle: "Навчання через контрольовану симуляцію.",
      featuresTitle: "Функції:",
      features: [
        "Реалістична фізика",
        "Підтримка контролерів",
        "Симуляція вітру",
        "Сценарії місій",
        "Аналітика результатів"
      ],
      pricingTitle: "Вартість:",
      pricing: ["Free", "Pro — $29/місяць", "Annual — $249/рік", "Enterprise — Індивідуально"]
    }
  },
  es: {
    part107: {
      title: "Programa de preparación FAA Part 107",
      subtitle: "Preparación estructurada con progreso medible.",
      outcomesTitle: "Resultados:",
      outcomes: [
        "Dominio de regulaciones FAA",
        "Interpretación de espacio aéreo",
        "Evaluación meteorológica",
        "Decisiones operativas correctas",
        "85%+ en exámenes simulados"
      ],
      pricingTitle: "Precio:",
      pricing: ["Standard — $299", "Pro — $399", "Premium — $599"]
    },
    flightSkills: {
      title: "HABILIDADES DE VUELO",
      subtitle: "Control manual y disciplina operativa.",
      outcomesTitle: "Resultados:",
      outcomes: [
        "Vuelo estacionario estable",
        "Aterrizaje preciso",
        "Compensación de viento",
        "Respuesta a emergencias"
      ],
      pricingTitle: "Precio:",
      pricing: ["Self-paced — $349", "Hybrid — $899"]
    },
    simulator: {
      title: "SIMULADOR AGRON",
      subtitle: "Entrenamiento estructurado mediante simulación.",
      featuresTitle: "Características:",
      features: [
        "Física realista",
        "Integración de controladores",
        "Simulación de viento",
        "Escenarios de misión",
        "Análisis de rendimiento"
      ],
      pricingTitle: "Precio:",
      pricing: ["Free", "Pro — $29/mes", "Annual — $249/año", "Enterprise — Personalizado"]
    }
  },
  ar: {
    part107: {
      title: "برنامج شهادة FAA PART 107",
      subtitle: "إعداد منظم مع تقدم قابل للقياس.",
      outcomesTitle: "النتائج:",
      outcomes: [
        "فهم كامل للوائح FAA",
        "إتقان تصنيف المجال الجوي",
        "تحليل الطقس",
        "قرارات تشغيلية منضبطة",
        "85%+ في الاختبارات التجريبية"
      ],
      pricingTitle: "السعر:",
      pricing: ["Standard — $299", "Pro — $399", "Premium — $599"]
    },
    flightSkills: {
      title: "مهارات الطيران",
      subtitle: "التحكم اليدوي والانضباط التشغيلي.",
      outcomesTitle: "النتائج:",
      outcomes: [
        "ثبات في التحويم",
        "هبوط دقيق",
        "تعويض الرياح",
        "استجابة للطوارئ"
      ],
      pricingTitle: "السعر:",
      pricing: ["Self-paced — $349", "Hybrid — $899"]
    },
    simulator: {
      title: "تطبيق المحاكاة AGRON",
      subtitle: "تدريب منظم عبر المحاكاة.",
      featuresTitle: "الميزات:",
      features: [
        "فيزياء واقعية",
        "دعم وحدات التحكم",
        "محاكاة الرياح",
        "سيناريوهات مهام",
        "تحليلات الأداء"
      ],
      pricingTitle: "السعر:",
      pricing: ["Free", "Pro — $29/شهر", "Annual — $249/سنة", "Enterprise — مخصص"]
    }
  },
  he: {
    part107: {
      title: "תוכנית הסמכה FAA PART 107",
      subtitle: "הכנה מובנית עם התקדמות מדידה.",
      outcomesTitle: "תוצאות:",
      outcomes: [
        "הבנה מלאה של תקנות FAA",
        "שליטה במרחב האווירי",
        "ניתוח מזג אוויר",
        "קבלת החלטות תפעוליות",
        "85%+ במבחני סימולציה"
      ],
      pricingTitle: "מחיר:",
      pricing: ["Standard — $299", "Pro — $399", "Premium — $599"]
    },
    flightSkills: {
      title: "מיומנויות טיסה",
      subtitle: "שליטה ידנית ומשמעת תפעולית.",
      outcomesTitle: "תוצאות:",
      outcomes: [
        "ריחוף יציב",
        "נחיתה מדויקת",
        "פיצוי רוח",
        "תגובת חירום"
      ],
      pricingTitle: "מחיר:",
      pricing: ["Self-paced — $349", "Hybrid — $899"]
    },
    simulator: {
      title: "סימולטור AGRON",
      subtitle: "אימון מובנה באמצעות סימולציה.",
      featuresTitle: "תכונות:",
      features: [
        "פיזיקה מציאותית",
        "תמיכה בבקרים",
        "סימולציית רוח",
        "תרחישי משימה",
        "ניתוח ביצועים"
      ],
      pricingTitle: "מחיר:",
      pricing: ["Free", "Pro — $29/חודש", "Annual — $249/שנה", "Enterprise — מותאם אישית"]
    }
  }
};

export function getProgramsPack(locale: string) {
  return programsPack[(locale in programsPack ? locale : "en") as ProgramLocale];
}
