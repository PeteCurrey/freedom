import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShoppingBag, Filter, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  // 1. Fetch category details
  const { data: categoryData } = await supabaseAdmin
    .from('product_categories')
    .select('*')
    .eq('slug', category)
    .single();

  // 2. Fetch products in category
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('category_id', categoryData?.id)
    .eq('is_active', true);

  if (!categoryData) {
    return (
      <main className="bg-brand-obsidian min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl mb-4">Category Not Found</h1>
        <Link href="/store" className="blueprint-border px-10 py-5 font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all">
          Return to Store
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      <section className="pt-48 pb-16 relative">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 font-mono text-[10px] text-brand-orange uppercase mb-8 tracking-[0.3em]">
                <Link href="/store" className="opacity-50 hover:opacity-100">Store</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="opacity-100">{categoryData.name}</span>
              </div>
              <h1 className="font-display text-7xl lg:text-9xl mb-8 uppercase leading-none tracking-tighter">
                {categoryData.name}
              </h1>
              <p className="font-sans text-brand-grey text-xl leading-relaxed">
                {categoryData.description || `Curated engineering-grade components for your build's ${categoryData.name.toLowerCase()} systems.`}
              </p>
            </div>
            <div className="flex gap-4 mb-2">
               <div className="px-6 py-3 border border-brand-border bg-brand-carbon font-mono text-[10px] uppercase tracking-widest text-brand-white flex items-center gap-3">
                  <Filter className="w-3 h-3 text-brand-orange" /> Filter Products
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products?.map((product) => (
              <Link 
                key={product.id} 
                href={`/store/product/${product.slug}`}
                className="group blueprint-border bg-brand-carbon flex flex-col p-6 hover:bg-brand-graphite transition-all relative overflow-hidden"
              >
                 <div className="aspect-square bg-brand-obsidian blueprint-border mb-8 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center text-brand-orange/20">
                       <ShoppingBag className="w-12 h-12" />
                    </div>
                    {product.image_url && (
                        <Image 
                          src={product.image_url} 
                          alt={product.name} 
                          fill 
                          className="object-contain p-8 group-hover:scale-110 transition-transform duration-700" 
                        />
                    )}
                    <div className="absolute top-4 left-4 font-mono text-[8px] text-brand-grey uppercase bg-brand-carbon px-2 py-1">
                      {product.brand}
                    </div>
                 </div>
                 <div className="flex-1 flex flex-col">
                    <h3 className="font-display text-lg uppercase mb-2 group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-sans text-brand-grey text-xs mb-8 line-clamp-2">
                      {product.short_description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-brand-border/30 flex justify-between items-center">
                       <span className="font-display text-xl">£{(product.price_gbp / 100).toLocaleString()}</span>
                       <span className="font-mono text-[8px] text-brand-orange border border-brand-orange/30 px-3 py-2 flex items-center gap-2">
                          VIEW / BUY <ArrowRight className="w-3 h-3" />
                       </span>
                    </div>
                 </div>
              </Link>
            ))}
            
            {(!products || products.length === 0) && (
              <div className="col-span-full py-32 text-center text-brand-grey font-mono text-xs uppercase tracking-widest border border-dashed border-brand-border/30">
                No products currently listed in this category.
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
