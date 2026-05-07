import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*, product_categories(name)")
      .eq("status", "active")
      .eq("visibility", "public");

    if (error) throw error;

    const xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Amplios Store Feed</title>
    <link>https://amplios.co.uk</link>
    <description>Premium van conversion parts and kits</description>
    ${products?.map(product => {
      const price = (product.price_gbp / 100).toFixed(2);
      const images = Array.isArray(product.images) ? product.images : [];
      const imageUrl = images[0] ? `https://amplios.co.uk${images[0]}` : '';
      
      return `
    <item>
      <g:id>${product.id}</g:id>
      <g:title><![CDATA[${product.name}]]></g:title>
      <g:description><![CDATA[${product.short_description || product.name}]]></g:description>
      <g:link>https://amplios.co.uk/store/product/${product.slug}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${product.stock_quantity > 0 ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${price} GBP</g:price>
      <g:brand><![CDATA[${product.brand || 'Amplios'}]]></g:brand>
      <g:gtin>${product.gtin || ''}</g:gtin>
      <g:mpn>${product.mpn || product.sku || ''}</g:mpn>
      <g:google_product_category><![CDATA[Vehicles & Parts > Vehicle Parts & Accessories > Motor Vehicle Parts]]></g:google_product_category>
      <g:shipping>
        <g:country>GB</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 GBP</g:price>
      </g:shipping>
    </item>`;
    }).join('')}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate"
      }
    });
  } catch (err) {
    console.error("Feed error:", err);
    return new NextResponse("Error generating feed", { status: 500 });
  }
}
