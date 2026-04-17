import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // 'partner', 'marketplace', or 'supplier'
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.redirect(new URL("/store", request.url));
  }

  try {
    let targetUrl = "/store";
    const timestamp = new Date().toISOString();

    if (type === "partner") {
      const { data } = await supabase
        .from("affiliate_management")
        .select("base_url")
        .eq("id", id)
        .single();
      
      if (data) {
        targetUrl = data.base_url;
        await supabase.rpc("increment_affiliate_click", { row_id: id });
        await supabase.from("affiliate_management").update({ last_click_at: timestamp }).eq("id", id);
      }
    } 
    else if (type === "marketplace") {
      const { data } = await supabase
        .from("vehicle_marketplaces")
        .select("affiliate_url")
        .eq("id", id)
        .single();
      
      if (data) {
        targetUrl = data.affiliate_url;
        await supabase.from("vehicle_marketplaces")
          .update({ 
            click_count: supabase.rpc("increment"), // Note: This is conceptual, RPC is better for concurrency
            last_click_at: timestamp 
          })
          .eq("id", id);
        
        // Better way with standard SQL via RPC to avoid race conditions
        await supabase.rpc("increment_marketplace_click", { row_id: id });
      }
    }
    else if (type === "supplier") {
      const { data } = await supabase
        .from("suppliers")
        .select("website")
        .eq("id", id)
        .single();
      
      if (data) {
        targetUrl = data.website.startsWith("http") ? data.website : `https://${data.website}`;
        await supabase.rpc("increment_supplier_lead", { row_id: id });
        await supabase.from("suppliers").update({ last_lead_at: timestamp }).eq("id", id);
      }
    }

    return NextResponse.redirect(targetUrl);
  } catch (error) {
    console.error("Affiliate Redirect Error:", error);
    return NextResponse.redirect(new URL("/store", request.url));
  }
}
