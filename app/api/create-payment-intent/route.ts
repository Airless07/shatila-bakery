import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  // Fail fast if the secret key is missing or still a placeholder
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey.startsWith("sk_test_YOUR")) {
    console.error("[create-payment-intent] STRIPE_SECRET_KEY is not set or is still the placeholder value.");
    return NextResponse.json(
      { error: "Stripe secret key is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { amount } = body;

    console.log("[create-payment-intent] Received amount:", amount);

    if (!amount || typeof amount !== "number" || amount <= 0) {
      console.error("[create-payment-intent] Invalid amount:", amount);
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const amountInCents = Math.round(amount * 100);
    console.log("[create-payment-intent] Creating PaymentIntent for", amountInCents, "cents");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    console.log("[create-payment-intent] Created PaymentIntent:", paymentIntent.id);

    if (!paymentIntent.client_secret) {
      console.error("[create-payment-intent] PaymentIntent has no client_secret:", paymentIntent.id);
      return NextResponse.json({ error: "Payment intent missing client secret." }, { status: 500 });
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    // Stripe errors have a 'type' and 'code' field — log everything
    if (err instanceof Stripe.errors.StripeError) {
      console.error("[create-payment-intent] Stripe error:", {
        type: err.type,
        code: err.code,
        message: err.message,
        statusCode: err.statusCode,
      });
      return NextResponse.json(
        { error: `Stripe error (${err.code ?? err.type}): ${err.message}` },
        { status: err.statusCode ?? 500 }
      );
    }

    console.error("[create-payment-intent] Unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
