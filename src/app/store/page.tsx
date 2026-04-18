import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ShoppingBag, Terminal, Shield, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { StoreSearch } from "@/components/store/StoreSearch";
import { RecentlyViewed } from "@/components/store/RecentlyViewed";
import Image from "next/image";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function StoreHub() {
  const { data: categories } = await supabaseAdmin
    .from('product_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  const { data: editorsPick } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('is_editor_pick', true)
    .limit(1);

  const product = editorsPick?.[0];

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/luxury_iveco_snow_canada_1776505225083.png" 
            alt="Expedition Background" 
            fill 
            className="object-cover grayscale-[0.3] brightness-[0.4]"
            priority
          />
          {/* Depth Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian via-transparent to-brand-obsidian opacity-80" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-obsidian/80" />
          <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center pt-24">
          <div className="max-w-5xl mx-auto">
             <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-orange/10 border border-brand-orange/30 backdrop-blur-md mb-8">
                <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">Hardware Node Registry // Global Access</span>
             </div>
            <h1 className="font-display text-8xl lg:text-[12rem] mb-8 uppercase leading-[0.8] tracking-tighter text-white drop-shadow-2xl">
              GEAR FOR <br />
              <span className="text-brand-orange">SERIOUS</span> BUILDS
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-16 px-4">
              Professional-grade components tested in the field and used in our official blueprints. No compromises on the road to freedom.
            </p>
            
            <StoreSearch className="mb-24 scale-110" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
           <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest leading-none">Initialize Scroll</span>
           <div className="w-px h-12 bg-gradient-to-b from-brand-orange to-transparent" />
        </div>
      </section>

      {/* 2. EDITOR'S PICK STRIP */}
      {product && (
        <section className="border-y border-brand-border bg-brand- carbon relative z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange" />
          <div className="container mx-auto px-6 py-8">
            <Link href={`/store/product/${product.slug}`} className="flex flex-col lg:flex-row items-center gap-12 group">
              <div className="flex items-center gap-6 lg:border-r border-brand-border pr-12">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center border border-brand-orange/30">
                  <Sparkles className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block">Editor's Pick</span>
                  <span className="font-display text-xs uppercase tracking-widest">Recommended Gear</span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col lg:flex-row items-center gap-10">
                <div className="w-24 h-24 bg-brand-obsidian p-4 blueprint-border overflow-hidden">
                  <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-display text-xl uppercase group-hover:text-brand-orange transition-colors">{product.name}</h3>
                  <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{product.spec_line}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <span className="font-display text-3xl">£{(product.price_gbp / 100).toLocaleString()}</span>
                <div className="bg-brand-orange text-white px-8 py-4 font-display text-xs uppercase tracking-widest group-hover:bg-white group-hover:text-brand-obsidian transition-all">
                  View Gear →
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* 3. CATEGORY TAXONOMY GRID */}
      <section className="py-32">
        <div className="container mx-auto px-6">
           <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="font-display text-4xl uppercase mb-2">Build Systems Taxonomy</h2>
                <p className="font-sans text-brand-grey">Browse components by technical ecosystem.</p>
              </div>
              <div className="font-mono text-[10px] uppercase text-brand-grey">0X Categories Loaded</div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border">
               {categories?.map((cat) => {
                 // Mapping generated images to categories
                 const imageMap: Record<string, string> = {
                   'power-systems': '/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/cat_electrical_power_systems_1776505608980.png',
                   'climate-control': '/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/cat_heating_climate_control_1776505630980.png',
                   'water-plumbing': '/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/cat_water_plumbing_systems_1776505649499.png',
                   'insulation-build': '/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/cat_insulation_ventilation_build_1776505666892.png',
                   'gas-lpg': '/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/cat_gas_lpg_systems_1776505691366.png',
                   'interior-hardware': '/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/cat_interior_hardware_furniture_1776505705046.png'
                 };
                 
                 const bgImage = imageMap[cat.slug] || '/images/hero-background.png';

                 return (
                   <div 
                     key={cat.id} 
                     className="bg-brand-carbon group relative overflow-hidden flex flex-col min-h-[450px]"
                   >
                     {/* Background Image Layer */}
                     <div className="absolute inset-0 z-0 overflow-hidden">
                       <Image 
                         src={bgImage}
                         alt={cat.name}
                         fill
                         className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
                     </div>

                     <div className="p-12 relative z-10 flex flex-col h-full">
                        <div className="mb-20 flex justify-between items-start">
                           <span className="font-mono text-[10px] text-brand-orange tracking-widest uppercase bg-brand-obsidian/50 px-2 py-1 backdrop-blur-sm">SYS // {cat.slug}</span>
                           <div className="w-10 h-10 border border-brand-border bg-brand-obsidian/50 backdrop-blur-sm flex items-center justify-center opacity-30 group-hover:opacity-100 group-hover:border-brand-orange group-hover:rotate-45 transition-all duration-500">
                             <ArrowRight className="w-4 h-4 text-brand-orange -rotate-45" />
                           </div>
                        </div>
                        
                        <div className="mt-auto">
                           <h3 className="font-display text-4xl uppercase mb-4 leading-none">{cat.name}</h3>
                           <p className="font-sans text-brand-grey text-sm mb-8 line-clamp-2 max-w-[280px]">
                              {cat.description || "Technical grade components for professional off-grid conversions."}
                           </p>
                           
                           {/* Subcategory quick links */}
                           <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
                              {cat.subcategories?.slice(0, 3).map((sub: any) => (
                                <Link 
                                   key={sub.slug} 
                                   href={`/store/${cat.slug}?sub=${sub.slug}`}
                                   className="font-mono text-[9px] text-brand-grey hover:text-brand-orange transition-colors uppercase tracking-widest flex items-center gap-1"
                                >
                                  <span className="text-brand-orange/40">{">"}</span> {sub.name}
                                </Link>
                              ))}
                           </div>
   
                           <Link 
                             href={`/store/${cat.slug}`}
                             className="inline-block font-display text-[10px] uppercase tracking-widest text-white border-b border-brand-orange pb-2 hover:text-brand-orange transition-colors"
                           >
                             Enter Registry →
                           </Link>
                        </div>
                     </div>
                   </div>
                 );
               })}
            </div>
        </div>
      </section>

      {/* 4. BUILD KITS CTA */}
      <section className="py-32 bg-brand-carbon border-y border-brand-border relative overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="font-mono text-xs text-brand-orange uppercase tracking-widest mb-6 block">Bundle Registry</span>
                <h2 className="font-display text-6xl lg:text-8xl uppercase mb-8 leading-none tracking-tighter">
                  CURATED <br />
                  <span className="text-brand-orange">BUILD KITS</span>
                </h2>
                <p className="font-sans text-brand-grey text-xl leading-relaxed mb-12 max-w-lg">
                  Pre-configured component packages at bundle pricing. Everything you need for a specific system tier, verified by our engineers.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/store/kits" className="bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all text-center">
                    Browse All Kits
                  </Link>
                  <Link href="/planner" className="blueprint-border px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-brand-graphite transition-all text-center">
                    Custom Kit Planner
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { name: 'Essential Off-Grid', img: '/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/kit_essential_offgrid_bundle_1776505721992.png', savings: '12%' },
                   { name: 'Expedition Extreme', img: '/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/kit_expedition_extreme_bundle_1776505738197.png', savings: '18%' },
                   { name: 'Luxury Living', img: '/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/kit_luxury_living_bundle_1776505764537.png', savings: '15%' },
                   { name: 'Base Foundation', img: '/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/kit_base_foundation_bundle_1776505780135.png', savings: '22%' }
                 ].map((kit, i) => (
                   <div key={i} className="relative aspect-square bg-brand-obsidian blueprint-border overflow-hidden group cursor-pointer">
                      <Image 
                        src={kit.img}
                        alt={kit.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-80 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                        <div className="font-mono text-[8px] text-brand-grey uppercase tracking-widest bg-brand-obsidian/50 self-start px-2 py-1 backdrop-blur-sm">Kit Registry // 0{i+1}</div>
                        
                        <div className="mt-auto">
                          <h3 className="font-display text-sm uppercase mb-2 group-hover:text-brand-orange transition-colors">{kit.name}</h3>
                          <div className="flex justify-between items-end">
                            <span className="font-mono text-[9px] uppercase text-brand-grey">Save Up To</span>
                            <span className="font-mono text-sm text-brand-orange font-bold">{kit.savings}</span>
                          </div>
                        </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 5. RECENTLY VIEWED */}
      <RecentlyViewed />

      {/* 6. BRAND LOGO STRIP */}
      <section className="py-24 grayscale opacity-40 hover:opacity-100 transition-opacity">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-16 lg:gap-32 items-center">
             {['Victron Energy', 'Dometic', 'Truma', 'Webasto', 'Fogstar', 'MaxxAir', 'Fiamma', 'Thule'].map(brand => (
               <span key={brand} className="font-display text-2xl uppercase tracking-tighter transition-colors hover:text-brand-orange cursor-default">{brand}</span>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
