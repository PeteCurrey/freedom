import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";
import { SpecCard } from "@/components/ui/SpecCard";
import { ExternalLink, Ruler, Check, X, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/store/ProductCard";
import { vehicleData } from "@/lib/data/vehicles";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const vehicle = vehicleData[params.slug as keyof typeof vehicleData] || vehicleData["mercedes-sprinter"];
  return {
    title: `${vehicle.name} Campervan Conversion Guide`,
    description: vehicle.description,
    openGraph: {
      title: `${vehicle.name} | Amplios`,
      description: vehicle.description,
      images: [vehicle.heroImage],
    },
  };
}

export default function VehicleProfile({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const vehicle = vehicleData[slug as keyof typeof vehicleData] || vehicleData["mercedes-sprinter"];

  return (
    <main className="bg-brand-obsidian">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-end">
        <div className="absolute inset-0">
          <Image 
            src={vehicle.heroImage} 
            alt={vehicle.name} 
            fill 
            className="object-cover grayscale opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 pb-24 relative z-10">
          <div className="max-w-4xl">
            <h1 className="font-display text-6xl lg:text-9xl mb-4 leading-none">{vehicle.name}</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <p className="font-mono text-sm lg:text-lg text-brand-orange uppercase tracking-[0.3em]">
                {"//"} {vehicle.tagline}
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href={vehicle.manufacturerUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest hover:text-brand-white transition-colors border-b border-brand-grey/20 pb-1"
                >
                  Manufacturer <ExternalLink className="w-3 h-3" />
                </a>
                <Link 
                  href={`/vehicles/${slug}/buying-guide`}
                  className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-widest hover:text-brand-white transition-colors border-b border-brand-orange/20 pb-1 italic font-bold"
                >
                  Buying Guide <ExternalLink className="w-3 h-3" />
                </Link>
                <Link 
                  href="/vehicles/compare"
                  className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest hover:text-brand-white transition-colors border-b border-brand-grey/20 pb-1 italic"
                >
                  Compare All <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Specs & Intro */}
      <section className="py-24 border-b border-brand-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-xs tracking-[0.3em] text-brand-grey uppercase mb-8">Foundation Analysis</h2>
              <p className="font-sans text-brand-white text-xl lg:text-3xl leading-relaxed">
                {vehicle.description}
              </p>
              <div className="mt-12 flex items-center gap-6">
                <Link
                  href={`/vehicles/${slug}/listings`}
                  className="px-8 py-4 border border-brand-orange text-brand-orange font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all"
                >
                  Search Used {vehicle.name}s →
                </Link>
              </div>
            </div>
            <div>
              <SpecCard title="Vehicle Specs" specs={vehicle.specs} />
            </div>
          </div>
        </div>
      </section>

      {/* Configurations — Horizontal Scroll */}
      <HorizontalScroll title="DIMENSIONS & LOADSPACE" subtitle="All available wheelbase and roof combinations.">
        {vehicle.configurations.map((config, i) => (
          <div key={i} className="w-[400px] blueprint-border p-10 bg-brand-carbon flex flex-col justify-between h-[500px]">
            <div>
              <h3 className="font-display text-2xl mb-8 group-hover:text-brand-orange transition-colors">
                {config.label}
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Internal Length</span>
                  <span className="font-mono text-sm text-brand-white">{config.internalL}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">External Length</span>
                  <span className="font-mono text-sm text-brand-white">{config.length}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Roof Height</span>
                  <span className="font-mono text-sm text-brand-white">{config.height}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Volume</span>
                  <span className="font-mono text-sm text-brand-white">{config.volume}</span>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-8 border-t border-brand-border flex items-center justify-between">
              <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Conf: SPR-M3-{i+1}</span>
              <Ruler className="w-5 h-5 text-brand-orange opacity-40" />
            </div>
          </div>
        ))}
      </HorizontalScroll>

      {/* Conversion Analysis (Pros/Cons) */}
      <section className="py-32 bg-brand-carbon relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="font-display text-4xl mb-12">THE VERDICT</h2>
              <div className="space-y-4 mb-16">
                <div className="blueprint-border p-8 bg-brand-obsidian/50 border-l-4 border-l-brand-orange">
                  <p className="font-sans text-brand-grey text-xs uppercase tracking-widest mb-2 font-bold">Best For</p>
                  <p className="font-sans text-brand-white leading-relaxed">{vehicle.bestFor}</p>
                </div>
                <div className="blueprint-border p-8 bg-brand-obsidian/50 border-l-4 border-l-red-500/50">
                  <p className="font-sans text-brand-grey text-xs uppercase tracking-widest mb-2 font-bold">Watch Out For</p>
                  <p className="font-sans text-brand-white leading-relaxed">{vehicle.watchOutFor}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="font-display text-lg text-brand-orange flex items-center gap-2">
                  <Check className="w-5 h-5" /> PROS
                </h3>
                <ul className="space-y-4">
                  {vehicle.pros.map((p, i) => (
                    <li key={i} className="font-sans text-brand-grey text-sm border-l border-brand-orange/30 pl-4">{p}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="font-display text-lg text-red-500/80 flex items-center gap-2">
                  <X className="w-5 h-5" /> CONS
                </h3>
                <ul className="space-y-4">
                  {vehicle.cons.map((c, i) => (
                    <li key={i} className="font-sans text-brand-grey text-sm border-l border-red-500/20 pl-4">{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Products */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-display text-4xl">COMPATIBLE GEAR</h2>
            <Link href="/store" className="font-mono text-xs uppercase tracking-widest text-brand-orange">{/* // Shop All Parts */}Shop All Parts</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* FIND YOUR VEHICLE — Affiliate Sourcing Section */}
      <section className="py-24 bg-brand-carbon border-y border-brand-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="font-display text-4xl uppercase mb-4">
              FIND YOUR <span className="text-brand-orange">{vehicle.name.split(" ")[0]}</span>
            </h2>
            <p className="font-sans text-brand-grey">
              Ready to source your base vehicle? We&apos;ve pre-linked the UK&apos;s best marketplaces with the right search terms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* eBay */}
            <a
              href={(vehicle as any).ebaySearch || `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(vehicle.name)}+panel+van`}
              target="_blank"
              rel="noopener noreferrer"
              className="group blueprint-border bg-brand-obsidian p-8 flex flex-col justify-between h-52 hover:bg-brand-orange/5 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-xl tracking-tighter text-brand-white">
                  <span className="text-[#E53238]">e</span><span className="text-[#0064D2]">B</span><span className="text-[#F5AF02]">a</span><span className="text-[#86B817]">y</span>{" "}
                  <span className="text-brand-grey text-sm font-sans font-normal">Motors UK</span>
                </div>
                <ExternalLink className="w-4 h-4 text-brand-grey group-hover:text-brand-orange transition-colors" />
              </div>
              <div>
                <h3 className="font-display text-lg uppercase mb-1">{vehicle.name} Panel Vans</h3>
                <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Pre-filtered listings</p>
              </div>
              <span className="font-mono text-[9px] text-brand-orange uppercase font-bold">Search eBay →</span>
            </a>

            {/* AutoTrader */}
            <a
              href={(vehicle as any).autotraderSearch || "https://www.autotrader.co.uk/vans"}
              target="_blank"
              rel="noopener noreferrer"
              className="group blueprint-border bg-brand-obsidian p-8 flex flex-col justify-between h-52 hover:bg-brand-orange/5 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] text-brand-white uppercase tracking-widest">AutoTrader UK</div>
                <ExternalLink className="w-4 h-4 text-brand-grey group-hover:text-brand-orange transition-colors" />
              </div>
              <div>
                <h3 className="font-display text-lg uppercase mb-1">{vehicle.name} on AutoTrader</h3>
                <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Verified dealership stock</p>
              </div>
              <span className="font-mono text-[9px] text-brand-orange uppercase font-bold">Search AutoTrader →</span>
            </a>

            {/* Facebook Marketplace */}
            <a
              href="https://www.facebook.com/marketplace/category/vehicles"
              target="_blank"
              rel="noopener noreferrer"
              className="group blueprint-border bg-brand-obsidian p-8 flex flex-col justify-between h-52 hover:bg-brand-orange/5 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] text-[#1877F2] uppercase tracking-widest">Facebook Marketplace</div>
                <ExternalLink className="w-4 h-4 text-brand-grey group-hover:text-brand-orange transition-colors" />
              </div>
              <div>
                <h3 className="font-display text-lg uppercase mb-1">{vehicle.name} Private Sales</h3>
                <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Private sellers nationwide</p>
              </div>
              <span className="font-mono text-[9px] text-brand-orange uppercase font-bold">Search Marketplace →</span>
            </a>
          </div>
          <p className="font-mono text-[8px] text-brand-grey/50 uppercase tracking-widest mt-8">
            We may earn a commission from purchases made through affiliate links. This doesn&apos;t affect our recommendations.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 border-t border-brand-border">
        <div className="container mx-auto px-6">
          <div className="blueprint-border p-12 bg-brand-carbon flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="hidden md:flex flex-col items-center gap-2 font-mono text-brand-grey">
                <ShieldCheck className="w-10 h-10 text-brand-orange" />
                <span className="text-[8px] uppercase tracking-widest">Verified</span>
              </div>
              <div>
                <h3 className="font-display text-2xl mb-2 italic">READY TO START YOUR {vehicle.name} BUILD?</h3>
                <p className="font-sans text-brand-grey text-sm">Download our free {vehicle.name} dimension guide PDF.</p>
              </div>
            </div>
            <button className="px-10 py-5 bg-brand-orange text-white font-display text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform">
              Download Build Pack →
            </button>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Sticky Bottom Source Bar (Optional but high conversion) */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-4 transform translate-y-full hover:translate-y-0 transition-transform duration-500 bg-brand-obsidian/90 backdrop-blur-xl border-t border-brand-orange/40 lg:hidden">
         <div className="flex items-center justify-between gap-4">
            <span className="font-display text-[10px] uppercase text-brand-white">Find a {slug}</span>
            <Link href={`/vehicles/${slug}/listings`} className="flex-1 bg-brand-orange p-3 text-center font-display text-[10px] uppercase tracking-widest text-white">
               Search Marketplaces →
            </Link>
         </div>
      </div>
    </main>
  );
}

const featuredProducts = [
  { id: "1", name: "Sprinter-Specific MaxxAir Vent Kit", brand: "MAXXAIR", price: 34500, image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000", category: "Ventilation" },
  { id: "2", name: "Victron Sprinter Electrical Bundle", brand: "VICTRON", price: 425000, image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000", category: "Electrical" },
  { id: "3", name: "Custom Sprinter Floor Plate", brand: "DIYM", price: 125000, image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000", category: "Interior" },
  { id: "4", name: "Dometic S4 Window - Sprinter L3", brand: "DOMETIC", price: 45900, image: "https://images.unsplash.com/photo-1544621443-42468301beaf?q=80&w=1000", category: "Windows" },
];
