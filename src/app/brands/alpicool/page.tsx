import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { AlpicoolSidebar } from "@/components/editorial/AlpicoolSidebar";
import { ArrowRight, Snowflake, Zap, ShieldCheck, Gauge, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Alpicool Fridge UK | Value Compressor Refrigeration | Amplios",
  description: "Alpicool is the global leader in value-driven compressor fridges. Reliable cooling for van life at an accessible price point. UK technical support.",
  openGraph: {
    title: "Alpicool Fridge UK | Value Compressor Refrigeration",
    description: "Cold beers, fresh food, budget-friendly. The Alpicool range.",
    url: "https://amplios.co.uk/brands/alpicool",
  },
  alternates: { canonical: "https://amplios.co.uk/brands/alpicool" },
};

const TOC = [
  { id: "intro", label: "Value Refrigeration" },
  { id: "c-series", label: "C-Series Classics" },
  { id: "k-series", label: "K-Series Rugged" },
  { id: "compressor", label: "Compressor Efficiency" },
  { id: "why-alpicool", label: "The Alpicool Choice" },
  { id: "shop", label: "Shop Alpicool" },
];

const MENTIONED_PRODUCTS = [
  { name: "Alpicool C20 Fridge", brand: "Alpicool", price: 18500, slug: "alpicool-c20-portable-compressor-fridge-20l" },
  { name: "Alpicool K25 Fridge", brand: "Alpicool", price: 21500, slug: "alpicool-k25-portable-compressor-fridge-25l" },
  { name: "Alpicool T50 Dual Zone", brand: "Alpicool", price: 34500, slug: "alpicool-t50-dual-zone-compressor-fridge" },
];

export default function AlpicoolBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-kitchen.png" // Placeholder
            alt="Alpicool Fridge"
            fill
            className="object-cover opacity-40 grayscale-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // AFFORDABLE COMPRESSOR COOLING
            </span>
            <h1 className="font-display text-5xl lg:text-8xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-8">
              ALPICOOL:<br /><span className="text-brand-orange">COLD</span><br />VALUE
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              The disruptor in mobile refrigeration. Alpicool brings high-efficiency 
              compressor cooling to everyone, proving you don't need to spend 
              £800 to keep your milk fresh on the road.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-24 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
                Reliable Value Cooling
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
                <p>
                  For years, compressor fridges were a luxury item in van conversions. 
                  **Alpicool** changed that. By focusing on essential cooling 
                  performance and eliminating unnecessary frills, they've created a 
                  range of fridges that perform remarkably well at a fraction of 
                  the price of the "big names."
                </p>
                <p>
                  Whether you're looking for a small 20L unit for a weekend 
                  camper or a large dual-zone freezer for an expedition vehicle, 
                  Alpicool offers a solution that balances cost, power draw, and 
                  durability.
                </p>
              </div>
            </section>

            {/* C-SERIES */}
            <section id="c-series" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Snowflake className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  C-Series Classics
                </h2>
              </div>
              <div className="bg-brand-carbon border border-brand-border p-10 flex flex-col lg:flex-row gap-10 items-center">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="font-display text-2xl uppercase text-brand-white mb-4">The C20 Workhorse</h3>
                  <p className="font-sans text-brand-grey text-base leading-relaxed mb-8">
                    The C20 is the most popular choice for small van conversions. 
                    Compact, lightweight, and capable of reaching -20°C. It fits 
                    perfectly in the base of a wardrobe or under a bench seat.
                  </p>
                  <Link href="/guides/alpicool/c20-fridge-review" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                    C20 Review <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="w-full lg:w-1/3 aspect-square bg-brand-obsidian border border-brand-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">C20 Visual</span>
                </div>
              </div>
            </section>

            {/* K-SERIES */}
            <section id="k-series" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Gauge className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  K-Series Rugged
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-brand-carbon border border-brand-border p-8">
                  <h3 className="font-display text-xl uppercase text-brand-white mb-4">K25 Adventure</h3>
                  <p className="font-sans text-brand-grey text-sm mb-6 leading-relaxed">
                    The K-Series features a more rugged outer shell and improved 
                    insulation. The K25 is the perfect middle ground between 
                    portability and capacity.
                  </p>
                </div>
                <div className="bg-brand-carbon border border-brand-border p-8">
                  <h3 className="font-display text-xl uppercase text-brand-white mb-4">Fast Cooling</h3>
                  <p className="font-sans text-brand-grey text-sm mb-6 leading-relaxed">
                    Alpicool's latest compressors feature an 'Eco' and 'Max' mode, 
                    allowing for rapid pull-down of temperatures when you first 
                    load the fridge.
                  </p>
                </div>
              </div>
            </section>

            {/* COMPRESSOR */}
            <section id="compressor" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Zap className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  Power Efficiency
                </h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed max-w-3xl">
                <p>
                  One of the biggest surprises with Alpicool is its electrical efficiency. 
                  In 'Eco' mode, a C20 draws on average only **0.8 - 1.2 Amps** 
                  per hour (at 25°C ambient). This makes it highly compatible with 
                  small solar setups and standard 100Ah lead-acid or lithium batteries.
                </p>
              </div>
            </section>

            {/* WHY ALPICOOL */}
            <section id="why-alpicool" className="mb-24 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10">
                The Alpicool Advantage
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Price-to-Performance", desc: "Unbeatable value for money. Professional compressor cooling for under £200." },
                  { title: "App Control", desc: "Most models feature Bluetooth connectivity for temperature monitoring via your phone." },
                  { title: "3-Stage Protection", desc: "Built-in battery protection ensures the fridge won't drain your starter battery." },
                  { title: "Quiet Operation", desc: "Modern compressors run at <45dB, quieter than many domestic fridges." },
                ].map((item) => (
                  <div key={item.title} className="p-6 border border-brand-border bg-brand-carbon/50">
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="w-5 h-5 text-brand-orange" />
                      <h3 className="font-display text-sm uppercase tracking-widest text-brand-white">{item.title}</h3>
                    </div>
                    <p className="font-sans text-brand-grey text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/guides/alpicool/c20-fridge-review" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">C20 Review →</Link>
                <Link href="/guides/alpicool/fridge-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <AlpicoolSidebar items={TOC} currentPage="/brands/alpicool" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
