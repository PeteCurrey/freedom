import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { FogstarSidebar } from "@/components/editorial/FogstarSidebar";
import { ArrowRight, CheckCircle, XCircle, Zap, ShieldCheck, Banknote, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Fogstar vs Victron Lithium | Which is Best for Your Van? | Amplios",
  description: "Dumb batteries vs Smart ecosystems. We compare Fogstar Drift to Victron Smart Lithium to find the right balance of price and performance for your build.",
  openGraph: {
    title: "Fogstar vs Victron Lithium | Which is Best for Your Van?",
    description: "The ultimate lithium showdown. Price vs Integration.",
    url: "https://amplios.co.uk/guides/compare/fogstar-vs-victron-lithium",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/compare/fogstar-vs-victron-lithium" },
};

const TOC = [
  { id: "intro", label: "The Lithium Showdown" },
  { id: "price", label: "Price vs Value" },
  { id: "integration", label: "System Integration" },
  { id: "heating", label: "Cold Weather Performance" },
  { id: "verdict", label: "Which should you buy?" },
];

const MENTIONED_PRODUCTS = [
  { name: "Fogstar Drift 280Ah", brand: "Fogstar", price: 79900, slug: "fogstar-drift-280ah-lithium-lifepo4-leisure-battery" },
  { name: "Victron Lithium Smart 200Ah", brand: "Victron Energy", price: 169500, slug: "victron-lifepo4-smart-battery-200ah" },
  { name: "Victron VE.Bus BMS-II", brand: "Victron Energy", price: 14500, slug: "victron-ve-bus-bms-ii" },
];

export default function FogstarVsVictronCompare() {
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
            Fogstar vs <span className="text-brand-orange">Victron</span>
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            The budget king vs the industry standard. Is the "blue box" worth 3x the price of a Fogstar Drift?
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Lithium Showdown
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  In the UK van conversion market, the battery debate usually boils down to 
                  two choices: **Fogstar Drift** or **Victron Smart Lithium**.
                </p>
                <p>
                  Fogstar represents the "Drop-In" approach—a battery that has its own 
                  brains and manages itself. Victron represents the "System" approach—where 
                  the batteries are part of a larger, coordinated electrical ecosystem.
                </p>
              </div>
            </section>

            {/* PRICE */}
            <section id="price" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Banknote className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Price vs Value
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-8 text-sm">
                <div className="p-6 bg-brand-carbon border border-brand-border">
                  <h3 className="font-display text-sm text-brand-white uppercase mb-3">Fogstar Drift 280Ah</h3>
                  <p className="text-brand-orange text-xl font-bold mb-2">~£799</p>
                  <p className="text-brand-grey leading-relaxed">Includes internal BMS, Bluetooth app, and integrated heating. Incredible cost-per-Ah.</p>
                </div>
                <div className="p-6 bg-brand-carbon border border-brand-border">
                  <h3 className="font-display text-sm text-brand-white uppercase mb-3">Victron Smart 200Ah</h3>
                  <p className="text-brand-orange text-xl font-bold mb-2">~£1,695</p>
                  <p className="text-brand-grey leading-relaxed">Requires an external BMS (£150+). No internal heating. Premium price for system synergy.</p>
                </div>
              </div>
            </section>

            {/* INTEGRATION */}
            <section id="integration" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  System Integration
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  This is where **Victron** shines. Because the battery communicates via the 
                  VE.Bus BMS to the Cerbo GX, your entire system knows *exactly* what the 
                  battery is doing. The inverter can be told to shut down based on cell 
                  voltage, and the solar chargers can be synchronized perfectly.
                </p>
                <p>
                  **Fogstar** is a "closed" system. While it monitors itself perfectly, 
                  it doesn't "talk" to your Victron chargers. You rely on the Victron 
                  SmartShunt to tell you the state of charge, while the battery's 
                  internal BMS handles safety independently.
                </p>
              </div>
            </section>

            {/* HEATING */}
            <section id="heating" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Cold Weather Performance
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  In a UK winter, this is a major win for **Fogstar**. Every Drift battery has 
                  internal heater pads. If the battery is too cold to charge, it uses 
                  the incoming power to warm itself up first.
                </p>
                <p>
                  **Victron Smart Lithium** batteries do not have internal heaters. You must 
                  ensure they are installed in a heated area of the van or use external 
                  heat pads controlled by a Venus OS device.
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
                  <h4 className="font-display text-base text-brand-white uppercase mb-4">Choose Fogstar if...</h4>
                  <ul className="text-xs space-y-3 text-brand-grey list-inside">
                    <li>• You want the best value per Ah</li>
                    <li>• You need integrated heating for winter</li>
                    <li>• You are building a DIY system on a budget</li>
                    <li>• You want a simple "Drop-In" solution</li>
                  </ul>
                </div>
                <div className="p-8 border border-brand-border bg-brand-carbon">
                  <h4 className="font-display text-base text-brand-white uppercase mb-4">Choose Victron if...</h4>
                  <ul className="text-xs space-y-3 text-brand-grey list-inside">
                    <li>• You are building a high-end expedition vehicle</li>
                    <li>• You want total "one-pane-of-glass" monitoring</li>
                    <li>• You value the 5-year global warranty</li>
                    <li>• Money is no object for system synergy</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/fogstar" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Fogstar Hub →</Link>
                <Link href="/brands/victron-energy" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Victron Energy Hub →</Link>
                <Link href="/guides/fogstar/drift-lithium-review" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Drift Review →</Link>
              </div>
            </div>

          </div>

          <FogstarSidebar items={TOC} currentPage="/guides/compare/fogstar-vs-victron-lithium" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
