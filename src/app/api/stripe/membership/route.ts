import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia' as any,
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Price IDs from your Stripe dashboard (set in .env.local)
const PLAN_PRICES: Record<string, { monthly: string; annual: string }> = {
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly_placeholder',
    annual: process.env.STRIPE_PRICE_PRO_ANNUAL || 'price_pro_annual_placeholder',
  },
  elite: {
    monthly: process.env.STRIPE_PRICE_ELITE_MONTHLY || 'price_elite_monthly_placeholder',
    annual: process.env.STRIPE_PRICE_ELITE_ANNUAL || 'price_elite_annual_placeholder',
  },
};

export async function POST(req: Request) {
  try {
    const { userId, userEmail, plan, billing } = await req.json();
    
    if (!userId || !plan || !billing) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const priceId = PLAN_PRICES[plan]?.[billing as 'monthly' | 'annual'];
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan or billing cycle' }, { status: 400 });
    }

    // Check if profile already has a Stripe customer ID
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    let customerId = profile?.stripe_customer_id;

    // Create Stripe customer if not exists
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: { userId },
      });
      customerId = customer.id;
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/account?subscription=success`,
      cancel_url: `${origin}/account/upgrade?canceled=true`,
      metadata: {
        userId,
        plan,
        billing,
        isSubscription: 'true',
      },
      subscription_data: {
        metadata: { userId, tier: plan },
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Membership Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
