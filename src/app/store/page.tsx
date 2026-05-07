import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, BookOpen, Settings, Package, Sparkles } from "lucide-react";
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

  const featuredProduct = editorsPick?.[0] || {
    id: "victron-multiplus-ii-12-3000-120-32",
    name: "Victron MultiPlus-II 12/3000/120-32",
    brand: "VICTRON ENERGY",
    price_gbp: 124500,
    images: ["/images/systems-showcase.png"],
    slug: "victron-multiplus-ii-12-3000-120-32"
  };

  const systems = [
    { name: "Power Systems", slug: "electrical", image: "/images/cat-power.png", count: 42, links: "Inverters · Batteries · Solar" },
    { name: "Climate Control", slug: "climate", image: "/images/cat-climate.png", count: 28, links: "Diesel heaters · Combi · Air con" },
    { name: "Plumbing", slug: "plumbing", image: "/images/cat-water.png", count: 35, links: "Tanks · Pumps · Filtration" },
    { name: "Insulation & Build", slug: "insulation", image: "/images/cat-insulation.png", count: 18, links: "Celotex · Dodo Mat · Vapour" },
    { name: "Windows & Vent", slug: "windows-ventilation", image: "/images/sprinter.png", count: 12, links: "MaxxFan · Dometic S4 · Bonded" },
    { name: "Exterior & Accessories", slug: "exterior-accessories", image: "/images/exterior-equipment-technical.png", count: 24, links: "Awnings · Ladders · Tyres" },
  ];

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/images/interior-showcase.png"
          alt="Amplios Store Showroom"
          fill
          priority
          className="object-cover scale-105 animate-slow-zoom brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian/80 via-brand-obsidian/50 to-[#141414]" />
        
        <div className="container mx-auto px-6 relative z-10 text-center pt-32">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <h1 className="font-display text-5xl md:text-7xl lg:text-[8rem] mb-6 uppercase leading-[0.85] tracking-tighter text-white drop-shadow-2xl">
              GEAR FOR<br />
              SERIOUS BUILDS
            </h1>
            <p className="font-sans text-brand-grey text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
              Professional-grade components tested in the field. Every product we sell is specified in our official blueprints.
            </p>
            
            <div className="w-full max-w-xl mx-auto relative mb-8">
              <StoreSearch className="w-full shadow-2xl" />
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <a href="#systems" className="font-mono text-xs text-white hover:text-brand-orange uppercase tracking-widest transition-colors pb-1 border-b border-transparent hover:border-brand-orange">
                Browse by System ↓
              </a>
              <Link href="/store/kits" className="font-mono text-xs text-brand-orange uppercase tracking-widest flex items-center gap-2 transition-colors pb-1 border-b border-brand-orange hover:text-white hover:border-white">
                View Build Kits <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITOR'S PICK — HERO PRODUCT */}
      <section className="relative z-20 -mt-12 mb-32">
        <div className="container mx-auto px-6">
          <div className="bg-[#141414] border border-brand-border/50 p-8 lg:p-16 shadow-2xl flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Image (40%) */}
            <div className="w-full lg:w-[40%] aspect-square relative bg-brand-carbon flex items-center justify-center p-8 group">
              <div className="absolute inset-0 blueprint-grid opacity-10" />
              <Image 
                src={featuredProduct.images?.[0] || "/images/hero-background.png"} 
                alt={featuredProduct.name}
                fill
                className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-brand-orange text-white font-display text-xs uppercase tracking-widest px-4 py-2 font-medium">
                  Editor's Pick
                </span>
              </div>
            </div>

            {/* Content (60%) */}
            <div className="w-full lg:w-[60%] flex flex-col justify-center">
              <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter mb-8 leading-[0.9]">
                {featuredProduct.name}
              </h2>
              
              <div className="prose prose-invert max-w-none text-brand-grey text-lg leading-relaxed mb-10 border-l-2 border-brand-orange/30 pl-6 italic">
                <p>
                  The Victron MultiPlus-II isn't just an inverter. It's the command centre of your entire off-grid electrical system — a 3kVA pure sine wave inverter, a 120A battery charger, and an automatic transfer switch, all in a single unit that weighs less than a car battery. If you're building a Full Autonomy system, this is where you start.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 mb-12">
                <div className="font-mono text-sm text-white bg-brand-carbon px-4 py-2 border border-brand-border">12V</div>
                <div className="font-mono text-sm text-white bg-brand-carbon px-4 py-2 border border-brand-border">3000VA</div>
                <div className="font-mono text-sm text-white bg-brand-carbon px-4 py-2 border border-brand-border">120A</div>
                <div className="font-mono text-sm text-white bg-brand-carbon px-4 py-2 border border-brand-border">18kg</div>
              </div>

              <div className="flex items-center gap-8 mt-auto">
                <span className="font-display text-4xl text-white">£{(featuredProduct.price_gbp / 100).toLocaleString()}</span>
                <Link 
                  href={`/store/product/${featuredProduct.slug}`}
                  className="bg-brand-orange text-white px-8 py-4 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-colors"
                >
                  View Product →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MOST POPULAR (Horizontal Scroll) */}
      <section className="py-24 border-y border-brand-border bg-brand-obsidian">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] mb-4 block">// Most Popular</span>
            <div className="flex justify-between items-end">
              <h2 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter">What Builders Are Buying</h2>
              <Link href="/store/all" className="hidden md:flex font-mono text-xs text-brand-grey hover:text-white uppercase tracking-widest border-b border-brand-grey pb-1 transition-colors">
                Browse All Products →
              </Link>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-12 -mx-6 px-6 gap-6 no-scrollbar snap-x">
            {trending?.map((prod) => (
              <div key={prod.id} className="min-w-[300px] w-[300px] shrink-0 snap-start">
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

      {/* 4. SHOP BY SYSTEM */}
      <section id="systems" className="py-32 bg-brand-carbon/30">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] mb-4 block">// Shop by System</span>
            <h2 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter">Find What You Need</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {systems.map((cat) => (
               <Link 
                 key={cat.slug} 
                 href={`/store/${cat.slug}`}
                 className="group relative h-[360px] border border-brand-border overflow-hidden bg-brand-carbon block"
               >
                 <Image 
                   src={cat.image} 
                   alt={cat.name}
                   fill
                   className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
                 <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-orange transition-colors duration-500" />
                 
                 <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                   <h3 className="font-display text-3xl uppercase mb-2 group-hover:text-brand-orange transition-colors">{cat.name}</h3>
                   <span className="font-mono text-xs text-white uppercase tracking-widest mb-4 block">{cat.count} products</span>
                   <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{cat.links}</span>
                 </div>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* 5. BUILD KITS FEATURE */}
      <section className="py-32 bg-[#111111] border-y border-brand-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] mb-4 block">// Curated Packages</span>
            <h2 className="font-display text-5xl lg:text-6xl uppercase tracking-tighter mb-8">Build Kits</h2>
            <p className="font-sans text-brand-grey text-lg leading-relaxed">
              Complete component packages at bundle pricing. Everything you need, nothing you don't.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Kit 1 */}
            <div className="bg-brand-obsidian border border-brand-border overflow-hidden group flex flex-col">
              <div className="relative h-64 bg-brand-carbon">
                <Image src="/images/systems-showcase.png" alt="Full Autonomy Electrical Kit" fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" />
                <div className="absolute top-4 right-4 bg-brand-orange text-white px-3 py-1 font-display text-[10px] uppercase tracking-widest">Save 27%</div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="font-display text-2xl uppercase mb-6 group-hover:text-brand-orange transition-colors">Full Autonomy Electrical Kit</h3>
                <span className="font-mono text-xs text-brand-grey uppercase leading-loose mb-8">MultiPlus-II · 400Ah LiFePO4 · 400W Solar</span>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-brand-border">
                  <span className="font-display text-3xl">£3,450</span>
                  <Link href="/store/product/full-autonomy-electrical-kit" className="font-mono text-[10px] uppercase text-white hover:text-brand-orange flex items-center gap-2">View Kit <ArrowRight size={14}/></Link>
                </div>
              </div>
            </div>
            
            {/* Kit 2 */}
            <div className="bg-brand-obsidian border border-brand-border overflow-hidden group flex flex-col">
              <div className="relative h-64 bg-brand-carbon">
                <Image src="/images/heating-system-technical.png" alt="Winter Heating Kit" fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" />
                <div className="absolute top-4 right-4 bg-brand-orange text-white px-3 py-1 font-display text-[10px] uppercase tracking-widest">Save 15%</div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="font-display text-2xl uppercase mb-6 group-hover:text-brand-orange transition-colors">Four Season Climate Kit</h3>
                <span className="font-mono text-xs text-brand-grey uppercase leading-loose mb-8">Truma Combi 4E · CP Plus · Ducting Kit</span>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-brand-border">
                  <span className="font-display text-3xl">£2,100</span>
                  <Link href="/store/product/four-season-climate-kit" className="font-mono text-[10px] uppercase text-white hover:text-brand-orange flex items-center gap-2">View Kit <ArrowRight size={14}/></Link>
                </div>
              </div>
            </div>

            {/* Kit 3 */}
            <div className="bg-brand-obsidian border border-brand-border overflow-hidden group flex flex-col">
              <div className="relative h-64 bg-brand-carbon">
                <Image src="/images/water-plumbing-technical.png" alt="Premium Wetroom Kit" fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" />
                <div className="absolute top-4 right-4 bg-brand-orange text-white px-3 py-1 font-display text-[10px] uppercase tracking-widest">Save 12%</div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="font-display text-2xl uppercase mb-6 group-hover:text-brand-orange transition-colors">Premium Wetroom Kit</h3>
                <span className="font-mono text-xs text-brand-grey uppercase leading-loose mb-8">Whale Pump · 80L Fresh · Mixer Shower</span>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-brand-border">
                  <span className="font-display text-3xl">£850</span>
                  <Link href="/store/product/premium-wetroom-kit" className="font-mono text-[10px] uppercase text-white hover:text-brand-orange flex items-center gap-2">View Kit <ArrowRight size={14}/></Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/store/kits" className="inline-block bg-white text-brand-obsidian px-10 py-4 font-display text-sm uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-colors">
              Browse All Kits →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. BRAND SHOWCASE */}
      <section className="py-24 bg-brand-obsidian border-b border-brand-border overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] mb-4 block">// Authorised Stockist</span>
          <h2 className="font-display text-3xl uppercase tracking-widest mb-16">Trusted Brands</h2>
          
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 items-center opacity-60 hover:opacity-100 transition-opacity">
            {['Victron Energy', 'Dometic', 'Truma', 'Webasto', 'Fogstar', 'MaxxAir', 'Fiamma', 'Whale', 'Propex', 'Dodo Mat'].map((brand) => (
              <span key={brand} className="font-display text-xl uppercase tracking-tighter text-brand-grey hover:text-white transition-colors cursor-default grayscale hover:grayscale-0">
                {brand}
              </span>
            ))}
          </div>
          <p className="font-sans text-brand-grey/50 text-sm mt-16 max-w-xl mx-auto">
            Authorised UK stockist of the world's leading off-grid and leisure vehicle brands.
          </p>
        </div>
      </section>

      {/* 7. EDITORIAL BRIDGE */}
      <section className="py-32 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-px bg-brand-border border border-brand-border">
            
            <div className="bg-brand-obsidian p-12 lg:p-20">
              <div className="w-12 h-12 bg-brand-carbon flex items-center justify-center mb-8 border border-brand-border">
                <BookOpen className="w-5 h-5 text-brand-orange" />
              </div>
              <h3 className="font-display text-4xl uppercase mb-6 tracking-tighter">Read the Guides</h3>
              <p className="font-sans text-brand-grey text-lg leading-relaxed mb-12">
                Expert technical guides that walk you through every component, tier by tier, so you buy the right kit the first time.
              </p>
              <Link href="/systems" className="font-mono text-[10px] uppercase text-white hover:text-brand-orange tracking-widest border-b border-white hover:border-brand-orange pb-1 transition-all inline-flex items-center gap-2">
                Explore Build Systems <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-brand-obsidian p-12 lg:p-20">
              <div className="w-12 h-12 bg-brand-carbon flex items-center justify-center mb-8 border border-brand-border">
                <Settings className="w-5 h-5 text-brand-orange" />
              </div>
              <h3 className="font-display text-4xl uppercase mb-6 tracking-tighter">Use the Planner</h3>
              <p className="font-sans text-brand-grey text-lg leading-relaxed mb-12">
                Configure your entire conversion system by system and get a professional blueprint with a complete parts list.
              </p>
              <Link href="/planner" className="font-mono text-[10px] uppercase text-brand-orange hover:text-white tracking-widest border-b border-brand-orange hover:border-white pb-1 transition-all inline-flex items-center gap-2">
                Launch Build Planner <ArrowRight size={14} />
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
