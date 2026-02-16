import type { CheckoutSessionInput, CheckoutSessionResult, PaymentProvider } from "./provider.js";

export class StubPaymentProvider implements PaymentProvider {
  async createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSessionResult> {
    const fakeId = `cs_stub_${Date.now()}`;
    const url = new URL(input.successUrl);
    url.searchParams.set("session_id", fakeId);
    url.searchParams.set("stub", "1");
    return {
      id: fakeId,
      url: url.toString(),
      mode: "stub"
    };
  }

  async verifyWebhookSignature(_payload: string, _signature: string): Promise<boolean> {
    return true;
  }
}
