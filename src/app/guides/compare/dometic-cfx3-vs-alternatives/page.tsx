import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { DometicSidebar } from "@/components/editorial/DometicSidebar";
import { ArrowRight, CheckCircle, XCircle, Zap, Snowflake, Banknote, Info, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Dometic CFX3 vs Alternatives | Best Van Fridge 2024 | Amplios",
  description: "Dometic CFX3 vs Alpicool vs Thetford vs Vitrifrigo. Which fridge is best for your van build? Price, power draw, and reliability compared.",
  openGraph: {
    title: "Dometic CFX3 vs Alternatives | Best Van Fridge 2024",
    description: "Honest head-to-head comparison of the top van fridges on the market.",
    url: "https://amplios.co.uk/guides/compare/dometic-cfx3-vs-alternatives",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/compare/dometic-cfx3-vs-alternatives" },
};

const TOC = [
  { id: "intro", label: "The Fridge Landscape" },
  { id: "premium", label: "Premium Alternatives" },
  { id: "budget", label: "Budget Alternatives" },
  { id: "performance", label: "Head-to-Head" },
  { id: "verdict", label: "Our Final Pick" },
];

const MENTIONED_PRODUCTS = [
  { name: "Dometic CFX3 55IM", brand: "Dometic", price: 104500, slug: "dometic-cfx3-55im-portable-fridge-freezer-ice-maker" },
  { name: "Thetford T2090", brand: "Thetford", price: 89500, slug: "thetford-t2090-compressor-fridge" },
  { name: "Autoterm Air 2D Kit", brand: "Autoterm", price: 52000, slug: "autoterm-air-2d-diesel-heater-kit" },
];

export default function CFX3VsAlternativesCompare() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[45vh] flex items-end pt-24 bg-brand-carbon border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // HEAD-TO-HEAD COMPARISON
          </span>
          <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[1] mb-4">
            CFX3 vs <span className="text-brand-orange">Alternatives</span>
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            Dometic vs Alpicool vs Vitrifrigo. Is the world's most popular fridge actually the best for your build?
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Fridge Landscape
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Choosing a fridge for your van build is a decision that impacts your 
                  electrical design, your cabinetry layout, and your daily comfort. 
                  The **Dometic CFX3** is the market leader, but it's far from the only option.
                </p>
                <p>
                  We've broken down the alternatives into **Premium Competitors** (Vitrifrigo, Thetford) 
                  and **Budget Disruptors** (Alpicool, Iceco) to see where the real value lies.
                </p>
              </div>
            </section>

            {/* PREMIUM */}
            <section id="premium" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Premium Alternatives
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-8 text-sm">
                <div>
                  <h3 className="font-display text-sm text-brand-white uppercase mb-3">Vitrifrigo (The Specialist)</h3>
                  <p className="text-brand-grey leading-relaxed">Italian-designed fridges often used in luxury yachts. 
                  Renowned for their slim-line designs and ultra-quiet compressors. Often more expensive than Dometic but 
                  offer a more 'built-in' architectural look.</p>
                </div>
                <div>
                  <h3 className="font-display text-sm text-brand-white uppercase mb-3">Thetford (The Standard)</h3>
                  <p className="text-brand-grey leading-relaxed">The T2000 series fridges are standard in many professional 
                  UK motorhomes. They offer a more traditional upright 'house' fridge experience compared to the 
                  chest-style CFX3.</p>
                </div>
              </div>
            </section>

            {/* BUDGET */}
            <section id="budget" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Banknote className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Budget Alternatives
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The **Alpicool** range has taken the DIY market by storm, offering compressor cooling for 
                  less than £250. While they cool effectively, the trade-offs are in build quality, noise, 
                  and long-term power efficiency.
                </p>
                <div className="bg-brand-carbon p-6 border border-brand-border">
                  <h4 className="font-display text-xs text-brand-white uppercase mb-2">The Hidden Cost</h4>
                  <p className="text-xs">Budget fridges often draw 30-50% more power over 24 hours than a Dometic 
                  due to poorer insulation. You might save £500 on the fridge, but you'll need to spend an extra 
                  £400 on solar and batteries to compensate.</p>
                </div>
              </div>
            </section>

            {/* PERFORMANCE */}
            <section id="performance" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Snowflake className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Head-to-Head: Dometic vs The Rest
                </h2>
              </div>
              <div className="bg-brand-carbon border border-brand-border overflow-hidden mb-8">
                <table className="w-full text-left font-sans text-sm">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-obsidian">
                      <th className="p-4 font-display uppercase tracking-widest text-brand-orange text-[10px]">Feature</th>
                      <th className="p-4 font-display uppercase tracking-widest text-brand-white text-[10px]">Dometic CFX3</th>
                      <th className="p-4 font-display uppercase tracking-widest text-brand-white text-[10px]">Alpicool C50</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-brand-grey">
                    <tr>
                      <td className="p-4 font-medium text-brand-white">Power Draw (24h)</td>
                      <td className="p-4">~22-26 Ah</td>
                      <td className="p-4">~38-45 Ah</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-brand-white">Warranty</td>
                      <td className="p-4">3-5 Years (Global)</td>
                      <td className="p-4">1 Year (Return to base)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-brand-white">Compressor</td>
                      <td className="p-4">Dometic VMSO3</td>
                      <td className="p-4">Generic Chinese</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* VERDICT */}
            <section id="verdict" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Our Final Pick
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  **For serious builds:** The **Dometic CFX3** remains the winner. The efficiency 
                  gains alone justify the price over a 5-year ownership period.
                </p>
                <p>
                  **For weekend warriors:** An **Alpicool** is a perfectly valid choice if you 
                  primarily use campsites with hookup or have a massive solar array to spare.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/dometic" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Dometic Hub →</Link>
                <Link href="/guides/dometic/cfx3-review" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">CFX3 Detailed Review →</Link>
              </div>
            </div>

          </div>

          <DometicSidebar items={TOC} currentPage="/guides/compare/dometic-cfx3-vs-alternatives" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
