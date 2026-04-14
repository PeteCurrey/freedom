import { renderToStream } from "@react-pdf/renderer";
import { BlueprintPDF } from "@/components/blueprint/BlueprintPDF";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize admin client to fetch plans and products
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export async function POST(req: Request) {
  try {
    const { planId, tier } = await req.json();

    if (!planId) {
      return NextResponse.json({ error: "Missing planId" }, { status: 400 });
    }

    // 1. Fetch the plan from Supabase
    const { data: plan, error: planError } = await supabaseAdmin
      .from('build_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (planError || !plan) {
      console.error("Error fetching plan for PDF:", planError);
      return NextResponse.json({ error: "Build plan not found" }, { status: 404 });
    }

    // 2. Fetch BOM based on selected tiers
    // For this implementation, we fetch products from relevant categories
    // that match the "Professional" or "Mid" tier requirements.
    
    const { data: products, error: prodError } = await supabaseAdmin
      .from('products')
      .select('*')
      .is('is_active', true);

    if (prodError) {
      console.error("Error fetching products for BOM:", prodError);
    }

    // Basic BOM logic: If tier is not starter, include relevant high-end components
    let bom: any[] = [];
    if (tier && tier !== 'starter' && products) {
        // Filter products that resemble the selected system tiers
        // In a production app, this would be a specific mapping table or kit ID
        bom = products.map(p => ({
            sku: p.sku,
            name: p.name,
            brand: p.brand,
            qty: 1,
            price: p.price_gbp
        }));
    }
    
    const planData = {
        buildId: plan.id.substring(0, 8).toUpperCase(),
        vehicleName: plan.name || "Unknown Vehicle",
        configId: plan.configuration_id || "Standard",
        tier: tier || 'starter',
        totalWeight: plan.total_weight_grams / 1000, // convert grams back to kg
        bom
    };

    const stream = await renderToStream(<BlueprintPDF data={planData} />);
    
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream as any) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="DIYM-Blueprint-${planData.buildId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate blueprint" }, { status: 500 });
  }
}
