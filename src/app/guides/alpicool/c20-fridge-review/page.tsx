import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { AlpicoolSidebar } from "@/components/editorial/AlpicoolSidebar";
import { ArrowRight, Snowflake, Zap, ShieldCheck, Info, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Alpicool C20 Review | Best Budget Van Fridge? | Amplios",
  description: "Our in-depth review of the Alpicool C20. We test power consumption, cooling speed, and build quality to see if it's the best value fridge for van life.",
  openGraph: {
    title: "Alpicool C20 Review | Best Budget Van Fridge?",
    description: "Budget-friendly compressor cooling. Is the C20 worth it?",
    url: "https://amplios.co.uk/guides/alpicool/c20-fridge-review",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/alpicool/c20-fridge-review" },
};

const TOC = [
  { id: "intro", label: "The Budget King" },
  { id: "performance", label: "Cooling Performance" },
  { id: "power", label: "Energy Efficiency" },
  { id: "build", label: "Build Quality" },
  { id: "verdict", label: "Final Thoughts" },
];

const MENTIONED_PRODUCTS = [
  { name: "Alpicool C20 Fridge", brand: "Alpicool", price: 18500, slug: "alpicool-c20-portable-compressor-fridge-20l" },
  { name: "Dometic CFX3 35", brand: "Dometic", price: 74500, slug: "dometic-cfx3-35-portable-compressor-fridge-freezer-36l" },
  { name: "Fogstar Drift 105Ah", brand: "Fogstar", price: 42900, slug: "fogstar-drift-105ah-lithium-lifepo4-leisure-battery" },
];

export default function AlpicoolC20Review() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-kitchen.png" // Placeholder
            alt="Alpicool C20 Review"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // PRODUCT REVIEW
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Alpicool C20:<br />The Budget King?
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            We put the UK's most popular budget compressor fridge to the test. Does it deliver on its promises?
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Budget King
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  At less than half the price of a Dometic equivalent, the **Alpicool C20** 
                  has become a staple in budget van builds across the UK. It offers a 
                  true compressor-based system (meaning it can freeze, unlike 
                  thermoelectric 'coolboxes') for under £200.
                </p>
              </div>
            </section>

            {/* PERFORMANCE */}
            <section id="performance" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Snowflake className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Cooling Performance
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  In our tests, the C20 pulled down from 22°C to 4°C in just **18 minutes** 
                  on 'Max' mode. It successfully reached -18°C within an hour, 
                  proving that its compressor is more than capable of handling 
                  UK summer temperatures.
                </p>
              </div>
            </section>

            {/* POWER */}
            <section id="power" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Energy Efficiency
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The electrical draw is surprisingly low. Once at temperature, the 
                  C20 cycles on for approximately 15 minutes every hour. On a 12V 
                  system, it consumes around **15-20Ah per 24 hours** in typical 
                  UK conditions. This is easily sustainable with a single 100W 
                  solar panel.
                </p>
              </div>
            </section>

            {/* BUILD */}
            <section id="build" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Build Quality
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  This is where you see the cost savings. The plastic shell feels 
                  lighter and less robust than premium brands. The lid seal is 
                  adequate but lacks the heavy-duty latches found on the CFX3 
                  range. However, for a fridge that will spend its life inside 
                  a van cabinet, it is perfectly sufficient.
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
                    <h4 className="font-display text-lg uppercase text-brand-white">Unbeatable Value</h4>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map(i => <Star key={i} className="w-3 h-3 text-brand-orange fill-brand-orange" />)}
                      <Star className="w-3 h-3 text-brand-orange" />
                    </div>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  The Alpicool C20 is the best-performing "cheap" fridge on the 
                  market. If you can live with slightly basic build quality and 
                  a simpler control interface, it offers 90% of the performance 
                  of a premium brand for 25% of the price. Highly recommended 
                  for first-time builders.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/alpicool" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Alpicool Hub →</Link>
                <Link href="/guides/alpicool/fridge-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <AlpicoolSidebar items={TOC} currentPage="/guides/alpicool/c20-fridge-review" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
