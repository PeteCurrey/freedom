import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhaleSidebar } from "@/components/editorial/WhaleSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Wind, Zap, ShieldCheck, Info, Thermometer, Gauge } from "lucide-react";

export const metadata: Metadata = {
  title: "Whale Heat Air Guide | Underslung Space Heating | Amplios",
  description: "Technical guide to the Whale Heat Air G/E system. Save internal space with this powerful underslung gas and electric air heater. UK specs & review.",
  openGraph: {
    title: "Whale Heat Air Guide | Underslung Space Heating",
    description: "Maximum internal space, maximum comfort. The underslung air heating specialist.",
    url: "https://amplios.co.uk/guides/whale/heat-air-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/whale/heat-air-guide" },
};

const TOC = [
  { id: "intro", label: "The Heat Air Advantage" },
  { id: "modes", label: "Gas & Electric Modes" },
  { id: "mounting", label: "Underslung Mounting" },
  { id: "noise", label: "Silent Night Mode" },
  { id: "verdict", label: "Final Assessment" },
];

const MENTIONED_PRODUCTS = [
  { name: "Whale Heat Air G/E", brand: "Whale", price: 94500, slug: "whale-heat-air-underslung-gas-electric-heater" },
  { name: "Whale Expanse Water Heater", brand: "Whale", price: 89500, slug: "whale-expanse-underslung-gas-electric-water-heater" },
  { name: "Whale Digital Thermostat", brand: "Whale", price: 4500, slug: "whale-heat-air-digital-thermostat" },
];

export default function WhaleHeatAirGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-plumbing.png" // Placeholder
            alt="Whale Heat Air Heater"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // PRODUCT DEEP DIVE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Heat Air:<br />Underslung Warmth
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            Clear your cupboards. The Heat Air system moves your heating outside, providing powerful 2kW warmth without sacrificing an inch of internal storage.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Heat Air Advantage
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Traditionally, gas air heaters like the Propex HS2000 are mounted 
                  inside a cupboard. Whale's **Heat Air** range challenges this 
                  convention. By mounting the heater under the chassis, you regain 
                  valuable cupboard space and reduce internal noise.
                </p>
                <p>
                  Available in Gas-only or Gas & Electric (G/E) variants, it is 
                  fast becoming the preferred choice for professional coachbuilders 
                  working with the VW Transporter, Ford Transit, and Fiat Ducato.
                </p>
              </div>
            </section>

            {/* MODES */}
            <section id="modes" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Hybrid Energy Modes
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The Heat Air G/E is a dual-fuel powerhouse. It features a 2kW 
                  gas burner for rapid heating and a 1.5kW electric element for 
                  use when plugged into a 230V mains hookup.
                </p>
                <div className="bg-brand-carbon p-6 border-l-4 border-brand-orange">
                   <h4 className="font-display text-xs text-white uppercase mb-2 italic">Tech Tip: Boost Mode</h4>
                   <p className="text-xs">
                     On exceptionally cold mornings, you can run both the gas burner 
                     and the electric element simultaneously to reach your target 
                     temperature 40% faster than gas alone.
                   </p>
                </div>
              </div>
            </section>

            {/* MOUNTING */}
            <section id="mounting" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Gauge className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Chassis Mounting Logic
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The unit is housed in a robust, weather-sealed casing. It is 
                  secured to the vehicle chassis using model-specific brackets. 
                  Warm air is then ducted through the floor via high-efficiency 
                  insulated piping, ensuring minimal heat loss during transit from 
                  the exterior unit to the cabin.
                </p>
              </div>
            </section>

            {/* NOISE */}
            <section id="noise" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Wind className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Silent Night Mode
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Noise is often a complaint with diesel heaters. Whale has 
                  addressed this with a dedicated 'Night Mode'. When active, the 
                  system limits the fan RPM and gas delivery to provide a gentle, 
                  whisper-quiet background heat that maintains a constant 
                  temperature without the loud 'cycling' found in cheaper systems.
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
                    9.1
                  </div>
                  <div>
                    <h4 className="font-display text-lg uppercase text-brand-white">The Clean Choice</h4>
                    <p className="font-mono text-[10px] text-brand-grey uppercase">British Engineering</p>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  The Whale Heat Air is the perfect solution for van lifers who 
                  already have a gas installation and want to maximize their 
                  internal living space. It's quieter than diesel, requires less 
                  maintenance, and the hybrid electric mode is a huge benefit on 
                  campsites.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <div className="mt-20">
                <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
                <div className="flex flex-wrap gap-4">
                  <Link href="/brands/whale" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Whale Hub →</Link>
                  <Link href="/guides/whale/expanse-water-heater-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Expanse Water Guide →</Link>
                </div>
              </div>
            </div>

          </div>

          <WhaleSidebar items={TOC} currentPage="/guides/whale/heat-air-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
