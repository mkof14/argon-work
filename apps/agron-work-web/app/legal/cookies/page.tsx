import { LegalPage } from "../../../components/legal/LegalPage";

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      effectiveDate="February 16, 2026"
      intro="This Cookie Policy describes how AGRON Work uses cookies and similar technologies to support authentication, platform reliability, preferences, and analytics."
      sections={[
        {
          heading: "1. What Are Cookies",
          paragraphs: [
            "Cookies are small text files stored on your device that help websites remember sessions, preferences, and behavioral signals.",
            "We may also use local storage and comparable browser technologies for functional and security purposes."
          ]
        },
        {
          heading: "2. Cookie Categories",
          paragraphs: [
            "We use essential, performance, functional, and analytics cookies with clear purpose boundaries.",
            "Certain cookies are strictly required for secure login and core application behavior."
          ],
          bullets: [
            "Essential: authentication, session continuity, security enforcement",
            "Functional: language, view settings, and user interface preferences",
            "Performance: service reliability and load optimization metrics",
            "Analytics: aggregated usage trends for product improvement"
          ]
        },
        {
          heading: "3. Third-Party Technologies",
          paragraphs: [
            "Some platform functions may rely on third-party providers that use their own cookies or identifiers.",
            "Those providers are governed by their own privacy and cookie terms."
          ]
        },
        {
          heading: "4. Managing Cookie Preferences",
          paragraphs: [
            "You can control cookies through browser settings and any in-product preference controls where available.",
            "Disabling essential cookies may prevent login or key platform features from functioning correctly."
          ]
        },
        {
          heading: "5. Retention and Updates",
          paragraphs: [
            "Cookie durations vary by use case and technical need.",
            "We may update this policy as platform functionality and legal requirements evolve."
          ]
        }
      ]}
    />
  );
}
