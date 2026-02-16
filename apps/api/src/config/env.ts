export const env = {
  port: Number(process.env.PORT ?? 4000),
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  webUrl: process.env.WEB_URL ?? "http://localhost:3000"
};

export function hasStripeConfig() {
  return Boolean(env.stripeSecretKey && env.stripeWebhookSecret);
}
