import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia' as any, // latest API version string standardly required
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tier, buildId, planData } = body;

    let price = 2900; // default 29.00
    if (tier === 'full') price = 7900;
    if (tier === 'master') price = 14900;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `Freedom RV Technical Blueprint (${tier.toUpperCase()})`,
              description: `Custom build manifest and system schematics for Build ID: ${buildId}`,
              images: ['https://www.freedomrv.co.uk/images/bespoke-sprinter.png'], // Replace with actual domain image
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        buildId: buildId,
        tier: tier,
      },
      // In production, these should be absolute URLs from NEXT_PUBLIC_URL 
      success_url: `${req.headers.get('origin')}/planner/success?session_id={CHECKOUT_SESSION_ID}&build=${buildId}`,
      cancel_url: `${req.headers.get('origin')}/planner`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
