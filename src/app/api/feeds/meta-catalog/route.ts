import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .eq("visibility", "public");

    if (error) throw error;

    // CSV Headers
    const headers = [
      "id",
      "title",
      "description",
      "availability",
      "condition",
      "price",
      "link",
      "image_link",
      "brand",
      "gtin",
      "mpn",
      "google_product_category"
    ];

    const rows = products?.map(product => {
      const price = `${(product.price_gbp / 100).toFixed(2)} GBP`;
      const images = Array.isArray(product.images) ? product.images : [];
      const imageUrl = images[0] ? `https://amplios.co.uk${images[0]}` : '';
      
      return [
        `"${product.id}"`,
        `"${product.name.replace(/"/g, '""')}"`,
        `"${(product.short_description || product.name).replace(/"/g, '""')}"`,
        `"${product.stock_quantity > 0 ? 'in stock' : 'out of stock'}"`,
        `"new"`,
        `"${price}"`,
        `"https://amplios.co.uk/store/product/${product.slug}"`,
        `"${imageUrl}"`,
        `"${(product.brand || 'Amplios').replace(/"/g, '""')}"`,
        `"${product.gtin || ''}"`,
        `"${(product.mpn || product.sku || '').replace(/"/g, '""')}"`,
        `"Vehicles & Parts > Vehicle Parts & Accessories > Motor Vehicle Parts"`
      ].join(",");
    });

    const csv = [headers.join(","), ...(rows || [])].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate"
      }
    });
  } catch (err) {
    console.error("Feed error:", err);
    return new NextResponse("Error generating feed", { status: 500 });
  }
}
