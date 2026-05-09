import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { TrumaSidebar } from "@/components/editorial/TrumaSidebar";
import { ArrowRight, CheckCircle, XCircle, Zap, Flame, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Truma vs Webasto | Best Van Heating UK | Amplios",
  description: "LPG vs Diesel heating. Our honest comparison of Truma Combi and Webasto Air Top Evo systems for UK campervan builds.",
  openGraph: {
    title: "Truma vs Webasto | Best Van Heating UK",
    description: "Honest head-to-head. Noise, price, and reliability compared.",
    url: "https://amplios.co.uk/guides/compare/truma-vs-webasto",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/compare/truma-vs-webasto" },
};

const TOC = [
  { id: "intro", label: "The Big Debate" },
  { id: "fuel", label: "LPG vs Diesel" },
  { id: "noise", label: "Noise & Comfort" },
  { id: "install", label: "Installation" },
  { id: "reliability", label: "Reliability" },
  { id: "verdict", label: "Final Recommendation" },
];

const MENTIONED_PRODUCTS = [
  { name: "Truma Combi 4E Kit", brand: "Truma", price: 184500, slug: "truma-combi-4e-lpg-electric-air-water-heater" },
  { name: "Autoterm Air 2D Kit", brand: "Autoterm", price: 52000, slug: "autoterm-air-2d-diesel-heater-kit" },
  { name: "Truma VarioHeat Eco", brand: "Truma", price: 99500, slug: "truma-varioheat-eco-compact-gas-heater" },
];

export default function TrumaVsWebastoCompare() {
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
            Truma vs Webasto
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            LPG vs Diesel. Which premium heating system should you choose for your UK van conversion?
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The most searched comparison in van life
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  If you're planning a professional-grade van build in the UK, you'll eventually arrive at 
                  the heating debate: **LPG (Truma)** or **Diesel (Webasto/Eberspächer)**.
                </p>
                <p>
                  Both are German-engineered, premium solutions with massive UK dealer support. Both will 
                  keep you warm in a Scottish winter. But the way they operate and the "infrastructure" 
                  they require in your van are fundamentally different.
                </p>
              </div>
            </section>

            {/* FUEL */}
            <section id="fuel" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Fuel Source: LPG vs Diesel
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-display text-sm text-brand-white uppercase mb-3">Truma (LPG)</h3>
                  <ul className="text-xs space-y-2 text-brand-grey list-disc pl-4">
                    <li>Requires a dedicated gas locker and 8mm copper pipework.</li>
                    <li>Operates on Propane/Butane.</li>
                    <li>Extremely clean burning (low soot/carbon buildup).</li>
                    <li>Often includes 230V electric backup (in "E" models).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-sm text-brand-white uppercase mb-3">Webasto (Diesel)</h3>
                  <ul className="text-xs space-y-2 text-brand-grey list-disc pl-4">
                    <li>Taps directly into the van's main fuel tank.</li>
                    <li>No extra fuel source required (single-fuel vehicle).</li>
                    <li>Can soot up if run on low power for extended periods.</li>
                    <li>Higher energy density fuel.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* NOISE */}
            <section id="noise" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Noise & Comfort
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  This is where **Truma** typically wins. Because LPG burns so cleanly and the internal 
                  heat exchangers are so large, Truma heaters are notoriously quiet. The "click" of the 
                  gas valve is barely audible, and the fan is balanced for near-silent operation.
                </p>
                <p>
                  **Webasto** heaters have the characteristic "jet engine" sound during startup and a 
                  consistent "tick-tick-tick" from the diesel dosing pump. While the premium Webasto 
                  pumps are much quieter than cheap alternatives, you'll still know when it's running.
                </p>
              </div>
            </section>

            {/* INSTALLATION */}
            <section id="install" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Installation Complexity
              </h2>
              <div className="p-6 bg-brand-carbon border border-brand-border mb-8">
                <p className="text-sm text-brand-grey leading-relaxed">
                  **Truma Combi:** Larger unit, requires more "internal" real estate. Requires a balanced 
                  side-flue and gas pipework.
                </p>
                <p className="text-sm text-brand-grey leading-relaxed mt-4">
                  **Webasto Air Top:** Smaller, can often be mounted under the chassis (with a protection 
                  box) to save interior space. Requires tapping into the vehicle fuel line or a fuel 
                  standpipe in the tank.
                </p>
              </div>
            </section>

            {/* RELIABILITY */}
            <section id="reliability" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Long-Term Reliability
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Truma systems are historically more reliable for "casual" users because LPG doesn't degrade 
                  or soot up the burner in the same way diesel does. Webasto systems are incredibly robust 
                  but require a "burn-off" (running on full power for 30 mins) every few weeks to keep 
                  the combustion chamber clear.
                </p>
              </div>
            </section>

            {/* VERDICT */}
            <section id="verdict" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Verdict
              </h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-8 border border-brand-border bg-brand-carbon">
                  <h4 className="font-display text-base text-brand-white uppercase mb-4">Choose Truma if...</h4>
                  <ul className="text-xs space-y-3 text-brand-grey list-inside">
                    <li>• You want integrated hot water (Combi range)</li>
                    <li>• You are a light sleeper and value silence</li>
                    <li>• You are already installing gas for a hob/oven</li>
                    <li>• You want a 230V electric heating option</li>
                  </ul>
                </div>
                <div className="p-8 border border-brand-border bg-brand-carbon">
                  <h4 className="font-display text-base text-brand-white uppercase mb-4">Choose Webasto if...</h4>
                  <ul className="text-xs space-y-3 text-brand-grey list-inside">
                    <li>• You want to avoid the "gas chase" across Europe</li>
                    <li>• You have limited internal space</li>
                    <li>• You want an all-season off-grid machine</li>
                    <li>• You are building an all-diesel "gas free" van</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/truma" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma Brand Hub →</Link>
                <Link href="/guides/truma/combi-4e-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Combi 4E Guide →</Link>
                <Link href="/guides/truma/combi-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <TrumaSidebar items={TOC} currentPage="/guides/compare/truma-vs-webasto" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
