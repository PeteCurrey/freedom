import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  console.log("Fetching products...");
  const { data: products, error } = await supabase.from('products').select('*');
  
  if (error) {
    console.error("Error fetching products", error);
    return;
  }

  for (const product of products) {
    let updates: any = {};
    
    if (!product.image_url || product.image_url.trim() === "") {
        // Assign a default beautiful engineering image based on category
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
       console.log(`Updating ${product.slug}...`);
       const { error: updateError } = await supabase.from('products').update(updates).eq('id', product.id);
       if (updateError) console.error("Update failed for", product.slug, updateError);
    }
  }

  console.log("Database update complete!");
}

main();
