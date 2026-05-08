import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, type, content, userId } = await req.json();

    if (!email || !type) {
      return NextResponse.json({ error: "Email and type are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('leads')
      .insert({
        email,
        type,
        content,
        user_id: userId || null,
        status: 'new'
      })
      .select()
      .single();

    if (error) throw error;

    // Send Confirmation Email via Resend
    if (email && process.env.RESEND_API_KEY) {
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
            subject: `Tactical Response Initiated: ${type.toUpperCase()}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border: 1px solid #333;">
                <h1 style="font-size: 24px; text-transform: uppercase; letter-spacing: 2px; color: #ff6b00;">Request Logged</h1>
                <p style="color: #888; font-size: 14px;">SERVICE TICKET: #${data.id.slice(0, 8).toUpperCase()}</p>
                <p style="font-size: 16px; line-height: 1.6;">Your inquiry regarding <strong>${type}</strong> has been successfully added to our engineering queue.</p>
                
                <div style="background: #1a1a1a; padding: 20px; margin: 30px 0; border-left: 4px solid #ff6b00;">
                  <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0;">Submission Summary</h3>
                  <p style="font-size: 14px; color: #ccc;">${JSON.stringify(content)}</p>
                </div>

                <p style="font-size: 14px; color: #888;">An advisor will review your technical requirements and respond within 24-48 hours. No further action is required at this time.</p>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333;">
                  <p style="font-size: 12px; color: #555;">AMPLIOS. Service Hub Operations.</p>
                </div>
              </div>
            `,
          }),
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
    }

    return NextResponse.json({ success: true, leadId: data.id });

  } catch (error: any) {
    console.error('Lead Capture Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
