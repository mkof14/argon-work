import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { env, hasStripeConfig } from "../../config/env.js";
import type { PaymentProvider } from "./provider.js";
import { StubPaymentProvider } from "./stub-provider.js";

const checkoutSchema = z.object({
  priceId: z.string().min(3),
  customerEmail: z.string().email()
});

async function createProvider(): Promise<PaymentProvider> {
  if (!hasStripeConfig()) {
    return new StubPaymentProvider();
  }

  const stripeModule = await import("stripe");
  const Stripe = stripeModule.default;
  const stripe = new Stripe(env.stripeSecretKey);
  const { StripePaymentProvider } = await import("./stripe-provider.js");

  return new StripePaymentProvider(stripe, env.stripeWebhookSecret);
}

export function registerPaymentRoutes(server: FastifyInstance) {
  server.post("/payments/checkout-session", async (request, reply) => {
    const payload = checkoutSchema.safeParse(request.body);

    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid checkout payload" });
    }

    const provider = await createProvider();
    const successUrl = `${env.webUrl}/dashboard?checkout=success`;
    const cancelUrl = `${env.webUrl}/pricing?checkout=cancel`;

    const session = await provider.createCheckoutSession({
      priceId: payload.data.priceId,
      customerEmail: payload.data.customerEmail,
      successUrl,
      cancelUrl
    });

    return {
      provider: "stripe",
      mode: session.mode,
      sessionId: session.id,
      checkoutUrl: session.url,
      email: payload.data.customerEmail
    };
  });

  server.post("/payments/webhook", async (request, reply) => {
    const signature = request.headers["stripe-signature"];

    if (typeof signature !== "string") {
      return reply.status(400).send({ message: "Missing stripe-signature header" });
    }

    const payload = typeof request.body === "string" ? request.body : JSON.stringify(request.body);
    const provider = await createProvider();
    const isValid = await provider.verifyWebhookSignature(payload, signature);

    if (!isValid) {
      return reply.status(400).send({ message: "Invalid webhook signature" });
    }

    return reply.status(200).send({ received: true });
  });
}
