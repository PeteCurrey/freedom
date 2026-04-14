import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: '2024-12-18.acacia' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Initialize an admin Supabase client using the Service Role Key
// This is required to bypass Row Level Security (RLS) when creating records autonomously
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
      if (!webhookSecret) {
        // If no webhook secret is configured (e.g., local dev), just parse the body
        // WARNING: This is insecure and should not be used in production.
        event = JSON.parse(body);
      } else {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      }
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown signature error';
      console.error(`Webhook signature verification failed.`, errorMessage);
      return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const planId = session.metadata?.planId;
      const tier = session.metadata?.tier;
      
      // Since user ID comes from auth, and the checkout session is public to the user,
      // we might need to extract the user from client reference ID if they were logged in.
      // For now, let's log the purchase against the plan ID.
      
      if (!planId || !tier) {
         console.warn("Checkout session completed but missing planId or tier in metadata.");
         return NextResponse.json({ received: true });
      }

      console.log(`Processing successful checkout for Plan: ${planId}, Tier: ${tier}`);

      const { error } = await supabaseAdmin
        .from('blueprint_purchases')
        .insert({
          plan_id: planId,
          tier: tier,
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          amount_paid_gbp: session.amount_total || 0,
          status: 'completed'
        });

      if (error) {
        console.error("Error inserting blueprint purchase into Supabase:", error);
        // We still return true to Stripe so it doesn't retry endlessly, but log the error.
        return NextResponse.json({ error: "Database insertion failed" }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Unhandled webhook error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
