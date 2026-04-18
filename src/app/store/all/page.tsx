import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@supabase/supabase-js";
import { CategoryContent } from "@/components/store/CategoryContent";
import Link from "next/link";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function SearchAllPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;

  // 1. Fetch all matching products
  let queryBuilder = supabaseAdmin
    .from('products')
    .select('*')
    .eq('is_active', true);

  if (q) {
    queryBuilder = queryBuilder.or(`name.ilike.%${q}%,brand.ilike.%${q}%,subcategory.ilike.%${q}%,description.ilike.%${q}%`);
  }

  const { data: products } = await queryBuilder.order('created_at', { ascending: false });

  // Mock a "Category" object for global search
  const searchCategory = {
    name: q ? `Search: ${q}` : "Global Registry",
    slug: "all",
    description: q 
      ? `Scanning registry for "${q}"... Found ${products?.length || 0} matching technical nodes.`
      : "Access the entire Amplios hardware registry across all build system tiers."
  };

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      <CategoryContent 
        category={searchCategory} 
        initialProducts={products || []} 
      />
      <Footer />
    </main>
  );
}
