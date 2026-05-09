import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { TrumaSidebar } from "@/components/editorial/TrumaSidebar";
import { ArrowRight, Zap, ShieldCheck, Info, Flame, Moon } from "lucide-react";

export const metadata: Metadata = {
  title: "Truma VarioHeat Guide | Compact Van Heating | Amplios",
  description: "Explore the Truma VarioHeat Eco. The ultra-compact space heating solution for smaller campervan builds. Silent, efficient, and reliable.",
  openGraph: {
    title: "Truma VarioHeat Guide | Compact Van Heating",
    description: "The space-saving heating solution for small to medium van builds.",
    url: "https://amplios.co.uk/guides/truma/varioheat-guide",
    images: [{ url: "/images/truma/varioheat-hero.png" }],
  },
  alternates: { canonical: "https://amplios.co.uk/guides/truma/varioheat-guide" },
};

const TOC = [
  { id: "intro", label: "What is VarioHeat?" },
  { id: "benefits", label: "Key Benefits" },
  { id: "modes", label: "Operating Modes" },
  { id: "comparison", label: "VarioHeat vs Combi" },
  { id: "sizing", label: "Is it right for you?" },
];

const MENTIONED_PRODUCTS = [
  { name: "Truma VarioHeat Eco", brand: "Truma", price: 99500, slug: "truma-varioheat-eco-compact-gas-heater" },
  { name: "Truma iNet X Panel", brand: "Truma", price: 24500, slug: "truma-inet-x-central-control-panel" },
  { name: "Autoterm Air 2D Kit", brand: "Autoterm", price: 52000, slug: "autoterm-air-2d-diesel-heater-kit" },
];

export default function TrumaVarioHeatGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/truma/varioheat-hero.png"
            alt="Truma VarioHeat compact unit"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // PRODUCT GUIDE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Truma VarioHeat:<br />Compact Efficiency
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            The ultra-lightweight, space-saving heating solution for small to medium van builds where hot water isn't a priority.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                What is the Truma VarioHeat?
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The VarioHeat is Truma's modern, lightweight LPG space heater. Unlike the Combi range, the 
                  VarioHeat is purely a space heater — it does not heat water. This makes it significantly 
                  smaller, lighter, and easier to install in compact van conversions like VW Transporters, 
                  Ford Transits, or even micro-campers.
                </p>
                <p>
                  It features a sophisticated electronic control system that allows for extremely fine 
                  temperature management and near-silent operation, making it a premium alternative to 
                  cheaper diesel heaters.
                </p>
              </div>
            </section>

            {/* BENEFITS */}
            <section id="benefits" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Key Benefits
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  { title: "Lightweight", desc: "At only 5.1kg, it's one of the lightest heaters on the market." },
                  { title: "Quiet", desc: "Brushless motor and optimized airflow for minimal noise." },
                  { title: "Efficient", desc: "Over 90% efficiency rating for LPG gas consumption." },
                  { title: "Flexible", desc: "Can be installed horizontally or vertically in tight spaces." },
                ].map((b) => (
                  <div key={b.title} className="p-6 bg-brand-carbon border border-brand-border">
                    <h3 className="font-display text-sm text-brand-white uppercase mb-2">{b.title}</h3>
                    <p className="font-sans text-brand-grey text-xs leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* MODES */}
            <section id="modes" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Moon className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Night Mode & Boost
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The VarioHeat features two distinct power levels: **Eco** (1300W) and **Boost** (2800W). 
                  The Eco mode is specifically designed for maintaining temperature overnight with 
                  virtually no fan noise, while Boost mode quickly warms up a cold van in minutes.
                </p>
                <div className="p-6 bg-brand-orange/5 border-l-4 border-brand-orange mt-6">
                  <p className="font-sans text-brand-grey text-sm italic leading-relaxed">
                    "The Night Mode is a game-changer for light sleepers. It's so quiet you'll often forget it's running."
                  </p>
                </div>
              </div>
            </section>

            {/* COMPARISON */}
            <section id="comparison" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                VarioHeat vs Combi 4E
              </h2>
              <div className="bg-brand-carbon border border-brand-border overflow-hidden mb-8">
                <table className="w-full text-left font-sans text-sm">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-obsidian">
                      <th className="p-4 font-display uppercase tracking-widest text-brand-orange text-[10px]">Feature</th>
                      <th className="p-4 font-display uppercase tracking-widest text-brand-white text-[10px]">VarioHeat Eco</th>
                      <th className="p-4 font-display uppercase tracking-widest text-brand-white text-[10px]">Combi 4E</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-brand-grey">
                    <tr>
                      <td className="p-4 font-medium text-brand-white">Primary Fuel</td>
                      <td className="p-4">LPG Gas Only</td>
                      <td className="p-4">LPG + 230V Electric</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-brand-white">Hot Water?</td>
                      <td className="p-4">No</td>
                      <td className="p-4">Yes (10L)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-brand-white">Weight</td>
                      <td className="p-4">5.1kg</td>
                      <td className="p-4">15.5kg</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-brand-white">Installation Space</td>
                      <td className="p-4">Very Small</td>
                      <td className="p-4">Medium/Large</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SIZING */}
            <section id="sizing" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Is it right for you?
              </h2>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The VarioHeat is the perfect choice for:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Small van conversions (SWB Transporters, etc.) where space is at a premium.</li>
                  <li>Builders who use a separate solution for hot water (e.g., an external shower or kettle).</li>
                  <li>Anyone looking for the quietest possible gas heating solution.</li>
                </ul>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/truma" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma Brand Hub →</Link>
                <Link href="/guides/truma/combi-4e-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Combi 4E Guide →</Link>
                <Link href="/guides/compare/truma-vs-chinese-diesel-heater" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma vs Chinese Diesel →</Link>
              </div>
            </div>

          </div>

          <TrumaSidebar items={TOC} currentPage="/guides/truma/varioheat-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
