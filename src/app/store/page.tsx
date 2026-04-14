import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShoppingBag, ArrowRight, Zap, Thermometer, Droplets, Layers, Shield, Layout, Settings } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function StoreHub() {
  const { data: categories } = await supabaseAdmin
    .from('product_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  const { data: featuredProducts } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('is_active', true)
    .limit(4);

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      {/* 1. STORE HERO */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl text-left">
            <h1 className="font-display text-7xl lg:text-9xl mb-8 uppercase leading-none tracking-tighter">
              GEAR FOR <span className="text-brand-orange">SERIOUS</span> BUILDS
            </h1>
            <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl mb-12">
              Every component we sell is tested in the field and used in our official blueprints. Professional grade hardware, no compromises.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY GRID */}
      <section className="py-24 border-y border-brand-border/30">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px bg-brand-border/30 border border-brand-border/30">
              {categories?.map((cat) => (
                <Link 
                  key={cat.id} 
                  href={`/store/${cat.slug}`}
                  className="bg-brand-carbon p-10 hover:bg-brand-graphite transition-all group relative overflow-hidden"
                >
                  <div className="relative z-10 flex flex-col h-full">
                     <span className="font-mono text-[8px] text-brand-orange uppercase tracking-widest mb-16">
                        CAT // 0{cat.sort_order}
                     </span>
                     <h3 className="font-display text-xl uppercase mb-2 group-hover:text-brand-orange transition-colors">
                        {cat.name}
                     </h3>
                     <p className="font-sans text-[10px] text-brand-grey uppercase tracking-widest">
                        View Products <ArrowRight className="inline-block w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                     </p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 text-brand-orange/5 font-display text-8xl group-hover:text-brand-orange/10 transition-colors">
                     {cat.name.charAt(0)}
                  </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="py-32">
        <div className="container mx-auto px-6">
           <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="font-display text-4xl uppercase mb-4">Flagship Equipment</h2>
                <p className="font-sans text-brand-grey">Curated essentials for high-autonomy conversions.</p>
              </div>
              <Link href="/store/all" className="font-mono text-[10px] uppercase tracking-widest text-brand-orange hover:text-white transition-colors">
                 Browse Entire Catalogue →
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts?.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/store/product/${product.slug}`}
                  className="group blueprint-border bg-brand-carbon flex flex-col p-6 hover:bg-brand-graphite transition-all"
                >
                   <div className="aspect-square bg-brand-obsidian blueprint-border mb-8 overflow-hidden relative">
                      {/* Using placeholder if no image exists in DB yet */}
                      <div className="absolute inset-0 flex items-center justify-center text-brand-orange/20">
                         <ShoppingBag className="w-12 h-12" />
                      </div>
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
                         <span className="font-mono text-[8px] text-brand-orange border border-brand-orange/30 px-2 py-1">
                            ADD TO CART +
                         </span>
                      </div>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

       {/* 4. BRAND SHOWCASE */}
       <section className="py-24 bg-brand-carbon border-y border-brand-border/30">
          <div className="container mx-auto px-6">
             <div className="flex flex-wrap justify-center gap-16 lg:gap-32 items-center opacity-30 grayscale hover:grayscale-0 transition-all">
                {['Victron Energy', 'Truma', 'Dometic', 'Webasto', 'MaxxAir', 'Whale'].map(brand => (
                  <span key={brand} className="font-display text-2xl uppercase tracking-tighter whitespace-nowrap">{brand}</span>
                ))}
             </div>
          </div>
       </section>

      <Footer />
    </main>
  );
}
