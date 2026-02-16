import type Stripe from "stripe";
import type { CheckoutSessionInput, CheckoutSessionResult, PaymentProvider } from "./provider.js";

export class StripePaymentProvider implements PaymentProvider {
  constructor(
    private readonly stripe: Stripe,
    private readonly webhookSecret: string
  ) {}

  async createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSessionResult> {
    const session = await this.stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: input.customerEmail,
      line_items: [{ price: input.priceId, quantity: 1 }],
      success_url: input.successUrl,
      cancel_url: input.cancelUrl
    });

    if (!session.url) {
      throw new Error("Stripe checkout URL was not returned");
    }

    return {
      id: session.id,
      url: session.url,
      mode: "live"
    };
  }

  async verifyWebhookSignature(payload: string, signature: string): Promise<boolean> {
    try {
      this.stripe.webhooks.constructEvent(payload, signature, this.webhookSecret);
      return true;
    } catch {
      return false;
    }
  }
}
