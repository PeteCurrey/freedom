import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { DometicSidebar } from "@/components/editorial/DometicSidebar";
import { ArrowRight, Wind, Snowflake, Zap, ShieldCheck, Info, Thermometer } from "lucide-react";

export const metadata: Metadata = {
  title: "Dometic FreshJet Guide | Roof Air Conditioning | Amplios",
  description: "Stay cool off-grid or on hookup. The complete guide to Dometic FreshJet roof AC units for UK campervans and motorhomes.",
  openGraph: {
    title: "Dometic FreshJet Guide | Roof Air Conditioning",
    description: "Climate control for the most demanding environments. Power draw, sizing, and installation.",
    url: "https://amplios.co.uk/guides/dometic/freshjet-ac-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/dometic/freshjet-ac-guide" },
};

const TOC = [
  { id: "intro", label: "Mobile Climate Control" },
  { id: "models", label: "FreshJet Range" },
  { id: "power", label: "Power Requirements" },
  { id: "heating", label: "Heating Function" },
  { id: "verdict", label: "Is AC right for you?" },
];

const MENTIONED_PRODUCTS = [
  { name: "Dometic FreshJet 2200", brand: "Dometic", price: 199500, slug: "dometic-freshjet-2200-roof-air-conditioner" },
  { name: "MultiPlus-II 12/3000", brand: "Victron Energy", price: 114500, slug: "victron-multiplus-ii-12-3000-120-32" },
  { name: "Lithium 200Ah Battery", brand: "Victron Energy", price: 169500, slug: "victron-lifepo4-smart-battery-200ah" },
];

export default function DometicFreshJetGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-climate.png" // Placeholder
            alt="Dometic FreshJet AC unit"
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
            Dometic FreshJet:<br />Climate Control
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            Superior cooling and heating in one compact roof-mounted unit. The ultimate luxury for European touring.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Mobile Climate Control
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  As summers in Europe become increasingly intense, air conditioning is moving 
                  from a "luxury" to a "necessity" for many full-time van dwellers and families. 
                  The Dometic FreshJet range is designed specifically for leisure vehicles, 
                  offering a low-profile design that minimizes aerodynamic drag and noise.
                </p>
                <p>
                  Unlike domestic AC units, the FreshJet is built to withstand the constant 
                  vibrations and movement of a van, with specialized components that won't 
                  fatigue or leak over time.
                </p>
              </div>
            </section>

            {/* MODELS */}
            <section id="models" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Wind className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  FreshJet Range Comparison
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-8 text-sm">
                <div className="p-6 bg-brand-carbon border border-brand-border">
                  <h3 className="font-display text-sm text-brand-white uppercase mb-3">FreshJet 1700</h3>
                  <p className="text-brand-grey leading-relaxed">Best for vans up to 6m in length. 1700W cooling power. Compact enough to leave room for large solar arrays.</p>
                </div>
                <div className="p-6 bg-brand-carbon border border-brand-border">
                  <h3 className="font-display text-sm text-brand-white uppercase mb-3">FreshJet 2200</h3>
                  <p className="text-brand-grey leading-relaxed">The sweet spot for LWB Sprinters and Crafters. 2200W cooling and 1200W heating. Features a soft-start for easier shore power compatibility.</p>
                </div>
              </div>
            </section>

            {/* POWER */}
            <section id="power" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Powering AC Off-Grid
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Running air conditioning off-grid is the "final boss" of van electrical systems. 
                  A FreshJet 2200 typically draws around 950W of AC power while the compressor 
                  is running.
                </p>
                <div className="bg-brand-orange/5 border-l-4 border-brand-orange p-6 mt-6">
                  <h4 className="font-display text-xs text-brand-white uppercase mb-2">Technical Requirement</h4>
                  <p className="text-xs">To run a FreshJet 2200 off your batteries, you will need a minimum of a **3kVA Inverter** (e.g., Victron MultiPlus-II) and at least **400Ah of Lithium** capacity to get meaningful runtime.</p>
                </div>
              </div>
            </section>

            {/* HEATING */}
            <section id="heating" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Thermometer className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  The Heating Function
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Most FreshJet models include a heat pump or heating element. While this 
                  won't replace a dedicated Truma or Webasto heater for deep winter, it is 
                  perfect for taking the chill off on spring mornings or as a backup if 
                  you run out of gas/diesel.
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
                    <h4 className="font-display text-lg uppercase text-brand-white">Premium Choice</h4>
                    <p className="font-mono text-[10px] text-brand-grey uppercase">Ultimate Comfort</p>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  If you plan to tour Southern Europe during the peak of summer, a Dometic FreshJet 
                  is a game-changer for sleep quality and general comfort. However, ensure 
                  your electrical system is built to handle the massive load before committing.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/dometic" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Dometic Hub →</Link>
                <Link href="/brands/victron-energy" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Victron Energy Hub →</Link>
              </div>
            </div>

          </div>

          <DometicSidebar items={TOC} currentPage="/guides/dometic/freshjet-ac-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
