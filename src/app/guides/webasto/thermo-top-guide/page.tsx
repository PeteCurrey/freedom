import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { WebastoSidebar } from "@/components/editorial/WebastoSidebar";
import { ArrowRight, Droplets, Zap, ShieldCheck, Info, Thermometer, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Webasto Thermo Top Guide | Diesel Water Heating | Amplios",
  description: "Hot water on demand from your van's diesel tank. The complete guide to Webasto Thermo Top Evo systems and engine pre-heating.",
  openGraph: {
    title: "Webasto Thermo Top Guide | Diesel Water Heating",
    description: "Domestic-grade hot water and engine protection for serious explorers.",
    url: "https://amplios.co.uk/guides/webasto/thermo-top-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/webasto/thermo-top-guide" },
};

const TOC = [
  { id: "intro", label: "Hydronic Heating" },
  { id: "hotwater", label: "Hot Water Performance" },
  { id: "engine", label: "Engine Pre-Heating" },
  { id: "installation", label: "System Complexity" },
  { id: "verdict", label: "Is it right for your van?" },
];

const MENTIONED_PRODUCTS = [
  { name: "Webasto Thermo Top Evo", brand: "Webasto", price: 139500, slug: "webasto-thermo-top-evo-diesel-water-heater" },
  { name: "Webasto SmartControl", brand: "Webasto", price: 12500, slug: "webasto-smartcontrol-digital-timer" },
  { name: "Truma Combi 4E Kit", brand: "Truma", price: 184500, slug: "truma-combi-4e-lpg-electric-air-water-heater" },
];

export default function WebastoThermoTopGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/tech-water.png" // Placeholder
            alt="Webasto Thermo Top System"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // PRODUCT GUIDE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Thermo Top:<br />Hydronic Excellence
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            Diesel-powered hot water and engine pre-heating. The choice for expedition vehicles and extreme cold environments.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Hydronic (Water) Heating
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  While the Air Top range heats the air inside your van, the **Thermo Top Evo** 
                  heats liquid (a water/glycol mixture). This heated liquid is then pumped 
                  through a heat exchanger to provide domestic hot water or through a 
                  vehicle's engine block to ensure reliable starting in sub-zero temperatures.
                </p>
                <p>
                  Hydronic systems are more complex than air heaters but offer a level 
                  of comfort and utility that is hard to match, especially in larger 
                  builds or expedition trucks.
                </p>
              </div>
            </section>

            {/* HOT WATER */}
            <section id="hotwater" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Droplets className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Hot Water Performance
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  When coupled with a plate heat exchanger or a calorifier (hot water tank), 
                  the Thermo Top Evo can provide a continuous supply of hot water for 
                  showers and sinks. 
                </p>
                <div className="bg-brand-carbon p-6 border border-brand-border mt-6">
                  <h4 className="font-display text-xs text-brand-white uppercase mb-2">Technical Insight</h4>
                  <p className="text-xs">A Thermo Top Evo 5 can heat 10L of water from 15°C to 60°C in approximately 12-15 minutes, depending on the system design.</p>
                </div>
              </div>
            </section>

            {/* ENGINE */}
            <section id="engine" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Engine Pre-Heating
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Cold starts are the enemy of engine longevity. By plumbing the Thermo Top 
                  into your van's coolant circuit, you can warm the engine block to a 
                  comfortable operating temperature before you even turn the key. This 
                  reduces wear, lowers emissions, and ensures your heater in the cab 
                  is blowing warm air immediately.
                </p>
              </div>
            </section>

            {/* INSTALLATION */}
            <section id="installation" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  System Complexity
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Installing a hydronic system is significantly more challenging than 
                  an air heater. It involves plumbing into the vehicle's coolant 
                  lines, installing a secondary water pump, and managing the thermal 
                  expansion of the liquid. We strongly recommend professional installation 
                  or following a detailed technical schematic.
                </p>
              </div>
            </section>

            {/* VERDICT */}
            <section id="verdict" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Verdict
              </h2>
              <div className="p-8 bg-brand-carbon border border-brand-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-orange text-brand-obsidian font-display text-2xl font-black w-12 h-12 flex items-center justify-center rounded-sm">
                    8.5
                  </div>
                  <div>
                    <h4 className="font-display text-lg uppercase text-brand-white">Professional Grade</h4>
                    <p className="font-mono text-[10px] text-brand-grey uppercase">Expedition Standard</p>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  The Thermo Top is the ultimate choice for expedition builders and those who 
                  want a "no-compromise" hot water solution. For most weekend vans, a 
                  Truma Combi or a simple Air Top will be more cost-effective and 
                  easier to maintain.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/webasto" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Webasto Hub →</Link>
                <Link href="/guides/webasto/air-top-evo-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Air Top Guide →</Link>
              </div>
            </div>

          </div>

          <WebastoSidebar items={TOC} currentPage="/guides/webasto/thermo-top-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
