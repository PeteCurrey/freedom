import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getDiagramBySlug, WIRING_DIAGRAMS, DIAGRAM_INDIVIDUAL_PRICE, DIAGRAM_BUNDLE_PRICE } from '@/lib/data/wiringDiagrams';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-12-18.acacia' as any,
});

export async function POST(req: Request) {
  try {
    const { slug, bundle, email } = await req.json();
    const origin = new URL(req.url).origin;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('sk_test_dummy')) {
      // Dev mode: redirect straight to thank-you page
      return NextResponse.json({
        url: `${origin}/guides/wiring-diagrams/thank-you?dev=true&email=${encodeURIComponent(email)}&type=${bundle ? 'bundle' : slug}`,
      });
    }

    let lineItems: Stripe.Checkout.SessionCreateParams['line_items'];
    let successSlug: string;

    if (bundle) {
      lineItems = [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Amplios — Complete Victron Wiring Diagram Pack',
            description: 'All 6 Victron system wiring diagrams for UK van conversions (A3 PDF, instant download)',
            images: [`${origin}/images/electrical-technical.png`],
          },
          unit_amount: DIAGRAM_BUNDLE_PRICE,
        },
        quantity: 1,
      }];
      successSlug = 'bundle';
    } else {
      const diagram = getDiagramBySlug(slug);
      if (!diagram) {
        return NextResponse.json({ error: 'Diagram not found.' }, { status: 404 });
      }
      lineItems = [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `Amplios — ${diagram.h1.split(':')[0]}`,
            description: `UK wiring diagram with cable sizing table and regulatory notes (A3 PDF, instant download)`,
            images: [`${origin}/images/electrical-technical.png`],
          },
          unit_amount: DIAGRAM_INDIVIDUAL_PRICE,
        },
        quantity: 1,
      }];
      successSlug = slug;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/guides/wiring-diagrams/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: bundle
        ? `${origin}/guides/wiring-diagrams/complete-pack`
        : `${origin}/guides/wiring-diagrams/${slug}`,
      metadata: {
        type: bundle ? 'bundle' : 'individual',
        slug: successSlug,
        email,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('[Diagrams Checkout Error]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
