import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { title, vehicle_model, chassis_type, description, specs, userId, email } = await req.json();

    if (!title || !vehicle_model || !chassis_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

    const { data, error } = await supabase
      .from('showcase_builds')
      .insert({
        title,
        slug,
        vehicle_model,
        chassis_type,
        description,
        specs,
        user_id: userId || null,
        status: 'review' // Default to review for moderation
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, buildId: data.id });

  } catch (error: any) {
    console.error('Showcase Submission Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
