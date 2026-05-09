import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { WhaleSidebar } from "@/components/editorial/WhaleSidebar";
import { ArrowRight, Droplets, Wind, Zap, ShieldCheck, Map } from "lucide-react";

export const metadata: Metadata = {
  title: "Whale Water & Air Heating UK | Expanse & Heat Air | Amplios",
  description: "Whale is the leader in underslung van heating. Save internal space with the Expanse water heater and Heat Air systems. UK technical authority.",
  openGraph: {
    title: "Whale Water & Air Heating UK | Expanse & Heat Air",
    description: "Maximum internal space, maximum comfort. The underslung specialists.",
    url: "https://amplios.co.uk/brands/whale",
  },
  alternates: { canonical: "https://amplios.co.uk/brands/whale" },
};

const TOC = [
  { id: "intro", label: "The Space Savers" },
  { id: "expanse", label: "Expanse Water Heater" },
  { id: "heat-air", label: "Heat Air Systems" },
  { id: "underslung", label: "Underslung Advantage" },
  { id: "why-whale", label: "The Northern Choice" },
  { id: "shop", label: "Shop Whale" },
];

const MENTIONED_PRODUCTS = [
  { name: "Whale Expanse Water Heater", brand: "Whale", price: 89500, slug: "whale-expanse-underslung-gas-electric-water-heater" },
  { name: "Whale Heat Air G/E", brand: "Whale", price: 94500, slug: "whale-heat-air-underslung-gas-electric-heater" },
  { name: "Whale Watermaster Pump", brand: "Whale", price: 6500, slug: "whale-watermaster-high-flow-pump" },
];

export default function WhaleBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-plumbing.png" // Placeholder
            alt="Whale Underslung Heating"
            fill
            className="object-cover opacity-40 grayscale-[0.2]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // UNDERSLUNG HEATING SOLUTIONS
            </span>
            <h1 className="font-display text-5xl lg:text-8xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-8">
              WHALE:<br /><span className="text-brand-orange">SAVE</span><br />SPACE
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Engineering excellence from Northern Ireland. Whale specializes in 
              underslung water and air heating that clears your cupboards and 
              simplifies your internal build.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-24 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
                The Space-Saving Authority
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
                <p>
                  Whale has revolutionized the campervan market with its range of 
                  **underslung appliances**. By mounting the bulk of the heating 
                  hardware beneath the vehicle chassis, Whale allows van builders 
                  to maximize their internal storage space.
                </p>
                <p>
                  For MWB and SWB vans where every square inch counts, a Whale 
                  system is often the difference between having a full-size wardrobe 
                  and having to sacrifice storage for a large internal heater.
                </p>
              </div>
            </section>

            {/* EXPANSE */}
            <section id="expanse" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Droplets className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  Expanse Water Heater
                </h2>
              </div>
              <div className="bg-brand-carbon border border-brand-border p-10 flex flex-col lg:flex-row gap-10 items-center">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="font-display text-2xl uppercase text-brand-white mb-4">Internal Space, External Heat</h3>
                  <p className="font-sans text-brand-grey text-base leading-relaxed mb-8">
                    The Expanse is a 8-litre water heater that mounts under your van. 
                    Running on both gas and electric (230V), it provides rapid 
                    heat-up times and features a robust frost-protection system 
                    essential for UK winters.
                  </p>
                  <Link href="/guides/whale/expanse-water-heater-guide" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                    Expanse Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="w-full lg:w-1/3 aspect-video bg-brand-obsidian border border-brand-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Expanse Visual</span>
                </div>
              </div>
            </section>

            {/* HEAT AIR */}
            <section id="heat-air" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Wind className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  Heat Air Systems
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-brand-carbon border border-brand-border p-8">
                  <h3 className="font-display text-xl uppercase text-brand-white mb-4">Gas & Electric</h3>
                  <p className="font-sans text-brand-grey text-sm mb-6 leading-relaxed">
                    The Heat Air G/E provides powerful 2kW air heating using either 
                    LPG or 230V mains hookup. This versatility is perfect for both 
                    off-grid wild camping and campsite use.
                  </p>
                </div>
                <div className="bg-brand-carbon border border-brand-border p-8">
                  <h3 className="font-display text-xl uppercase text-brand-white mb-4">Quiet Night Mode</h3>
                  <p className="font-sans text-brand-grey text-sm mb-6 leading-relaxed">
                    Whale's advanced control logic includes a dedicated night mode 
                    that reduces fan speed to a whisper while maintaining a 
                    constant cabin temperature.
                  </p>
                </div>
              </div>
            </section>

            {/* UNDERSLUNG */}
            <section id="underslung" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Map className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  The Underslung Advantage
                </h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed max-w-3xl">
                <p>
                  By moving the 'wet' and 'gas' components outside the vehicle, you 
                  not only save space but also significantly reduce the risk of 
                  internal leaks and condensation. Whale's mounting kits are 
                  specifically designed for the rigors of the road, featuring 
                  corrosion-resistant materials and waterproof connectors.
                </p>
              </div>
            </section>

            {/* WHY WHALE */}
            <section id="why-whale" className="mb-24 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10">
                The Whale Advantage
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Fast Heat-Up", desc: "Whale's high-efficiency burners heat water and air significantly faster than competitive units." },
                  { title: "Lightweight", desc: "Advanced polymer construction reduces vehicle payload compared to heavy metal tanks." },
                  { title: "UK Engineering", desc: "Designed and manufactured in Northern Ireland with local technical support." },
                  { title: "Intelligent Control", desc: "Can be integrated into iNet X and other central control systems." },
                ].map((item) => (
                  <div key={item.title} className="p-6 border border-brand-border bg-brand-carbon/50">
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="w-5 h-5 text-brand-orange" />
                      <h3 className="font-display text-sm uppercase tracking-widest text-brand-white">{item.title}</h3>
                    </div>
                    <p className="font-sans text-brand-grey text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/guides/whale/expanse-water-heater-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Expanse Guide →</Link>
                <Link href="/guides/whale/expanse-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <WhaleSidebar items={TOC} currentPage="/brands/whale" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
