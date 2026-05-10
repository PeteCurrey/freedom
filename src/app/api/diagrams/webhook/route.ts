import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { getDiagramBySlug, WIRING_DIAGRAMS } from '@/lib/data/wiringDiagrams';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-12-18.acacia' as any,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_role_key'
);

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_DIAGRAM_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error('[Diagram Webhook] Signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { type, slug, email } = session.metadata || {};

    const isBundle = type === 'bundle';
    const customerEmail = email || session.customer_email || '';

    // Determine which slugs to provide
    const slugs = isBundle ? WIRING_DIAGRAMS.map(d => d.slug) : [slug];
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    // Generate signed URLs from Supabase Storage
    const downloadLinks: { title: string; url: string }[] = [];

    for (const s of slugs) {
      const diagram = getDiagramBySlug(s);
      if (!diagram) continue;

      try {
        const { data, error } = await supabase.storage
          .from('wiring-diagrams')
          .createSignedUrl(`${s}.pdf`, 30 * 24 * 60 * 60); // 30 days in seconds

        if (error || !data?.signedUrl) {
          console.warn(`[Diagram Webhook] No PDF found in storage for ${s} — skipping URL`);
          continue;
        }

        downloadLinks.push({ title: diagram.h1.split(':')[0], url: data.signedUrl });

        // Record purchase in Supabase
        await supabase.from('diagram_purchases').insert({
          email: customerEmail,
          diagram_slug: s,
          is_bundle: isBundle,
          stripe_payment_intent_id: session.payment_intent as string,
          amount_gbp: session.amount_total || 0,
          download_url: data.signedUrl,
          download_expires_at: expiresAt.toISOString(),
        });
      } catch (e) {
        console.error(`[Diagram Webhook] Error processing slug ${s}:`, e);
      }
    }

    // Send email via Resend
    if (customerEmail && downloadLinks.length > 0) {
      const linksHtml = downloadLinks
        .map(l => `<p><strong>${l.title}</strong><br /><a href="${l.url}" style="color:#FF6B35;">Download PDF →</a></p>`)
        .join('');

      await resend.emails.send({
        from: 'Amplios <no-reply@amplios.co.uk>',
        to: customerEmail,
        subject: isBundle ? 'Your Complete Victron Wiring Diagram Pack' : `Your Victron Wiring Diagram — ${getDiagramBySlug(slug)?.h1.split(':')[0] || slug}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0D0D0D;color:#fff;padding:40px;">
            <img src="https://amplios.co.uk/images/hero-background.png" alt="Amplios" style="height:30px;margin-bottom:32px;" />
            <h1 style="font-size:24px;margin-bottom:8px;color:#FF6B35;">Your Download Is Ready</h1>
            <p style="color:#999;margin-bottom:32px;">Thank you for your purchase. Your ${isBundle ? 'complete diagram pack' : 'wiring diagram'} is attached below. Links expire in 30 days.</p>
            ${linksHtml}
            <hr style="border-color:#333;margin:32px 0;" />
            <p style="color:#666;font-size:12px;">Amplios — Authorised Victron Energy Dealer · UK</p>
          </div>
        `,
      });
    }
  }

  return NextResponse.json({ received: true });
}
