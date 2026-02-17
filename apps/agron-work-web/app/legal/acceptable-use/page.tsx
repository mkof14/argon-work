import { LegalPage } from "../../../components/legal/LegalPage";

export default function AcceptableUsePage() {
  return (
    <LegalPage
      title="Acceptable Use Policy"
      effectiveDate="February 16, 2026"
      intro="This Acceptable Use Policy defines prohibited behavior and safety standards for using AGRON Work in order to protect users, infrastructure, and legal compliance."
      sections={[
        {
          heading: "1. Prohibited Activities",
          paragraphs: [
            "Users must not use AGRON Work for unlawful, harmful, deceptive, abusive, discriminatory, or fraudulent activities.",
            "Attempts to exploit platform vulnerabilities, bypass security, or manipulate trust signals are strictly prohibited."
          ],
          bullets: [
            "Fraud, identity misrepresentation, fake credentials, or fake listings",
            "Unauthorized access, scraping abuse, malware distribution, or reverse engineering attacks",
            "Use of platform services for restricted, sanctioned, or illegal operations",
            "Harassment, hate speech, threats, or abusive communications"
          ]
        },
        {
          heading: "2. Safety-Critical Operations",
          paragraphs: [
            "Jobs involving aviation, robotics, remote equipment control, and industrial systems must follow all applicable safety rules and legal approvals.",
            "Users are responsible for operational readiness, risk assessments, and lawful mission execution."
          ]
        },
        {
          heading: "3. Data and Confidentiality",
          paragraphs: [
            "Users must protect confidential information and avoid unauthorized data sharing.",
            "Any sensitive project data should be handled under appropriate contractual and security controls."
          ]
        },
        {
          heading: "4. Enforcement",
          paragraphs: [
            "AGRON Work may investigate suspected violations and take action including warnings, feature restrictions, suspension, or account termination.",
            "Where legally required, we may report unlawful activities to relevant authorities."
          ]
        }
      ]}
    />
  );
}
