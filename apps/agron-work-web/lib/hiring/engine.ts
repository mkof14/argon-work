import { allDomains, allLevels, allModes } from "../roles";

const benchmarkBase: Record<string, { min: number; max: number }> = {
  "Drone Ops": { min: 55000, max: 150000 },
  "Remote Control": { min: 50000, max: 140000 },
  Robotics: { min: 70000, max: 185000 },
  Monitoring: { min: 50000, max: 125000 },
  "AI/ML": { min: 85000, max: 240000 },
  "Data/IT": { min: 70000, max: 200000 },
  Automation: { min: 65000, max: 180000 },
  "Product & PM": { min: 80000, max: 210000 },
  "Field Service": { min: 50000, max: 140000 }
};

const levelFactor: Record<string, number> = {
  Intern: 0.5,
  Junior: 0.75,
  Middle: 1,
  Senior: 1.3,
  Lead: 1.45,
  Head: 1.65,
  Director: 1.8
};

const modeFactor: Record<string, number> = {
  Remote: 1.08,
  Hybrid: 1,
  "On-site": 0.96
};

export function getSalaryBenchmark(domain: string, level: string, mode: string) {
  const domainBase = benchmarkBase[domain] ?? { min: 60000, max: 150000 };
  const lf = levelFactor[level] ?? 1;
  const mf = modeFactor[mode] ?? 1;
  const min = Math.round(domainBase.min * lf * mf);
  const max = Math.round(domainBase.max * lf * mf);
  return { min, max };
}

export function getDefaultScreenerQuestions(domain: string, level: string) {
  const common = [
    "Do you have legal authorization to work in your target country?",
    "Are you available for required time-zone overlap and communication windows?",
    "Can you share one production project relevant to this role?"
  ];

  const domainMap: Record<string, string[]> = {
    "Drone Ops": [
      "Do you have active UAV/Part 107 or equivalent certification?",
      "Do you have hands-on experience with mission planning and flight safety SOP?"
    ],
    "Remote Control": [
      "Have you operated remote fleets under live SLA constraints?",
      "Do you have incident escalation experience in control-room operations?"
    ],
    Robotics: [
      "Do you have practical ROS/robotics integration experience?",
      "Have you supported robot deployment or fleet reliability in production?"
    ],
    Monitoring: [
      "Do you have anomaly detection or visual inspection analysis experience?",
      "Can you triage high-priority alerts under strict response time targets?"
    ],
    "AI/ML": [
      "Have you deployed ML/AI models to production with observability?",
      "Do you have experience with model quality metrics and drift monitoring?"
    ],
    "Data/IT": [
      "Do you have production data pipeline or cloud infrastructure experience?",
      "Have you worked with reliability, security, and incident response?"
    ],
    Automation: [
      "Have you automated business or operations workflows in production?",
      "Do you have experience with orchestration or control systems?"
    ],
    "Product & PM": [
      "Have you led cross-functional delivery in technical environments?",
      "Can you show measurable delivery outcomes from previous projects?"
    ],
    "Field Service": [
      "Do you have hands-on diagnostics and maintenance experience?",
      "Can you support emergency response or mission-critical repair windows?"
    ]
  };

  const levelQuestion =
    level === "Intern" || level === "Junior"
      ? "Are you open to supervised onboarding and structured mentorship?"
      : "Can you provide examples of leading complex delivery decisions?";

  return [...common, ...(domainMap[domain] ?? []), levelQuestion];
}

export function getDefaultCompetencies(domain: string) {
  const generic = [
    { name: "Technical depth", weight: 30 },
    { name: "Execution reliability", weight: 25 },
    { name: "Communication", weight: 20 },
    { name: "Ownership", weight: 25 }
  ];

  if (domain === "AI/ML") {
    return [
      { name: "Model quality and deployment", weight: 35 },
      { name: "Data and experimentation rigor", weight: 25 },
      { name: "Production reliability", weight: 20 },
      { name: "Business impact", weight: 20 }
    ];
  }
  if (domain === "Drone Ops" || domain === "Robotics") {
    return [
      { name: "Safety and compliance", weight: 30 },
      { name: "Operational execution", weight: 30 },
      { name: "Incident handling", weight: 20 },
      { name: "Team coordination", weight: 20 }
    ];
  }
  return generic;
}

export function detectScamRisk(text: string) {
  const lower = text.toLowerCase();
  const rules = [
    { phrase: "pay upfront", weight: 35, flag: "Asks for upfront payment" },
    { phrase: "crypto transfer", weight: 30, flag: "Requests crypto transfer" },
    { phrase: "buy equipment first", weight: 25, flag: "Asks candidate to buy equipment" },
    { phrase: "telegram only", weight: 20, flag: "Communication only via messenger" },
    { phrase: "no interview needed", weight: 20, flag: "No interview claim" },
    { phrase: "urgent immediate start no process", weight: 18, flag: "No formal hiring process" },
    { phrase: "send passport", weight: 20, flag: "Requests sensitive identity docs too early" },
    { phrase: "guaranteed income", weight: 15, flag: "Unrealistic guaranteed earnings" }
  ];

  let score = 0;
  const flags: string[] = [];
  for (const rule of rules) {
    if (lower.includes(rule.phrase)) {
      score += rule.weight;
      flags.push(rule.flag);
    }
  }
  if (text.length < 120) {
    score += 8;
    flags.push("Description is very short");
  }

  return {
    score: Math.min(100, score),
    flags,
    verdict: score >= 55 ? "high" : score >= 30 ? "medium" : "low"
  };
}

export function evaluateScorecard(
  input: {
    competency: string;
    weight: number;
    score: number;
  }[]
) {
  const weightedTotal = input.reduce((sum, row) => sum + row.score * row.weight, 0);
  const max = input.reduce((sum, row) => sum + 5 * row.weight, 0);
  const pct = max > 0 ? Math.round((weightedTotal / max) * 100) : 0;

  const recommendation =
    pct >= 85 ? "strong_yes" : pct >= 72 ? "yes" : pct >= 58 ? "hold" : "no";

  return { pct, recommendation };
}

export function isValidDomain(domain: string) {
  return allDomains.includes(domain as (typeof allDomains)[number]);
}

export function isValidLevel(level: string) {
  return allLevels.includes(level as (typeof allLevels)[number]);
}

export function isValidMode(mode: string) {
  return allModes.includes(mode as (typeof allModes)[number]);
}

