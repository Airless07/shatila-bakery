import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const TAX_RATE = 0.06;
const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FEE = 5.99;

export async function POST(req: NextRequest) {
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
    const { items } = body as { items: { id: number; quantity: number }[] };

    if (!Array.isArray(items) || items.length === 0) {
      console.error("[create-payment-intent] No items received:", items);
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    // Calculate subtotal from authoritative server-side product prices
    let subtotal = 0;
    for (const { id, quantity } of items) {
      const product = products.find((p) => p.id === id);
      if (!product) {
        console.error(`[create-payment-intent] Unknown product id: ${id}`);
        return NextResponse.json(
          { error: `Unknown product id: ${id}` },
          { status: 400 }
        );
      }
      if (typeof quantity !== "number" || quantity < 1) {
        return NextResponse.json(
          { error: `Invalid quantity for product ${id}` },
          { status: 400 }
        );
      }
      subtotal += product.price * quantity;
    }

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;
    const amountInCents = Math.round(total * 100);

    console.log("[create-payment-intent] Breakdown:", {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      amountInCents,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    console.log("[create-payment-intent] Created PaymentIntent:", paymentIntent.id);

    if (!paymentIntent.client_secret) {
      console.error("[create-payment-intent] PaymentIntent has no client_secret:", paymentIntent.id);
      return NextResponse.json(
        { error: "Payment intent missing client secret." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      total,
      subtotal,
      shipping,
      tax,
    });
  } catch (err) {
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
