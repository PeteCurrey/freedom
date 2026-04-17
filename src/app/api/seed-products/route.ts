import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data: products, error } = await supabase.from('products').select('*');
  
  if (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }

  let updatedCount = 0;

  for (const product of products) {
    let updates: any = {};
    
    if (!product.image_url || product.image_url.trim() === "") {
        updates.image_url = "/images/systems-showcase.png";
        
        if (product.slug.includes("victron")) updates.image_url = "/images/electrical-technical.png";
        if (product.slug.includes("truma") || product.slug.includes("webasto")) updates.image_url = "/images/heating-system-technical.png";
        if (product.slug.includes("whale") || product.slug.includes("thetford")) updates.image_url = "/images/water-plumbing-technical.png";
        if (product.slug.includes("gaslow")) updates.image_url = "/images/gas-lpg-technical.png";
        if (product.slug.includes("dodo")) updates.image_url = "/images/insulation-technical.png";
    }

    if (!product.full_description || product.full_description.trim() === "") {
        updates.full_description = `## Technical Overview\n\nThe ${product.brand} ${product.name} is an engineering-grade component designed specifically for continuous off-grid use. It meets all regulatory requirements for RCD and BS EN standards.\n\n### Key Capabilities\n- Industrial reliability\n- High efficiency engineering\n- Direct integration with unified telemetry\n\nEnsure installation is performed according to the manufacturer's manual and our bespoke wiring/plumbing schematics for safety.`;
    }

    if (Object.keys(updates).length > 0) {
       await supabase.from('products').update(updates).eq('id', product.id);
       updatedCount++;
    }
  }

  return NextResponse.json({ success: true, updatedCount });
}
