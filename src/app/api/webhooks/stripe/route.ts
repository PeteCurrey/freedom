import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-12-18.acacia' as any,
});

// Use service-role key for webhook processing (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Helper: sync subscription state to profiles table
async function syncSubscription(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;
  const tier = (subscription.metadata?.tier as string) || 'pro';
  const periodEnd = new Date((subscription as any).current_period_end * 1000).toISOString();
  const cancelAtPeriodEnd = subscription.cancel_at_period_end;

  await supabaseAdmin
    .from('profiles')
    .update({
      stripe_subscription_id: subscription.id,
      subscription_status: status,
      subscription_tier: status === 'active' || status === 'trialing' ? tier : 'free',
      current_period_end: periodEnd,
      cancel_at_period_end: cancelAtPeriodEnd,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId);
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {

      // ── ONE-OFF CHECKOUT (Store & Blueprints) ────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const { userId, planId, tier, isSubscription } = session.metadata || {};
        const customerEmail = session.customer_details?.email;
        const amountTotal = session.amount_total || 0;

        // If this was a subscription checkout, link the customer ID to the profile
        if (isSubscription === 'true' && session.customer) {
          await supabaseAdmin
            .from('profiles')
            .update({ stripe_customer_id: session.customer })
            .eq('id', userId);
          // Subscription events will handle the rest via customer.subscription.created
          break;
        }

        // Regular store/blueprint order
        await supabaseAdmin.from('orders').insert({
          user_id: userId !== 'guest' ? userId : null,
          stripe_session_id: session.id,
          status: 'paid',
          total_amount_gbp: amountTotal,
          shipping_address: session.shipping_details,
          customer_email: customerEmail,
          metadata: session.metadata,
        });

        if (planId && tier) {
          await supabaseAdmin.from('blueprint_purchases').insert({
            user_id: userId !== 'guest' ? userId : null,
            plan_id: planId,
            tier: tier.toLowerCase(),
            amount_paid_gbp: amountTotal,
            status: 'completed',
            stripe_session_id: session.id,
          });
        }
        break;
      }

      // ── SUBSCRIPTION LIFECYCLE ───────────────────────────────────
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        await syncSubscription(event.data.object as Stripe.Subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_status: 'canceled',
            subscription_tier: 'free',
            stripe_subscription_id: null,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', sub.customer as string);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any;
        await supabaseAdmin
          .from('profiles')
          .update({ subscription_status: 'past_due', updated_at: new Date().toISOString() })
          .eq('stripe_customer_id', invoice.customer);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err: any) {
    console.error('Webhook handler error:', err.message);
  }

  return NextResponse.json({ received: true });
}
