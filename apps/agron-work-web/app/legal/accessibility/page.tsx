import { LegalPage } from "../../../components/legal/LegalPage";

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      effectiveDate="February 16, 2026"
      intro="AGRON Work is committed to building a platform that is clear, inclusive, and accessible across devices and assistive technologies."
      sections={[
        {
          heading: "1. Accessibility Goals",
          paragraphs: [
            "We work toward recognized accessibility practices for readability, keyboard interaction, navigation consistency, and responsive layouts.",
            "Accessibility improvements are integrated into product updates and UI reviews."
          ]
        },
        {
          heading: "2. Current Measures",
          paragraphs: [
            "Our team applies semantic structure, contrast-aware styling, scalable typography, and mobile-friendly layouts.",
            "We test critical user flows and continuously improve discoverability and usability."
          ]
        },
        {
          heading: "3. Limitations and Ongoing Work",
          paragraphs: [
            "Some areas may not yet provide perfect assistive-technology support.",
            "We prioritize fixes based on severity, user impact, and implementation feasibility."
          ]
        },
        {
          heading: "4. Feedback and Requests",
          paragraphs: [
            "Users can report accessibility barriers and request support accommodations through official support channels.",
            "When reporting issues, include page URL, device/browser details, and a short description of the barrier."
          ]
        }
      ]}
    />
  );
}
