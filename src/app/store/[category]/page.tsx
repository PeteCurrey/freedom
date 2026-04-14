import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, SlidersHorizontal, ShoppingBag, ChevronRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category: categorySlug } = params;

  // 1. Fetch category details
  const { data: category } = await supabaseAdmin
    .from('product_categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();

  if (!category) {
    return (
      <main className="bg-brand-obsidian min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl mb-4">Category Not Found</h1>
        <Link href="/store" className="font-mono text-xs uppercase tracking-widest text-brand-orange">Return to Store Hub</Link>
      </main>
    );
  }

  // 2. Fetch products in this category
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('category_id', category.id)
    .eq('is_active', true);

  return (
    <main className="bg-brand-obsidian min-h-screen flex flex-col">
       <Navbar />
       
       {/* 1. CATEGORY HEADER */}
       <header className="pt-48 pb-16 relative border-b border-brand-border/30">
          <div className="container mx-auto px-6">
             <div className="flex flex-col">
                <div className="flex items-center gap-4 font-mono text-[10px] text-brand-grey uppercase mb-8 tracking-[0.3em]">
                   <Link href="/store" className="hover:text-brand-orange transition-colors">Store</Link>
                   <ChevronRight className="w-3 h-3" />
                   <span className="text-brand-orange">{category.name}</span>
                </div>
                <h1 className="font-display text-6xl lg:text-8xl mb-6 uppercase tracking-tighter shadow-brand-orange/10 drop-shadow-2xl">
                   {category.name}
                </h1>
                <p className="font-sans text-brand-grey text-lg max-w-2xl leading-relaxed">
                   {category.description}
                </p>
             </div>
          </div>
       </header>

       {/* 2. PRODUCT GRID & FILTERS */}
       <section className="flex-1 py-16">
          <div className="container mx-auto px-6">
             <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Sidebar Filters (Desktop) */}
                <aside className="lg:w-64 shrink-0 space-y-12 h-fit sticky top-32">
                   <div>
                      <h4 className="font-display text-[10px] uppercase tracking-widest text-brand-orange mb-6 border-b border-brand-border/30 pb-4">Filters</h4>
                      <div className="space-y-4">
                         {['In Stock Only', 'Featured Products', 'Blueprint Ready'].map(label => (
                           <label key={label} className="flex items-center gap-3 cursor-pointer group">
                              <div className="w-4 h-4 border border-brand-border bg-brand-carbon group-hover:border-brand-orange transition-colors" />
                              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-wider group-hover:text-white transition-colors">{label}</span>
                           </label>
                         ))}
                      </div>
                   </div>

                   <div>
                      <h4 className="font-display text-[10px] uppercase tracking-widest text-brand-orange mb-6 border-b border-brand-border/30 pb-4">Brands</h4>
                      <div className="space-y-4">
                         {['Victron Energy', 'Truma', 'Dometic', 'Dodo Mat'].map(label => (
                           <label key={label} className="flex items-center gap-3 cursor-pointer group text-left">
                              <div className="w-4 h-4 border border-brand-border bg-brand-carbon group-hover:border-brand-orange transition-colors" />
                              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-wider group-hover:text-white transition-colors">{label}</span>
                           </label>
                         ))}
                      </div>
                   </div>
                </aside>

                {/* Grid */}
                <div className="flex-1">
                   <div className="flex justify-between items-center mb-12 font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                      <span>Showing {products?.length || 0} Products</span>
                      <button className="flex items-center gap-2 hover:text-brand-orange transition-colors">
                         <SlidersHorizontal className="w-4 h-4" /> Sort: Featured
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {products?.map((product) => (
                        <Link 
                           key={product.id} 
                           href={`/store/product/${product.slug}`}
                           className="group blueprint-border bg-brand-carbon flex flex-col p-6 hover:bg-brand-graphite transition-all"
                        >
                           <div className="aspect-square bg-brand-obsidian blueprint-border mb-8 overflow-hidden relative">
                              <div className="absolute inset-0 flex items-center justify-center text-brand-orange/20">
                                 <ShoppingBag className="w-12 h-12" />
                              </div>
                              <div className="absolute top-4 left-4 font-mono text-[8px] text-brand-grey uppercase bg-brand-carbon px-2 py-1">
                                 {product.brand}
                              </div>
                              <div className="absolute inset-0 bg-brand-orange/0 group-hover:bg-brand-orange/10 transition-colors duration-500" />
                           </div>
                           <div className="flex-1 flex flex-col">
                              <h3 className="font-display text-lg uppercase mb-2 group-hover:text-brand-orange transition-colors truncate">
                                 {product.name}
                              </h3>
                              <p className="font-sans text-brand-grey text-xs mb-8 line-clamp-2 leading-relaxed">
                                 {product.short_description}
                              </p>
                              <div className="mt-auto pt-6 border-t border-brand-border/30 flex justify-between items-center">
                                 <span className="font-display text-xl tracking-tighter">£{(product.price_gbp / 100).toLocaleString()}</span>
                                 <div className="w-8 h-8 rounded-full border border-brand-border group-hover:border-brand-orange flex items-center justify-center transition-colors">
                                    <ShoppingBag className="w-3 h-3 text-brand-orange" />
                                 </div>
                              </div>
                           </div>
                        </Link>
                      ))}

                      {(!products || products.length === 0) && (
                        <div className="col-span-full py-32 text-center border border-dashed border-brand-border">
                           <p className="font-mono text-brand-grey uppercase tracking-widest text-xs">No products currently listed for this category.</p>
                        </div>
                      )}
                   </div>
                </div>

             </div>
          </div>
       </section>

       <Footer />
    </main>
  );
}
