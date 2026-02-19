export const primaryNav = [
  { href: "/search", label: "I am looking for work" },
  { href: "/employers", label: "I am hiring" }
] as const;

export const corePages = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/learning-center", label: "Learning Center" },
  { href: "/application-boost", label: "Application Boost" },
  { href: "/search", label: "Search Jobs" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/hiring-lab", label: "Hiring Lab" },
  { href: "/specialties", label: "Specialties" },
  { href: "/domains", label: "Domains" },
  { href: "/jobs", label: "Jobs" },
  { href: "/talent", label: "For Job Seekers" },
  { href: "/employers", label: "For Employers" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/support", label: "Support" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/profile", label: "Profile" },
  { href: "/messages", label: "Messages" },
  { href: "/admin", label: "Admin Panel" },
  { href: "/auth/login", label: "Login" },
  { href: "/dashboard", label: "Dashboard" }
] as const;

export const legalPages = [
  { href: "/legal", label: "Legal Center" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/acceptable-use", label: "Acceptable Use" },
  { href: "/legal/ai-disclosure", label: "AI Disclosure" },
  { href: "/legal/refund-policy", label: "Refund" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
  { href: "/legal/accessibility", label: "Accessibility" }
] as const;

export const domainPages = [
  { href: "/domains/drone-ops", label: "Drone Ops" },
  { href: "/domains/remote-control", label: "Remote Control" },
  { href: "/domains/robotics", label: "Robotics" },
  { href: "/domains/monitoring", label: "Monitoring" },
  { href: "/domains/ai-ml", label: "AI / ML" },
  { href: "/domains/data-it", label: "Data / IT" },
  { href: "/domains/automation", label: "Automation" },
  { href: "/domains/product-pm", label: "Product / PM" },
  { href: "/domains/field-service", label: "Field Service" }
] as const;

export const footerSections = [
  {
    title: "Main",
    links: [
      { href: "/", label: "Home" },
      { href: "/learning-center", label: "Learning Center" },
      { href: "/application-boost", label: "Application Boost" },
      { href: "/search", label: "Search Jobs" },
      { href: "/specialties", label: "Specialties" },
      { href: "/jobs", label: "Jobs" }
    ]
  },
  {
    title: "For Employers",
    links: [
      { href: "/employers", label: "Employer Hub" },
      { href: "/hiring-lab", label: "Hiring Lab" },
      { href: "/services", label: "Hiring Services" },
      { href: "/resources", label: "Hiring Resources" },
      { href: "/contact", label: "Enterprise Contact" }
    ]
  },
  {
    title: "For Job Seekers",
    links: [
      { href: "/talent", label: "Job Seeker Hub" },
      { href: "/learning-center", label: "Learning Center" },
      { href: "/search", label: "Find Jobs" },
      { href: "/ai-tools", label: "AI Tools" },
      { href: "/auth/login?mode=register", label: "Create Account" },
      { href: "/profile", label: "Profile & Resume" },
      { href: "/messages", label: "Messages" },
      { href: "/dashboard", label: "Dashboard" }
    ]
  },
  {
    title: "Work Categories",
    links: domainPages
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About AGRON Work" },
      { href: "/faq", label: "FAQ" },
      { href: "/learning-center", label: "Learning Center" },
      { href: "/application-boost", label: "Application Boost" },
      { href: "/support", label: "Support" },
      { href: "/resources", label: "Resources" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Admin",
    links: [
      { href: "/admin", label: "Admin Panel" },
      { href: "/auth/login", label: "Sign In / Register" },
      { href: "/dashboard", label: "Admin Dashboard" },
      { href: "/support", label: "Ops Support" }
    ]
  },
  {
    title: "All Pages",
    links: corePages.filter(
      (page) =>
        page.href !== "/admin" &&
        page.href !== "/employers"
    )
  },
  {
    title: "Legal",
    links: legalPages
  }
] as const;

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_WORK_SITE_URL ?? "http://localhost:3010";
}
