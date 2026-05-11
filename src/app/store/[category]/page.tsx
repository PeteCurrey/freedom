import { CATEGORIES, getProductsByCategory } from "@/lib/data/productRegistry";
import { createClient } from "@supabase/supabase-js";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryContent } from "@/components/store/CategoryContent";
import { notFound } from "next/navigation";

// Use service role for server-side fetching to ensure we get all active products
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find(c => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  // 1. Fetch products for this category from Supabase
  const { data: dbProducts, error } = await supabaseAdmin
    .from('products')
    .select('*, product_categories!inner(slug)')
    .eq('product_categories.slug', categorySlug)
    .eq('status', 'active');

  let finalProducts = [];

  if (dbProducts && dbProducts.length > 0) {
    // Map DB products to the format expected by CategoryContent
    finalProducts = dbProducts.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand || 'Premium Component',
      description: p.description || p.short_description || '',
      price_gbp: p.price_gbp || 0,
      compare_at_price: p.compare_at_price_gbp,
      images: p.images || [p.image_url].filter(Boolean) || [],
      slug: p.slug,
      subcategory: p.subcategory,
      system_tier: p.system_tier,
      is_editor_pick: p.is_editor_pick,
      spec_line: p.spec_line
    }));
  } else {
    // 2. Fallback to static registry if no products found in DB
    const registryProducts = getProductsByCategory(category.id);
    finalProducts = registryProducts.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      description: p.shortDescription,
      price_gbp: Math.round(p.price * 100),
      images: p.image ? [p.image] : [],
      slug: p.slug,
      subcategory: p.subcategory,
      system_tier: 'pro' // Default for fallback
    }));
  }

  return (
    <main className="bg-brand-obsidian min-h-screen pt-24 lg:pt-32">
      <Navbar />
      <CategoryContent 
        category={category} 
        initialProducts={finalProducts} 
      />
      <Footer />
    </main>
  );
}
