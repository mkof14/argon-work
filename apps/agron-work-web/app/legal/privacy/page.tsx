import { LegalPage } from "../../../components/legal/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="February 16, 2026"
      intro="This Privacy Policy explains how AGRON Work collects, uses, stores, and protects personal and business information when users access the platform and related services."
      sections={[
        {
          heading: "1. Information We Collect",
          paragraphs: [
            "We collect account, profile, organization, transaction, communication, and technical usage data required to operate the platform.",
            "Sensitive data processing is minimized and performed only where necessary for compliance, verification, security, or contracted services."
          ],
          bullets: [
            "Identity and contact details",
            "Professional background, skills, certifications, and portfolio data",
            "Job postings, proposals, contracts, and payment-related records",
            "Device, session, and security telemetry"
          ]
        },
        {
          heading: "2. How We Use Data",
          paragraphs: [
            "Data is used to deliver core platform functions such as matching, search, communication, verification, billing, risk controls, and customer support.",
            "We also use aggregated and de-identified data for analytics, reliability improvements, fraud prevention, and service optimization."
          ]
        },
        {
          heading: "3. Legal Bases and Permissions",
          paragraphs: [
            "Where applicable law requires a legal basis, processing is performed under contract necessity, legitimate interests, consent, legal obligations, or vital security interests.",
            "Users are responsible for ensuring any uploaded or shared personal data is lawfully provided and appropriately disclosed."
          ]
        },
        {
          heading: "4. Data Sharing",
          paragraphs: [
            "We do not sell personal information. Data may be shared with service providers, payment processors, compliance vendors, and legal authorities when required.",
            "Employers and specialists naturally exchange data when they interact through platform workflows."
          ]
        },
        {
          heading: "5. Data Retention",
          paragraphs: [
            "Data is retained only as long as needed for operations, legal compliance, dispute resolution, and platform integrity.",
            "Retention periods vary by data type, legal obligations, contractual commitments, and security needs."
          ]
        },
        {
          heading: "6. Security Controls",
          paragraphs: [
            "We implement administrative, technical, and organizational safeguards including access controls, encryption in transit, and monitoring.",
            "No system is perfectly secure, but we maintain reasonable protections and incident response procedures."
          ]
        },
        {
          heading: "7. International Data Handling",
          paragraphs: [
            "Given global operations, data may be processed in multiple jurisdictions with appropriate safeguards and contractual controls.",
            "Users must ensure cross-border data transfers associated with their projects comply with local legal requirements."
          ]
        },
        {
          heading: "8. User Rights",
          paragraphs: [
            "Depending on jurisdiction, users may request access, correction, deletion, restriction, portability, or objection to certain processing.",
            "Requests can be submitted through support channels and may require identity verification."
          ]
        },
        {
          heading: "9. Children and Restricted Use",
          paragraphs: [
            "AGRON Work is intended for professional users and organizations, not children.",
            "If we detect unauthorized child data, we will take reasonable steps to remove it."
          ]
        },
        {
          heading: "10. Policy Changes",
          paragraphs: [
            "We may revise this Privacy Policy to reflect legal, technical, or operational changes.",
            "Material updates are published with a new effective date."
          ]
        }
      ]}
    />
  );
}
