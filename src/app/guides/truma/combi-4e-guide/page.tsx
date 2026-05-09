import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { TrumaSidebar } from "@/components/editorial/TrumaSidebar";
import { ArrowRight, Flame, Droplets, Zap, ShieldCheck, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Truma Combi 4E & 6E Guide | UK Van Heating & Hot Water | Amplios",
  description: "The definitive guide to the Truma Combi system. Combi 4E vs 6E, gas vs electric modes, and how it works in a UK campervan build.",
  openGraph: {
    title: "Truma Combi 4E & 6E Guide | UK Van Heating & Hot Water",
    description: "Everything you need to know about the motorhome heating standard.",
    url: "https://amplios.co.uk/guides/truma/combi-4e-guide",
    images: [{ url: "/images/truma/combi-hero.png" }],
  },
  alternates: { canonical: "https://amplios.co.uk/guides/truma/combi-4e-guide" },
};

const TOC = [
  { id: "intro", label: "What is the Truma Combi?" },
  { id: "modes", label: "Gas, Electric & Mixed Modes" },
  { id: "models", label: "Combi 4E vs 6E" },
  { id: "water", label: "Hot Water System" },
  { id: "controls", label: "CP Plus vs iNet X" },
  { id: "sizing", label: "Sizing for your van" },
];

const MENTIONED_PRODUCTS = [
  { name: "Truma Combi 4E Kit", brand: "Truma", price: 184500, slug: "truma-combi-4e-lpg-electric-air-water-heater" },
  { name: "Truma Combi 6E Kit", brand: "Truma", price: 204500, slug: "truma-combi-6e-lpg-electric-air-water-heater" },
  { name: "Truma iNet X Panel", brand: "Truma", price: 24500, slug: "truma-inet-x-central-control-panel" },
];

export default function TrumaCombiGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[55vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/truma/combi-hero.png"
            alt="Truma Combi 4E high-tech heating unit"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // PRODUCT GUIDE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Truma Combi 4E & 6E:<br />The Definitive Guide
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            Heating and hot water in one compact unit. Why it remains the gold standard for UK professional builds.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                What is the Truma Combi?
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The Truma Combi is a dual-function appliance that provides both blown-air space heating and a 10-litre 
                  hot water reservoir. It is designed to be installed internally, usually under a bed or inside a 
                  bench seat, and uses a balanced flue system that vents through the side of the vehicle.
                </p>
                <p>
                  For UK van builders, the "E" variants (4E and 6E) are the most popular because they include 
                  integrated 230V electric heating elements. This allows you to heat your van and water using gas 
                  while off-grid, or using shore power when plugged in at a campsite — saving your LPG for when 
                  you really need it.
                </p>
              </div>
            </section>

            {/* MODES */}
            <section id="modes" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Gas, Electric & Mixed Modes
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { mode: "Gas Mode", desc: "Uses LPG (Propane/Butane). Fastest heating time and works anywhere." },
                  { mode: "Electric Mode", desc: "Uses 230V shore power. Silent operation and saves LPG fuel." },
                  { mode: "Mixed Mode", desc: "Combines both gas and electric for maximum heating boost in winter." },
                ].map((m) => (
                  <div key={m.mode} className="p-6 bg-brand-carbon border border-brand-border">
                    <h3 className="font-display text-sm text-brand-white uppercase mb-2">{m.mode}</h3>
                    <p className="font-sans text-brand-grey text-xs leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* MODELS */}
            <section id="models" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Combi 4E vs 6E
              </h2>
              <div className="bg-brand-carbon border border-brand-border overflow-hidden mb-8">
                <table className="w-full text-left font-sans text-sm">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-obsidian">
                      <th className="p-4 font-display uppercase tracking-widest text-brand-orange text-[10px]">Feature</th>
                      <th className="p-4 font-display uppercase tracking-widest text-brand-white text-[10px]">Combi 4E</th>
                      <th className="p-4 font-display uppercase tracking-widest text-brand-white text-[10px]">Combi 6E</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-brand-grey">
                    <tr>
                      <td className="p-4 font-medium text-brand-white">Heat Output (Gas)</td>
                      <td className="p-4">2000W / 4000W</td>
                      <td className="p-4">2000W / 4000W / 6000W</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-brand-white">Heat Output (Electric)</td>
                      <td className="p-4">900W / 1800W</td>
                      <td className="p-4">900W / 1800W</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-brand-white">Gas Consumption</td>
                      <td className="p-4">160 - 320 g/h</td>
                      <td className="p-4">160 - 480 g/h</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-brand-white">Water Capacity</td>
                      <td className="p-4">10 Litres</td>
                      <td className="p-4">10 Litres</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-brand-orange/5 border-l-4 border-brand-orange">
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  <strong className="text-brand-white italic">Amplios Verdict:</strong> For almost all MWB and LWB 
                  conversions (Sprinter, Crafter, Transit), the <strong className="text-brand-white">Combi 4E</strong> is 
                  perfectly adequate. The 6E is only necessary for extra-large expedition trucks or poorly insulated 
                  vehicles intended for deep winter use in Northern Scandinavia or the Alps.
                </p>
              </div>
            </section>

            {/* WATER */}
            <section id="water" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Droplets className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Hot Water System
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The integrated 10-litre water tank is made of high-quality stainless steel. It can heat water 
                  from 15°C to 60°C in approximately 20 minutes (using gas). One of the best features of the 
                  Combi is that it can heat the cabin without heating the water, or heat the water without 
                  heating the cabin — perfect for summer showers.
                </p>
                <div className="bg-brand-carbon p-6 border border-brand-border mt-6">
                  <h4 className="font-display text-xs uppercase text-brand-white mb-2 flex items-center gap-2">
                    <Info className="w-3 h-3 text-brand-orange" />
                    FrostControl Safety Valve
                  </h4>
                  <p className="text-xs">
                    Every Truma Combi includes a FrostControl valve. This mechanical safety valve automatically 
                    opens and drains the water tank if the ambient temperature drops below 3°C, preventing 
                    ice from damaging the internal tank.
                  </p>
                </div>
              </div>
            </section>

            {/* CONTROLS */}
            <section id="controls" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                CP Plus vs iNet X
              </h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-sm text-brand-white uppercase mb-3">CP Plus (Standard)</h3>
                  <p className="font-sans text-brand-grey text-xs leading-relaxed mb-4">
                    The classic digital control panel with a rotary push-button. It allows for precise temperature 
                    setting, timer programming, and fan speed control. Reliable and intuitive.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-sm text-brand-white uppercase mb-3">iNet X (Modern)</h3>
                  <p className="font-sans text-brand-grey text-xs leading-relaxed mb-4">
                    A full colour touchscreen that acts as a central hub. It offers app connectivity, 
                    over-the-air updates, and much more detailed diagnostic information if the system 
                    encounters a fault.
                  </p>
                </div>
              </div>
            </section>

            {/* SIZING */}
            <section id="sizing" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Is it right for your van?
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  If you want a "one-stop" solution for both heating and hot water, and you have the budget 
                  for a premium installation, the Truma Combi is the winner. However, it does require a 
                  dedicated LPG installation (gas locker, copper pipework, Gas Safe sign-off).
                </p>
                <p>
                  If you are building a smaller "weekender" van or want to avoid gas entirely, you might 
                  consider the **Truma VarioHeat** (heating only) or a diesel-powered alternative like the 
                  **Webasto Air Top**.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/truma" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma Brand Hub →</Link>
                <Link href="/guides/truma/combi-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
                <Link href="/guides/compare/truma-vs-webasto" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma vs Webasto →</Link>
              </div>
            </div>

          </div>

          <TrumaSidebar items={TOC} currentPage="/guides/truma/combi-4e-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
