import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@supabase/supabase-js";
import { CategoryContent } from "@/components/store/CategoryContent";
import Link from "next/link";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  // 1. Fetch category details
  const { data: categoryData } = await supabaseAdmin
    .from('product_categories')
    .select('*')
    .eq('slug', category)
    .single();

  if (!categoryData) {
    return (
      <main className="bg-brand-obsidian min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl mb-4">Registry Node Not Found</h1>
        <Link href="/store" className="blueprint-border px-10 py-5 font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all">
          Return to Registry Hub
        </Link>
      </main>
    );
  }

  // 2. Fetch all products in category for client-side filtering
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('category_id', categoryData.id)
    .eq('is_active', true)
    .order('sort_priority', { ascending: false });

  // 3. Find Editor's Pick for this category
  const editorsPick = products?.find(p => p.is_editor_pick);

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      <CategoryContent 
        category={categoryData} 
        initialProducts={products || []} 
        editorsPick={editorsPick}
      />
      <Footer />
    </main>
  );
}
