import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

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

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const { userId, planId, tier, isStoreOrder } = session.metadata || {};
    const shippingDetails = session.shipping_details;
    const customerEmail = session.customer_details?.email;
    const amountTotal = session.amount_total || 0;

    try {
      // 1. Record the Order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId !== 'guest' ? userId : null,
          stripe_session_id: session.id,
          status: 'paid',
          total_amount_gbp: amountTotal,
          shipping_address: shippingDetails,
          customer_email: customerEmail,
          metadata: session.metadata
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Fetch Session Line Items to populate order_items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      
      const orderItems = lineItems.data.map((item) => ({
        order_id: order.id,
        // In a real system we would map Stripe product IDs to Supabase IDs
        // For now, we store what we have in metadata or name
        price_at_purchase: item.amount_total,
        quantity: item.quantity || 1
      }));

      await supabase.from('order_items').insert(orderItems);

      // 3. Handle Digital Blueprint Purchase if applicable
      if (planId && tier) {
        await supabase.from('blueprint_purchases').insert({
          user_id: userId !== 'guest' ? userId : null,
          plan_id: planId,
          tier: tier.toLowerCase(),
          order_id: order.id
        });
      }

      console.log(`Order processed successfully: ${order.id}`);
      
    } catch (err: any) {
      console.error('Error recording order in Supabase:', err);
      // We still return 200 to Stripe because we received the event, 
      // but we should log the internal failure.
    }
  }

  return NextResponse.json({ received: true });
}
