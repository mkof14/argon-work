import { LegalPage } from "../../../components/legal/LegalPage";

export default function AIDisclosurePage() {
  return (
    <LegalPage
      title="AI and Automation Disclosure"
      effectiveDate="February 16, 2026"
      intro="AGRON Work uses AI and automation features to improve matching, search relevance, risk controls, and productivity workflows. This disclosure explains key principles and limitations."
      sections={[
        {
          heading: "1. AI-Assisted Features",
          paragraphs: [
            "Platform capabilities may include AI-based recommendation, ranking, profile enhancement, text summarization, and operational analytics.",
            "These tools are decision-support mechanisms and do not replace professional, legal, safety, or regulatory judgment."
          ]
        },
        {
          heading: "2. Human Oversight",
          paragraphs: [
            "Hiring, contractual, financial, and operational decisions remain the responsibility of users and organizations.",
            "Users should review and validate AI outputs before reliance in safety-critical or legally significant contexts."
          ]
        },
        {
          heading: "3. Model Risk and Accuracy",
          paragraphs: [
            "AI outputs may be incomplete, outdated, or incorrect depending on data quality, context, and system limitations.",
            "AGRON Work continuously improves models and controls but does not guarantee perfect prediction or classification outcomes."
          ]
        },
        {
          heading: "4. Fairness and Responsible Use",
          paragraphs: [
            "We work to reduce harmful bias and maintain transparent, auditable AI processes where feasible.",
            "Users must not misuse AI features for discriminatory hiring, manipulation, harassment, or unsafe automation."
          ]
        },
        {
          heading: "5. Data Usage in AI Systems",
          paragraphs: [
            "Data used for AI-enabled functionality is governed by the Privacy Policy and applicable legal obligations.",
            "Where required, we apply safeguards and access controls for sensitive content and restricted datasets."
          ]
        }
      ]}
    />
  );
}
