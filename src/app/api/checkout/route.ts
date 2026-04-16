import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia' as any,
});

const TIER_PRICES: Record<string, number> = {
  starter: 2900, // £29.00
  full: 7900,    // £79.00
  master: 14900, // £149.00
};

export async function POST(req: Request) {
  try {
    const { cart, tier, planId, userId } = await req.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ 
        url: `${new URL(req.url).origin}/cart?error=no_stripe_key` 
      });
    }

    const lineItems: any[] = [];

    // Case 1: Handle Digital Blueprint Plans
    if (tier && planId) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `DIYM Build Blueprint - ${tier.toUpperCase()} TIER`,
            description: `Professional engineering pack for Build ID: ${planId}`,
          },
          unit_amount: TIER_PRICES[tier.toLowerCase()] || 7900,
        },
        quantity: 1,
      });
    }

    // Case 2: Handle Store Product Cart
    if (cart && Array.isArray(cart)) {
      cart.forEach((item: any) => {
        lineItems.push({
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${item.brand} ${item.name}`,
              description: `Component for build: ${item.slug}`,
              images: item.image ? [item.image] : [],
            },
            unit_amount: item.price, // ensure this is in pence
          },
          quantity: item.quantity,
        });
      });
    }

    if (lineItems.length === 0) {
      return NextResponse.json({ error: "No items in checkout" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['GB'], // Focusing on UK builders as per requirements
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: `${new URL(req.url).origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${new URL(req.url).origin}/cart`,
      metadata: {
        userId: userId || 'guest',
        planId: planId || '',
        tier: tier || '',
        isStoreOrder: cart ? 'true' : 'false',
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('Stripe Session Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
