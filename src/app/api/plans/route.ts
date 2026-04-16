import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Admin client for machine-to-machine operations (like saving a plan without a session)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Map simplified planner IDs to whatever logical values we need or just store them as is
    // In a mature system, we would validate vehicle_id against the vehicles table UUIDs.
    // For now, we store them as selected by the planner.
    
    const { error, data: plan } = await supabaseAdmin
      .from('build_plans')
      .insert({
        name: data.name || "Untitled Build",
        vehicle_id: null, // Would normally map "mercedes-sprinter" to a valid UUID
        configuration_id: data.configId,
        layout_id: data.layoutId,
        system_tiers: data.systems,
        power_budget_detailed: data.powerBudget || {},
        total_weight_grams: Math.round(data.totalWeight * 1000), // convert kg to grams
        total_cost_gbp: Math.round(data.totalCost * 100), // convert pounds to pence
        is_public: false
      })
      .select('id')
      .single();

    if (error) {
      console.error("Error saving build plan:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: plan.id });
  } catch (error: any) {
    console.error("Plans API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: "Missing plan ID" }, { status: 400 });
  }

  const { data: plan, error } = await supabaseAdmin
    .from('build_plans')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(plan);
}
