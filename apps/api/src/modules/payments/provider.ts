export type CheckoutSessionInput = {
  priceId: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
};

export type CheckoutSessionResult = {
  id: string;
  url: string;
  mode: "stub" | "live";
};

export interface PaymentProvider {
  createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSessionResult>;
  verifyWebhookSignature(payload: string, signature: string): Promise<boolean>;
}
