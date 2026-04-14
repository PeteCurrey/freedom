import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2024-12-18.acacia' as any, // Cast to any or the specific version supported by your Stripe typings
});

const TIER_PRICES: Record<string, number> = {
  starter: 2900, // £29.00 in pence
  full: 7900,    // £79.00 in pence
  master: 14900, // £149.00 in pence
};

export async function POST(req: Request) {
  try {
    const { planId, tier } = await req.json();

    const price = TIER_PRICES[tier as keyof typeof TIER_PRICES];
    if (!price) {
        console.error("Invalid Tier:", tier);
      return NextResponse.json({ error: "Invalid tier selected" }, { status: 400 });
    }

    // Determine the base URL for success/cancel redirects
    const origin = req.headers.get("origin") || new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal", "link"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `DIY Motorhomes Blueprint - ${tier.toUpperCase()} Tier`,
              description: `Professional technical blueprint for plan: ${planId}`,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/planner/success?session_id={CHECKOUT_SESSION_ID}&plan_id=${planId}&tier=${tier}`,
      cancel_url: `${origin}/planner`,
      metadata: {
        planId,
        tier,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: Error | unknown) {
    console.error("Checkout error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
