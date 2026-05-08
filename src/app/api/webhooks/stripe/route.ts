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
        const { userId, planId, tier, isSubscription, isStoreOrder } = session.metadata || {};
        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name || 'Valued Builder';
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

        // Fetch line items to include in the email
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

        // Regular store/blueprint order
        const { data: order, error: orderError } = await supabaseAdmin.from('orders').insert({
          user_id: userId !== 'guest' ? userId : null,
          stripe_session_id: session.id,
          status: 'paid',
          total_amount_gbp: amountTotal,
          shipping_address: session.shipping_details,
          customer_email: customerEmail,
          metadata: {
            ...session.metadata,
            line_items: lineItems.data
          },
        }).select().single();

        if (orderError) {
          console.error('Order creation error:', orderError);
        }

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

        // Send Confirmation Email via Resend
        if (customerEmail && process.env.RESEND_API_KEY) {
          try {
            const itemsList = lineItems.data.map(item => 
              `• ${item.description} (x${item.quantity}) — £${((item.amount_total || 0) / 100).toLocaleString()}`
            ).join('\n');

            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'Amplios <support@amplios.co.uk>',
                to: [customerEmail],
                subject: `Order Secured: #${session.id.slice(-8).toUpperCase()}`,
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border: 1px solid #333;">
                    <h1 style="font-size: 24px; text-transform: uppercase; letter-spacing: 2px; color: #ff6b00;">Command Secured</h1>
                    <p style="color: #888; font-size: 14px;">TRANSITION VERIFIED // ID: ${session.id.slice(-8).toUpperCase()}</p>
                    <p style="font-size: 16px; line-height: 1.6;">Hello ${customerName},</p>
                    <p style="font-size: 16px; line-height: 1.6;">Your order for premium off-grid hardware has been successfully processed and added to the build registry.</p>
                    
                    <div style="background: #1a1a1a; padding: 20px; margin: 30px 0; border-left: 4px solid #ff6b00;">
                      <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0;">Order Summary</h3>
                      <pre style="font-family: monospace; font-size: 13px; color: #ccc; white-space: pre-wrap;">${itemsList}</pre>
                      <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
                      <p style="font-size: 18px; font-weight: bold; margin-bottom: 0;">Total: £${(amountTotal / 100).toLocaleString()}</p>
                    </div>

                    <p style="font-size: 14px; color: #888;">Our engineering team is now preparing your shipment. You will receive a tracking log once the assets have departed the hub.</p>
                    
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333;">
                      <p style="font-size: 12px; color: #555;">AMPLIOS. Built for the road. Engineered for life.</p>
                    </div>
                  </div>
                `,
              }),
            });
          } catch (emailError) {
            console.error('Email sending error:', emailError);
          }
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
