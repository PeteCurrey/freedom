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

    return NextResponse.json({ success: true, leadId: data.id });

  } catch (error: any) {
    console.error('Lead Capture Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
