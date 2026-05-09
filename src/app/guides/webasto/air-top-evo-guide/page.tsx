import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WebastoSidebar } from "@/components/editorial/WebastoSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Flame, Zap, Wind, Gauge, Info, CheckCircle, Thermometer, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Webasto Air Top 2000 STC Guide | Technical Specs & Review | Amplios",
  description: "The definitive guide to the Webasto Air Top 2000 STC diesel heater. Power draw, fuel consumption, and performance data for UK van builds.",
  openGraph: {
    title: "Webasto Air Top 2000 STC Guide | Amplios",
    description: "Technical specifications and performance data for the Webasto Air Top range.",
    url: "https://amplios.co.uk/guides/webasto/air-top-evo-guide",
  },
};

const TOC = [
  { id: "intro", label: "Introduction" },
  { id: "specs", label: "Technical Specifications" },
  { id: "fuel", label: "Fuel Consumption" },
  { id: "altitude", label: "Altitude Support" },
  { id: "controls", label: "Digital Controls" },
  { id: "summary", label: "Final Assessment" },
];

const SPECS = [
  { label: "Heat Output", value: "0.9 kW – 2.0 kW" },
  { label: "Fuel Consumption", value: "0.12 – 0.24 l/h" },
  { label: "Voltage", value: "12 V" },
  { label: "Power Draw (Heat)", value: "14 – 29 W" },
  { label: "Power Draw (Start)", value: "approx. 100 W" },
  { label: "Air Flow (max)", value: "93 m³/h" },
  { label: "Weight", value: "2.6 kg" },
  { label: "Dimensions (LxWxH)", value: "311 x 120 x 121 mm" },
];

const MENTIONED_PRODUCTS = [
  { name: "Webasto Air Top 2000 STC Kit", brand: "Webasto", price: 114500, slug: "webasto-air-top-2000-stc-diesel-heater-kit" },
  { name: "Webasto SmartControl Panel", brand: "Webasto", price: 14500, slug: "webasto-smartcontrol-digital-timer" },
];

export default function WebastoAirTopGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[50vh] bg-brand-carbon flex items-end pt-24 border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian to-transparent" />
        <div className="relative container mx-auto px-6 pb-16">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // PRODUCT DEEP DIVE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Webasto Air Top:<br />The Diesel Standard
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl leading-relaxed">
            Technical audit of the industry's most trusted diesel air heater. 
            Reliability, refinement, and real-world efficiency.
          </p>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col xl:flex-row gap-12">
          <div className="flex-1 min-w-0">

            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white mb-8 border-l-4 border-brand-orange pl-6">
                Introduction
              </h2>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  The Webasto Air Top 2000 STC is the "gold standard" for diesel heating in small to medium-sized vans. While Chinese alternatives exist at a fraction of the price, Webasto's German-engineered reliability and massive UK service network make it the choice for professional converters.
                </p>
                <p>
                  The unit operates by drawing diesel directly from the vehicle's fuel tank, passing it through a combustion chamber, and using a fan to blow warm air into the cabin. It is a completely self-contained system that requires no external gas supply.
                </p>
              </div>
            </section>

            {/* SPECS TABLE */}
            <section id="specs" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white mb-8 border-l-4 border-brand-orange pl-6">
                Technical Specifications
              </h2>
              <div className="grid md:grid-cols-2 gap-px bg-brand-border border border-brand-border">
                {SPECS.map((spec) => (
                  <div key={spec.label} className="bg-brand-carbon p-6 flex justify-between items-center group hover:bg-brand-obsidian transition-colors">
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{spec.label}</span>
                    <span className="font-display text-base text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FUEL CONSUMPTION */}
            <section id="fuel" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Flame className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Fuel Efficiency</h2>
              </div>
              <div className="bg-brand-carbon border border-brand-border p-8 border-l-4 border-brand-orange mb-8">
                <p className="font-sans text-brand-grey text-lg leading-relaxed mb-6">
                  One of the most common questions is: "Will it drain my fuel tank?" 
                </p>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  The answer is no. On its lowest setting, the Air Top 2000 STC consumes just **0.12 litres per hour**. Even if you ran it for 10 hours straight every night, you would only use 1.2 litres of diesel — barely a needle-move on a 70-litre Sprinter tank.
                </p>
              </div>
            </section>

            {/* ALTITUDE */}
            <section id="altitude" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Gauge className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Automatic Altitude Support</h2>
              </div>
              <div className="space-y-4 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  Diesel heaters often struggle at high altitudes (above 1,500m) because the air is thinner, leading to a "rich" fuel mix that causes carbon buildup (sooting).
                </p>
                <p>
                  The modern STC range features integrated altitude sensors. When the system detects a drop in air pressure, it automatically reduces the fuel flow to maintain the perfect combustion ratio, ensuring clean operation up to **2,200m**.
                </p>
              </div>
            </section>

            {/* CONTROLS */}
            <section id="controls" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Thermometer className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Digital Controls</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <p className="font-sans text-brand-grey text-base leading-relaxed">
                    The **SmartControl** panel is the standard interface. It offers a high-resolution display and a simple rotary dial.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "7-day programmable timer",
                      "Ventilation mode (for summer)",
                      "Diagnostic error code display",
                      "Eco, Normal, and Boost modes",
                    ].map(item => (
                      <li key={item} className="flex items-center gap-3 font-sans text-sm text-brand-grey">
                        <CheckCircle className="w-4 h-4 text-brand-orange" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="aspect-video bg-brand-carbon border border-brand-border flex items-center justify-center p-10">
                   <div className="text-center">
                      <Settings className="w-12 h-12 text-brand-orange mx-auto mb-4" />
                      <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">Digital Interface</span>
                   </div>
                </div>
              </div>
            </section>

            {/* SUMMARY */}
            <section id="summary" className="mb-20 scroll-mt-28 pt-12 border-t border-brand-border">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white mb-6">
                Final Assessment
              </h2>
              <p className="font-sans text-brand-grey text-lg leading-relaxed mb-8 italic">
                "If you are building a van for year-round off-grid travel, the Webasto Air Top 2000 STC is the most reliable investment you can make for your comfort. It is refined, efficient, and holds its value better than any other heater."
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/store/product/webasto-air-top-2000-stc-diesel-heater-kit" className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
                  Buy Webasto Air Top
                </Link>
                <Link href="/guides/compare/truma-vs-webasto" className="border border-brand-border text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
                  vs Truma LPG Comparison
                </Link>
              </div>
            </section>

            {/* FOOTER COMPONENTS */}
            <div className="pt-12 border-t border-brand-border">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <div className="mt-20">
                <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 block">Continue Research</span>
                <div className="flex flex-wrap gap-6">
                  <Link href="/brands/webasto" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Webasto Brand Hub →</Link>
                  <Link href="/guides/webasto/air-top-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
                  <Link href="/guides/compare/truma-vs-webasto" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma vs Webasto →</Link>
                </div>
              </div>
            </div>
          </div>

          <WebastoSidebar items={TOC} currentPage="/guides/webasto/air-top-evo-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
