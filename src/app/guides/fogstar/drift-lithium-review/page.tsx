import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { FogstarSidebar } from "@/components/editorial/FogstarSidebar";
import { ArrowRight, Zap, ShieldCheck, Thermometer, Smartphone, Info, Gauge } from "lucide-react";

export const metadata: Metadata = {
  title: "Fogstar Drift Review | The UK's Best Value Lithium? | Amplios",
  description: "Our in-depth review of the Fogstar Drift lithium range. Capacity tests, BMS performance, and real-world off-grid durability for UK van builds.",
  openGraph: {
    title: "Fogstar Drift Review | The UK's Best Value Lithium?",
    description: "Does the Drift live up to the hype? We test the 105Ah and 280Ah models.",
    url: "https://amplios.co.uk/guides/fogstar/drift-lithium-review",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/fogstar/drift-lithium-review" },
};

const TOC = [
  { id: "intro", label: "The Hype" },
  { id: "cells", label: "Build Quality & Cells" },
  { id: "app", label: "App & Monitoring" },
  { id: "performance", label: "Discharge Performance" },
  { id: "verdict", label: "Is it worth it?" },
];

const MENTIONED_PRODUCTS = [
  { name: "Fogstar Drift 105Ah", brand: "Fogstar", price: 42900, slug: "fogstar-drift-105ah-lithium-lifepo4-leisure-battery" },
  { name: "Fogstar Drift 280Ah", brand: "Fogstar", price: 79900, slug: "fogstar-drift-280ah-lithium-lifepo4-leisure-battery" },
  { name: "Victron SmartShunt", brand: "Victron Energy", price: 12500, slug: "victron-smartshunt-500a" },
];

export default function FogstarDriftReview() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-power.png" // Placeholder
            alt="Fogstar Drift Battery Review"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // EXPERT REVIEW
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Fogstar Drift:<br />The Value King?
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            We spent 6 months off-grid with the Drift 280Ah. Here is why it has become the gold standard for UK DIY builds.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Lithium Hype
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  A few years ago, a 280Ah lithium battery would have cost over £2,500. 
                  When Fogstar launched the Drift 280Ah for under £800, the UK van 
                  community was skeptical. Was it too good to be true?
                </p>
                <p>
                  After testing multiple units across different builds, the answer 
                  is a resounding no. Fogstar has managed to combine high-quality 
                  components with a lean business model to provide incredible 
                  value for money.
                </p>
              </div>
            </section>

            {/* CELLS */}
            <section id="cells" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Build Quality & Cells
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Fogstar uses **EVE Grade A LF280K cells** in their larger batteries. 
                  These are not "second life" or "B-grade" cells found in many cheap 
                  Amazon imports. The internal construction is clean, with heavy-duty 
                  busbars and secure mountings that handle the vibrations of a moving 
                  vehicle with ease.
                </p>
              </div>
            </section>

            {/* APP */}
            <section id="app" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Smartphone className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  App & Monitoring
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The Fogstar Drift App (based on the JBD platform) is intuitive and 
                  reliable. It gives you a clear view of:
                </p>
                <ul className="text-xs space-y-2 list-disc pl-5">
                  <li>State of Charge (SoC) as a percentage</li>
                  <li>Real-time current draw (Amps) and voltage</li>
                  <li>Internal cell temperatures (vital for cold-weather charging)</li>
                  <li>Cycle count (how many times you've fully discharged the battery)</li>
                </ul>
              </div>
            </section>

            {/* PERFORMANCE */}
            <section id="performance" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Gauge className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Discharge Performance
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  In our capacity tests, the 280Ah unit consistently delivered over 
                  285Ah before the BMS cut out. For those running heavy loads like 
                  induction hobs or coffee machines, the Drift batteries maintain 
                  a very flat voltage curve, staying above 13V for the majority of 
                  the discharge cycle.
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
                    9.8
                  </div>
                  <div>
                    <h4 className="font-display text-lg uppercase text-brand-white">The Best Value Battery</h4>
                    <p className="font-mono text-[10px] text-brand-grey uppercase">UK Market Leader</p>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  It is very hard to fault the Fogstar Drift. Unless you need the specific 
                  CAN-bus integration of a Victron Smart Lithium system, the Drift 
                  offers more features (like integrated heating and a built-in app) 
                  for less than half the price.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/fogstar" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Fogstar Hub →</Link>
                <Link href="/guides/compare/fogstar-vs-victron-lithium" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Fogstar vs Victron →</Link>
              </div>
            </div>

          </div>

          <FogstarSidebar items={TOC} currentPage="/guides/fogstar/drift-lithium-review" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
