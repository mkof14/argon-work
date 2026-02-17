import { LegalPage } from "../../../components/legal/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      effectiveDate="February 16, 2026"
      intro="These Terms of Service govern your use of AGRON Work, a standalone platform that connects employers and specialists in drone, robotics, AI, data, automation, and related professional services. By using the platform, you agree to these terms."
      sections={[
        {
          heading: "1. Platform Scope",
          paragraphs: [
            "AGRON Work provides marketplace infrastructure for profile discovery, job/project posting, communication, and transaction workflows between independent parties.",
            "AGRON Work is not a staffing agency, legal representative, or employer of platform users unless explicitly stated in a separate signed contract."
          ]
        },
        {
          heading: "2. Account Registration and Eligibility",
          paragraphs: [
            "Users must provide accurate information, keep credentials secure, and maintain updated profile and company data.",
            "You must have legal authority to register and use the platform on behalf of yourself or your organization."
          ],
          bullets: [
            "Personal and organization identity data must be truthful and verifiable.",
            "Users are responsible for all actions performed under their accounts.",
            "Shared or transferred accounts are prohibited unless permitted by documented enterprise controls."
          ]
        },
        {
          heading: "3. User Responsibilities",
          paragraphs: [
            "Specialists and employers are solely responsible for evaluating fit, qualifications, legal requirements, and project risk before entering agreements.",
            "All engagements must comply with local labor, tax, privacy, export-control, aviation, robotics, and safety regulations applicable to the work."
          ]
        },
        {
          heading: "4. Jobs, Offers, and Contracts",
          paragraphs: [
            "Posted opportunities, proposals, milestones, and deliverables must be clear, lawful, and commercially realistic.",
            "Each party is responsible for confirming scope, acceptance criteria, payment schedule, and completion terms before work begins."
          ],
          bullets: [
            "No fraudulent, misleading, or discriminatory postings.",
            "No use of platform workflows for illegal procurement or restricted technologies.",
            "No off-platform circumvention of agreed platform transaction rules where contractually required."
          ]
        },
        {
          heading: "5. Fees and Payments",
          paragraphs: [
            "Platform fees, subscription plans, and transaction charges are disclosed in pricing or contractual documents.",
            "Users authorize AGRON Work and payment providers to process charges, payouts, and related tax or compliance checks where applicable."
          ]
        },
        {
          heading: "6. Intellectual Property",
          paragraphs: [
            "Users retain ownership of pre-existing intellectual property, tools, and materials unless assigned under a separate written agreement.",
            "Work product ownership, licensing, and delivery rights are determined by contract terms between the employer and specialist."
          ]
        },
        {
          heading: "7. Compliance and Safety",
          paragraphs: [
            "Mission-critical work such as drone operations, remote equipment control, and autonomous systems support must follow applicable operational standards and legal restrictions.",
            "AGRON Work may suspend access for safety violations, fraud indicators, sanctions risks, abuse, or repeated policy breaches."
          ]
        },
        {
          heading: "8. Suspension and Termination",
          paragraphs: [
            "AGRON Work may restrict or terminate accounts for material violations, legal obligations, or platform integrity protection.",
            "Users may close accounts by discontinuing use and resolving any open obligations, disputes, or payment liabilities."
          ]
        },
        {
          heading: "9. Liability and Warranty Limitations",
          paragraphs: [
            "The platform is provided on an as-is and as-available basis to the maximum extent permitted by law.",
            "AGRON Work does not guarantee uninterrupted availability, specific hiring outcomes, revenue generation, or error-free operations."
          ]
        },
        {
          heading: "10. Governing Terms Updates",
          paragraphs: [
            "We may update these terms from time to time. Material changes become effective upon publication unless stated otherwise.",
            "Continued use after updates constitutes acceptance of revised terms."
          ]
        }
      ]}
    />
  );
}
