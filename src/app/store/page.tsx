import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ShoppingBag, Terminal, Shield, Zap, Sparkles, Search, Monitor, Package, Star } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { StoreSearch } from "@/components/store/StoreSearch";
import { RecentlyViewed } from "@/components/store/RecentlyViewed";
import { ProductCard } from "@/components/store/ProductCard";
import Image from "next/image";
import { cn } from "@/lib/utils";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function StoreHub() {
  // Fetch Categories
  const { data: categories } = await supabaseAdmin
    .from('product_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  // Fetch Editor's Pick
  const { data: editorsPick } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('is_editor_pick', true)
    .eq('is_active', true)
    .limit(1);

  // Fetch Trending/Popular
  const { data: trending } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_priority', { ascending: false })
    .limit(8);

  // Fetch New Arrivals (Last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const { data: newArrivals } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('is_active', true)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(8);

  // Fetch Build Kits
  const { data: kits } = await supabaseAdmin
    .from('build_kits')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(3);

  const featuredProduct = editorsPick?.[0];
  const allCategories = categories || [];

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/store-hero.png"
          alt="Freedom Hardware Showroom"
          fill
          priority
          className="object-cover scale-105 animate-slow-zoom brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian/60 via-transparent to-brand-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center pt-24">
          <div className="max-w-4xl mx-auto">
             <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-orange/10 border border-brand-orange/30 backdrop-blur-md mb-12">
                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">Hardware Node Registry // UK Stockist</span>
             </div>
            <h1 className="font-display text-6xl lg:text-[10rem] mb-8 uppercase leading-[0.85] tracking-tighter text-white drop-shadow-2xl">
              GEAR FOR <br />
              <span className="text-brand-orange">SERIOUS</span> BUILDS
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-16 px-4">
              Professional-grade components tested in the field. Every product we sell is specified in our official blueprints.
            </p>
            
            <div className="max-w-2xl mx-auto px-4">
              <StoreSearch className="scale-110 shadow-2xl shadow-black/80" />
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                <Link href="/store/all" className="font-mono text-[10px] text-white hover:text-brand-orange uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-2 transition-all">
                  Browse by System <ArrowRight className="w-3 h-3" />
                </Link>
                <Link href="/store/kits" className="font-mono text-[10px] text-white hover:text-brand-orange uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-2 transition-all">
                  View Build Kits <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITOR'S PICK — FEATURE PRODUCT */}
      {featuredProduct && (
        <section className="py-24 border-y border-brand-border bg-brand- carbon relative z-10 overflow-hidden">
          <div className="blueprint-grid absolute inset-0 opacity-5" />
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              {/* Product Image Stage */}
              <div className="w-full lg:w-2/5 aspect-square relative group">
                <div className="absolute inset-0 bg-brand-orange/5 blueprint-border -rotate-3 group-hover:rotate-0 transition-transform duration-700" />
                <div className="absolute inset-0 bg-brand-obsidian p-12 blueprint-border relative">
                  <Image 
                    src={featuredProduct.images?.[0] || "/images/hero-background.png"} 
                    alt={featuredProduct.name}
                    fill
                    className="object-contain p-12 grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
                <div className="absolute top-8 left-8">
                  <div className="bg-brand-orange text-white px-4 py-2 font-display text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Editor's Pick
                  </div>
                </div>
              </div>

              {/* Editorial Content */}
              <div className="flex-1 space-y-10">
                <div>
                  <span className="font-mono text-xs text-brand-orange uppercase tracking-widest block mb-4">Registry Priority Gear</span>
                  <h2 className="font-display text-5xl lg:text-7xl uppercase leading-none tracking-tighter mb-8 group">
                    {featuredProduct.name}
                  </h2>
                  <p className="font-sans text-brand-grey text-xl leading-relaxed italic">
                    {featuredProduct.short_description || "The definitive hardware selection for this technical system tier. Proven performance in extreme off-grid conditions."}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-8 py-8 border-y border-brand-border/50">
                  {Object.entries((featuredProduct.specs as any || {})).slice(0, 3).map(([key, val]) => (
                    <div key={key}>
                      <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-1">{key}</span>
                      <span className="font-display text-lg text-white">{val as string}</span>
                    </div>
                  ))}
                  {/* Fallback if no specs */}
                  {!featuredProduct.specs && (
                    <>
                      <div><span className="font-mono text-[9px] text-brand-grey uppercase block mb-1">Status</span><span className="font-display text-lg text-white">Verified</span></div>
                      <div><span className="font-mono text-[9px] text-brand-grey uppercase block mb-1">Tier</span><span className="font-display text-lg text-white">Premium</span></div>
                      <div><span className="font-mono text-[9px] text-brand-grey uppercase block mb-1">Network</span><span className="font-display text-lg text-white">Global</span></div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-12 pt-4">
                  <div>
                    <span className="font-mono text-[10px] text-brand-grey uppercase block mb-1">Investment</span>
                    <span className="font-display text-4xl text-white">£{(featuredProduct.price_gbp / 100).toLocaleString()}</span>
                  </div>
                  <Link 
                    href={`/store/product/${featuredProduct.slug}`}
                    className="bg-brand-orange text-white px-12 py-5 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all shadow-xl shadow-brand-orange/20"
                  >
                    View Product →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. MOST POPULAR ROW */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="font-display text-4xl uppercase mb-2">Most Popular This Month</h2>
              <p className="font-sans text-brand-grey">The essential nodes for active builds across the UK.</p>
            </div>
            <Link href="/store/all" className="font-mono text-xs text-brand-orange hover:text-white uppercase tracking-widest border-b border-brand-orange pb-2 transition-colors">
              View All Bestsellers →
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-12 no-scrollbar gap-8">
            {trending?.map((prod) => (
              <div key={prod.id} className="min-w-[320px] shrink-0">
                 <ProductCard 
                   id={prod.id}
                   name={prod.name}
                   brand={prod.brand}
                   price={prod.price_gbp}
                   compareAtPrice={prod.compare_at_price}
                   image={prod.images?.[0] || prod.image_url}
                   slug={prod.slug}
                   specLine={prod.spec_line}
                   badge={prod.is_editor_pick ? "Editor's Pick" : undefined}
                   systemTier={prod.system_tier}
                 />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SHOP BY BUILD SYSTEM */}
      <section className="py-32 bg-brand-carbon/30 border-y border-brand-border">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl uppercase mb-16 text-center">Shop by Build System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {allCategories.map((cat) => (
               <Link 
                 key={cat.id} 
                 href={`/store/${cat.slug}`}
                 className="group relative h-[400px] overflow-hidden blueprint-border bg-brand-obsidian"
               >
                 <Image 
                   src={cat.image || "/images/hero-background.png"} 
                   alt={cat.name}
                   fill
                   className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
                 
                 <div className="absolute inset-0 p-10 flex flex-col justify-between">
                   <div className="flex items-center justify-between">
                     <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest border border-brand-orange/30 px-3 py-1 bg-brand-obsidian/80 backdrop-blur-sm">
                       Network Node: {cat.slug.slice(0, 3)}
                     </span>
                     <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">{cat.sort_order} products</span>
                   </div>

                   <div>
                     <h3 className="font-display text-3xl uppercase mb-4 group-hover:text-brand-orange transition-colors">{cat.name}</h3>
                     <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
                        {(cat.subcategories as any || []).slice(0, 3).map((sub: any) => (
                          <span key={sub.name} className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">
                            {sub.name}
                          </span>
                        ))}
                     </div>
                     <span className="font-mono text-[10px] text-brand-white uppercase tracking-widest border-b border-white/20 pb-1 group-hover:border-brand-orange group-hover:text-brand-orange transition-all">
                       Enter Registry →
                     </span>
                   </div>
                 </div>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* 5. CURATED BUILD KITS */}
      <section className="py-32 bg-brand-obsidian relative overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-24">
              <span className="font-mono text-xs text-brand-orange uppercase tracking-widest mb-6 block">Tiered Solutions</span>
              <h2 className="font-display text-6xl lg:text-8xl uppercase leading-none mb-8">Curated Build Kits</h2>
              <p className="font-sans text-brand-grey text-xl max-w-2xl mx-auto">
                Complete component packages at bundle pricing. Everything you need for your system tier, verified by our engineers.
              </p>
           </div>

           <div className="grid lg:grid-cols-3 gap-12">
              {(kits || []).map((kit) => (
                <div key={kit.id} className="group blueprint-border bg-brand-carbon transition-all duration-500 overflow-hidden flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={kit.image || "/images/kit-essential.png"} 
                      alt={kit.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-80 group-hover:scale-110"
                    />
                    <div className="absolute top-6 right-6">
                      <span className="bg-brand-orange text-white px-4 py-2 font-display text-[10px] uppercase tracking-widest shadow-xl">
                        Save {kit.savings_percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="p-10 flex-1 flex flex-col">
                    <h3 className="font-display text-2xl uppercase mb-4 group-hover:text-brand-orange transition-colors">{kit.name}</h3>
                    <p className="font-sans text-brand-grey text-sm leading-relaxed mb-8 mb-auto line-clamp-3">
                      {kit.description || "Full system blueprint components bundled for maximum performance and value."}
                    </p>
                    <div className="pt-8 border-t border-brand-border flex items-center justify-between">
                       <span className="font-display text-2xl">£{(kit.kit_price_gbp / 100).toLocaleString()}</span>
                       <Link href={`/store/kits/${kit.slug}`} className="font-mono text-[10px] text-brand-white hover:text-brand-orange uppercase tracking-widest transition-colors flex items-center gap-2">
                         View Kit <ArrowRight className="w-3 h-3" />
                       </Link>
                    </div>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="mt-20 text-center">
              <Link href="/store/kits" className="inline-flex items-center gap-4 bg-white text-brand-obsidian px-12 py-5 font-display text-xs uppercase tracking-[0.2em] hover:bg-brand-orange hover:text-white transition-all">
                Browse All Kits <Package className="w-4 h-4" />
              </Link>
           </div>
        </div>
      </section>

      {/* 6. BRAND SHOWCASE */}
      <section className="py-24 border-t border-brand-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="font-display text-xs tracking-[0.4em] text-brand-grey uppercase italic">Authorised Registry Partners</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-12 lg:gap-24 items-center grayscale opacity-40 hover:opacity-80 transition-all duration-700">
             {['Victron Energy', 'Dometic', 'Truma', 'Webasto', 'Fogstar', 'Dodo Mat', 'MaxxAir', 'Fiamma', 'Thule', 'Whale', 'Propex'].map(brand => (
               <span key={brand} className="font-display text-xl uppercase tracking-tighter hover:text-brand-orange transition-colors whitespace-nowrap cursor-default">
                 {brand}
               </span>
             ))}
          </div>
        </div>
      </section>

      {/* 7. EDITORIAL PATHWAYS CTA */}
      <section className="py-24 bg-brand-carbon border-y border-brand-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-px bg-brand-border">
            <div className="bg-brand-carbon p-12 lg:p-20 group">
               <h3 className="font-display text-3xl uppercase mb-6">Build System Guides</h3>
               <p className="font-sans text-brand-grey leading-relaxed mb-10">
                 Expert technical guides that walk you through every component, tier by tier, so you buy the right kit the first time.
               </p>
               <Link href="/systems" className="font-mono text-[10px] text-brand-orange uppercase tracking-widest border-b border-brand-orange pb-2 group-hover:text-white group-hover:border-white transition-all">
                 Read System Guides →
               </Link>
            </div>
            <div className="bg-brand-carbon p-12 lg:p-20 group">
               <h3 className="font-display text-3xl uppercase mb-6 text-brand-orange">Advanced Planner</h3>
               <p className="font-sans text-brand-grey leading-relaxed mb-10">
                 Configure your entire conversion system by system and get a professional blueprint with a complete parts list.
               </p>
               <Link href="/planner" className="font-mono text-[10px] text-brand-orange uppercase tracking-widest border-b border-brand-orange pb-2 group-hover:text-white group-hover:border-white transition-all">
                 Initialize Planner →
               </Link>
            </div>
          </div>
        </div>
      </section>

      <RecentlyViewed />

      <Footer />
    </main>
  );
}
