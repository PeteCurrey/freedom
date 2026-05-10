import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_role_key'
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Insert into newsletter_subscribers (create table if not exists via SQL later)
    const { error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .upsert({ email, status: 'active', updated_at: new Date().toISOString() }, { onConflict: 'email' });

    if (error) {
       // If table doesn't exist, we'll log it but proceed with email for now
       console.error('Newsletter storage error:', error);
    }

    // Send Welcome Email
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Amplios <support@amplios.co.uk>',
            to: [email],
            subject: 'Welcome to the Hub: Tactical Engineering Updates',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border: 1px solid #333;">
                <h1 style="font-size: 24px; text-transform: uppercase; letter-spacing: 2px; color: #ff6b00;">Nexus Connection Established</h1>
                <p style="font-size: 16px; line-height: 1.6;">You have successfully joined the Amplios technical registry.</p>
                <p style="font-size: 16px; line-height: 1.6;">Expect periodic transmissions regarding:</p>
                <ul style="color: #ccc; font-size: 14px; line-height: 1.8;">
                  <li>High-efficiency electrical system blueprints</li>
                  <li>New build-kit arrivals and hardware drops</li>
                  <li>Technical guides for full-autonomy van life</li>
                </ul>
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333;">
                  <p style="font-size: 12px; color: #555;">You are receiving this because you subscribed at amplios.co.uk.</p>
                </div>
              </div>
            `,
          }),
        });
      } catch (emailError) {
        console.error('Newsletter email error:', emailError);
      }
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
