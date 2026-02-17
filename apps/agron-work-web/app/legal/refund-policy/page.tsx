import { LegalPage } from "../../../components/legal/LegalPage";

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Payment and Refund Policy"
      effectiveDate="February 16, 2026"
      intro="This policy describes payment processing, subscription handling, and refund conditions for AGRON Work services."
      sections={[
        {
          heading: "1. Billing Scope",
          paragraphs: [
            "Charges may include subscription fees, transaction fees, verification services, or enterprise plan costs as presented at purchase time.",
            "Users are responsible for keeping billing details accurate and current."
          ]
        },
        {
          heading: "2. Subscription Terms",
          paragraphs: [
            "Subscriptions renew according to the selected billing cycle unless canceled in advance of renewal.",
            "Plan changes may take effect immediately or at the next billing cycle based on product settings."
          ]
        },
        {
          heading: "3. Refund Eligibility",
          paragraphs: [
            "Refunds are evaluated based on plan type, service usage, contract terms, and legal requirements.",
            "Completed services, delivered verification checks, or consumed paid features may be non-refundable unless required by law."
          ],
          bullets: [
            "Duplicate charges and payment errors are eligible for correction.",
            "Unauthorized charges require prompt reporting and account verification.",
            "Enterprise agreements may define custom billing and refund clauses."
          ]
        },
        {
          heading: "4. Chargebacks and Disputes",
          paragraphs: [
            "Before initiating a chargeback, users should contact support to resolve issues quickly.",
            "Fraudulent or abusive chargeback behavior may lead to account restrictions."
          ]
        },
        {
          heading: "5. Taxes and Fees",
          paragraphs: [
            "Applicable taxes, duties, and transfer fees may be added based on jurisdiction and transaction type.",
            "Users are responsible for their own tax obligations related to services and earnings."
          ]
        }
      ]}
    />
  );
}
