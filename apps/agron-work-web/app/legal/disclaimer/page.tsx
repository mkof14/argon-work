import { LegalPage } from "../../../components/legal/LegalPage";

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      effectiveDate="February 16, 2026"
      intro="AGRON Work provides technology infrastructure and operational tools. Information and outputs on the platform are for general and professional support purposes only."
      sections={[
        {
          heading: "1. No Professional Legal or Regulatory Advice",
          paragraphs: [
            "Platform content does not constitute legal, tax, regulatory, aviation, engineering, or safety certification advice.",
            "Users must consult qualified professionals and authorities for jurisdiction-specific obligations."
          ]
        },
        {
          heading: "2. Service Availability",
          paragraphs: [
            "Platform features may change, be interrupted, or be temporarily unavailable due to maintenance, incidents, or external dependencies.",
            "AGRON Work does not guarantee uninterrupted access in all regions or environments."
          ]
        },
        {
          heading: "3. Third-Party Dependencies",
          paragraphs: [
            "Some functions rely on third-party integrations such as payment, verification, analytics, and communication providers.",
            "AGRON Work is not responsible for independent third-party service outages, policy changes, or external failures."
          ]
        },
        {
          heading: "4. User Decision Responsibility",
          paragraphs: [
            "All hiring, staffing, project, and operational decisions are made by users and organizations at their own discretion and risk.",
            "Users remain accountable for safe and lawful execution of missions and deliverables."
          ]
        }
      ]}
    />
  );
}
