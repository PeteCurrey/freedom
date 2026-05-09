import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { TrumaSidebar } from "@/components/editorial/TrumaSidebar";
import { ArrowRight, CheckCircle, XCircle, ShieldAlert, Banknote, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Truma vs Chinese Diesel Heater | Honest Comparison | Amplios",
  description: "£2,000 vs £150. Is a Truma Combi worth the extra money over a cheap Chinese diesel heater? We breakdown the real trade-offs for UK builders.",
  openGraph: {
    title: "Truma vs Chinese Diesel Heater | Honest Comparison",
    description: "The budget question every builder asks. Price vs Reliability vs Safety.",
    url: "https://amplios.co.uk/guides/compare/truma-vs-chinese-diesel-heater",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/compare/truma-vs-chinese-diesel-heater" },
};

const TOC = [
  { id: "intro", label: "The Price Gap" },
  { id: "safety", label: "Safety & Certification" },
  { id: "noise", label: "Noise & Refinement" },
  { id: "support", label: "Support & Parts" },
  { id: "verdict", label: "Who should buy what?" },
];

const MENTIONED_PRODUCTS = [
  { name: "Truma Combi 4E Kit", brand: "Truma", price: 184500, slug: "truma-combi-4e-lpg-electric-air-water-heater" },
  { name: "Truma VarioHeat Eco", brand: "Truma", price: 99500, slug: "truma-varioheat-eco-compact-gas-heater" },
  { name: "Autoterm Air 2D Kit", brand: "Autoterm", price: 52000, slug: "autoterm-air-2d-diesel-heater-kit" },
];

export default function TrumaVsChineseCompare() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[45vh] flex items-end pt-24 bg-brand-carbon border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // BUDGET VS PREMIUM
          </span>
          <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[1] mb-4">
            Truma vs <span className="text-brand-orange">Chinese Diesel</span>
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            The £2,000 question. Is it worth paying 10x more for a Truma system, or do the "eBay specials" actually do the job?
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* PRICE GAP */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Banknote className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  The undeniable price gap
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Let's be honest: a **Truma Combi 4E** kit costs around £1,800 - £2,000. A **Chinese Diesel Heater** 
                  (often branded as Vevor or Maxpeedingrods) costs between £100 and £180 on Amazon or eBay.
                </p>
                <p>
                  On paper, they both heat your van. They both blow warm air. But for a professional builder or a 
                  full-time van dweller, the differences go far beyond the initial purchase price.
                </p>
              </div>
            </section>

            {/* SAFETY */}
            <section id="safety" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Safety & Certification
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  This is the biggest differentiator. **Truma** units are heavily regulated, CE/UKCA marked, and 
                  designed with multiple redundant safety sensors (overheat, flame-out, gas leak detection). 
                  They are legal for use in caravans and motorhomes across Europe.
                </p>
                <p>
                  **Chinese Diesel Heaters** often lack genuine safety certifications. While many work 
                  perfectly for years, there have been documented cases of combustion chamber failure, 
                  leading to carbon monoxide entering the cabin. For this reason, many UK insurers will 
                  not cover a van with a non-certified heater.
                </p>
              </div>
            </section>

            {/* NOISE */}
            <section id="noise" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Noise & Refinement
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-brand-carbon border border-brand-border">
                  <h4 className="font-display text-xs text-brand-white uppercase mb-2">Truma Experience</h4>
                  <p className="text-xs text-brand-grey">Whisper quiet. You can hold a conversation at normal volume 
                  right next to the unit. The heat is consistent and the thermostat is accurate.</p>
                </div>
                <div className="p-6 bg-brand-carbon border border-brand-border">
                  <h4 className="font-display text-xs text-brand-white uppercase mb-2">Chinese Diesel Experience</h4>
                  <p className="text-xs text-brand-grey">Loud fan noise, high-pitched turbine whine on startup, and a 
                  notorious 'clacking' fuel pump. The thermostats are often wildly inaccurate, leading to 
                  a 'sweat or shiver' experience.</p>
                </div>
              </div>
            </section>

            {/* SUPPORT */}
            <section id="support" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                UK Support & Parts
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  If your Truma breaks in the middle of a trip, there are hundreds of approved service centers 
                  across the UK that stock parts. 
                </p>
                <p>
                  If your Chinese heater breaks, you're usually on your own. While spare parts are cheap on 
                  Amazon, you'll be doing the repair yourself, often in the dark and cold.
                </p>
              </div>
            </section>

            {/* VERDICT */}
            <section id="verdict" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Verdict
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  **Buy Truma if:** You are building a high-end van, you value safety and insurance peace of 
                  mind, and you want a system that will last for 10+ years.
                </p>
                <p>
                  **Buy a Chinese Diesel Heater if:** You are on a strict budget for a weekend van, you are 
                  mechanically savvy and comfortable doing your own maintenance, and you accept the 
                  potential insurance risks.
                </p>
                <div className="bg-brand-orange/5 border-l-4 border-brand-orange p-6 mt-8">
                  <p className="font-sans text-brand-grey text-sm italic">
                    <strong className="text-brand-white">Middle Ground:</strong> If you want diesel reliability 
                    without the Truma price tag, look at **Autoterm**. They are European-certified heaters 
                    that fall right in the middle (£500-£600).
                  </p>
                </div>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/truma" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma Brand Hub →</Link>
                <Link href="/guides/compare/truma-vs-webasto" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma vs Webasto →</Link>
                <Link href="/guides/truma/combi-4e-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Combi 4E Guide →</Link>
              </div>
            </div>

          </div>

          <TrumaSidebar items={TOC} currentPage="/guides/compare/truma-vs-chinese-diesel-heater" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
