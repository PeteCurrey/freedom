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
    ${products?.map((product: any) => {
      const price = (product.price_gbp / 100).toFixed(2);
      const images = Array.isArray(product.images) ? product.images : [];
      const imageUrl = images[0] ? (images[0].startsWith('http') ? images[0] : `https://amplios.co.uk${images[0]}`) : '';
      const additionalImages = images.slice(1, 10).map((img: string) => {
        const url = img.startsWith('http') ? img : `https://amplios.co.uk${img}`;
        return `<g:additional_image_link>${url}</g:additional_image_link>`;
      }).join('\n      ');
      
      const specs = product.specs || {};
      const material = specs.Material || specs.material || '';
      const color = specs.Color || specs.color || '';
      const weight = product.weight_kg ? `${product.weight_kg} kg` : '';
      const length = product.dimensions?.l ? `${product.dimensions.l} mm` : '';
      const width = product.dimensions?.w ? `${product.dimensions.w} mm` : '';
      const height = product.dimensions?.h ? `${product.dimensions.h} mm` : '';

      return `
    <item>
      <g:id>${product.id}</g:id>
      <g:title><![CDATA[${product.name}]]></g:title>
      <g:description><![CDATA[${product.meta_description || product.short_description || product.name}]]></g:description>
      <g:link>https://amplios.co.uk/store/product/${product.slug}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      ${additionalImages}
      <g:condition>new</g:condition>
      <g:availability>${product.stock_quantity > 0 ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${price} GBP</g:price>
      <g:brand><![CDATA[${product.brand || 'Amplios'}]]></g:brand>
      <g:gtin>${product.gtin || ''}</g:gtin>
      <g:mpn>${product.mpn || product.sku || product.internal_sku || ''}</g:mpn>
      <g:google_product_category><![CDATA[Vehicles & Parts > Vehicle Parts & Accessories > Motor Vehicle Parts]]></g:google_product_category>
      <g:product_type><![CDATA[Van Conversion > ${product.subcategory || product.category_id || 'Hardware'}]]></g:product_type>
      ${material ? `<g:material><![CDATA[${material}]]></g:material>` : ''}
      ${color ? `<g:color><![CDATA[${color}]]></g:color>` : ''}
      ${weight ? `<g:shipping_weight>${weight}</g:shipping_weight>` : ''}
      <g:shipping>
        <g:country>GB</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 GBP</g:price>
      </g:shipping>
      ${product.is_featured ? '<g:custom_label_0>Bestseller</g:custom_label_0>' : ''}
      ${product.is_editor_pick ? '<g:custom_label_1>Editor Pick</g:custom_label_1>' : ''}
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
