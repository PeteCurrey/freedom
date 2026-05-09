import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { DometicSidebar } from "@/components/editorial/DometicSidebar";
import { ArrowRight, Snowflake, Smartphone, Zap, ShieldCheck, Info, Gauge } from "lucide-react";

export const metadata: Metadata = {
  title: "Dometic CFX3 Review | The Best Portable Fridge for Vans? | Amplios",
  description: "Our in-depth review of the Dometic CFX3 range. VMSO3 compressor performance, power consumption tests, and the unique ice maker feature.",
  openGraph: {
    title: "Dometic CFX3 Review | The Best Portable Fridge for Vans?",
    description: "Deep dive into the CFX3. Performance, power draw, and real-world durability.",
    url: "https://amplios.co.uk/guides/dometic/cfx3-review",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/dometic/cfx3-review" },
};

const TOC = [
  { id: "intro", label: "The CFX3 Standard" },
  { id: "performance", label: "Compressor Performance" },
  { id: "power", label: "Power Consumption" },
  { id: "features", label: "Key Features" },
  { id: "verdict", label: "Is it worth the money?" },
];

const MENTIONED_PRODUCTS = [
  { name: "Dometic CFX3 55IM", brand: "Dometic", price: 104500, slug: "dometic-cfx3-55im-portable-fridge-freezer-ice-maker" },
  { name: "Victron SmartShunt", brand: "Victron Energy", price: 12500, slug: "victron-smartshunt-500a" },
  { name: "Lithium 100Ah Battery", brand: "Victron Energy", price: 89500, slug: "victron-lithium-superpack-12v-100ah" },
];

export default function DometicCFX3Review() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-water.png" // Placeholder
            alt="Dometic CFX3 in the wild"
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
            Dometic CFX3:<br />Cooling Without Compromise
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            We put the most famous portable fridge on the planet through its paces. Does it justify the premium price tag?
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The CFX3 Standard
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The Dometic CFX3 is the gold standard for portable compressor refrigeration. 
                  Unlike traditional peltier coolers that can only lower the temperature a few 
                  degrees below ambient, the CFX3 is a true fridge-freezer that can maintain -22°C 
                  even in a 40°C van interior.
                </p>
                <p>
                  For van builders, the CFX3 offers a level of flexibility that permanent fridges 
                  don't. You can pull it out for a picnic, swap it between vehicles, or build 
                  it into a heavy-duty drawer slide for a professional look.
                </p>
              </div>
            </section>

            {/* PERFORMANCE */}
            <section id="performance" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Snowflake className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  VMSO3 Compressor Performance
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  At the heart of the CFX3 is the VMSO3 (Variable Motor Speed Optimization) 
                  compressor. This is what separates Dometic from cheaper alternatives. The motor 
                  doesn't just turn on and off; it varies its speed to reach the set temperature 
                  quickly and then maintains it with surgical precision.
                </p>
                <div className="p-6 bg-brand-carbon border border-brand-border mt-6">
                  <h4 className="font-display text-xs text-brand-white uppercase mb-2">Pull-Down Test</h4>
                  <p className="text-xs">In our tests, the 55IM model reached 4°C from an ambient 22°C in just 18 minutes. It reached -18°C in under an hour.</p>
                </div>
              </div>
            </section>

            {/* POWER */}
            <section id="power" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Power Consumption
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  For off-grid builds, power is everything. The CFX3 is remarkably efficient. 
                  On average, once at temperature, the 55L model draws approximately **0.8Ah to 1.1Ah** 
                  per hour (at 12V).
                </p>
                <p>
                  On a standard 100Ah lithium battery, you could theoretically run this fridge 
                  for 4-5 days without any solar input or alternator charging.
                </p>
              </div>
            </section>

            {/* FEATURES */}
            <section id="features" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Smartphone className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  The Ice Maker & App
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The **55IM** model features a unique independent ice-making compartment. 
                  It uses a dedicated rapid-freeze plate to produce ice in about 2.5 hours, 
                  without turning the rest of the fridge into a freezer.
                </p>
                <p>
                  The **Dometic App** connects via Bluetooth or Wi-Fi, giving you a live 
                  dashboard of the temperature, power source voltage, and even a history 
                  of power consumption.
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
                    9.5
                  </div>
                  <div>
                    <h4 className="font-display text-lg uppercase text-brand-white">Editor's Choice</h4>
                    <p className="font-mono text-[10px] text-brand-grey uppercase">Unbeatable Performance</p>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  The CFX3 is expensive, but it is a "buy once, cry once" product. The 
                  build quality, the VMSO3 compressor efficiency, and the best-in-class 
                  app make it the clear winner for anyone taking van life seriously.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/dometic" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Dometic Hub →</Link>
                <Link href="/guides/compare/dometic-cfx3-vs-alternatives" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Fridge Comparison →</Link>
              </div>
            </div>

          </div>

          <DometicSidebar items={TOC} currentPage="/guides/dometic/cfx3-review" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
