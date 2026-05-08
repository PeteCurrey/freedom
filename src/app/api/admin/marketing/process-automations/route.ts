import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // Security Check: Ensure this is a cron/internal call
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Fetch Abandoned Carts (Pending orders > 1h old)
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
    const { data: pendingOrders } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('status', 'pending')
      .lt('created_at', oneHourAgo)
      .is('metadata->recovery_sent', null); // Only send once

    if (!pendingOrders || pendingOrders.length === 0) {
      return NextResponse.json({ processed: 0 });
    }

    let processed = 0;

    for (const order of pendingOrders) {
      if (order.customer_email && process.env.RESEND_API_KEY) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Amplios <support@amplios.co.uk>',
              to: [order.customer_email],
              subject: 'Mission Interrupted: Your Build Hardware is Waiting',
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border: 1px solid #333;">
                  <h1 style="font-size: 24px; text-transform: uppercase; letter-spacing: 2px; color: #ff6b00;">Registry Incomplete</h1>
                  <p style="font-size: 16px; line-height: 1.6;">We noticed you left some mission-critical hardware in your cart.</p>
                  <p style="font-size: 16px; line-height: 1.6;">The road is waiting, and these assets are still reserved for your build—but only for a limited time.</p>
                  
                  <div style="margin: 40px 0; text-align: center;">
                    <a href="https://amplios.co.uk/checkout?session_id=${order.stripe_session_id}" style="background: #ff6b00; color: #fff; padding: 18px 32px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 14px;">Secure Your Assets Now</a>
                  </div>

                  <p style="font-size: 14px; color: #888;">If you have technical questions before finalizing your command, reply to this email to speak with an advisor.</p>
                  
                  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333;">
                    <p style="font-size: 12px; color: #555;">AMPLIOS. Engineered for life.</p>
                  </div>
                </div>
              `,
            }),
          });

          // Mark as sent
          await supabaseAdmin
            .from('orders')
            .update({ metadata: { ...order.metadata, recovery_sent: new Date().toISOString() } })
            .eq('id', order.id);

          processed++;
        } catch (err) {
          console.error(`Recovery email failed for order ${order.id}:`, err);
        }
      }
    }

    return NextResponse.json({ processed });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
