import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { TrumaSidebar } from "@/components/editorial/TrumaSidebar";
import { ArrowRight, Flame, Droplets, Smartphone, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Truma Heating Systems UK | Combi 4E, 6E & VarioHeat | Amplios",
  description: "Truma is the gold standard for UK van heating. Explore the Truma Combi and VarioHeat ranges. Authorised UK stockist with technical support.",
  openGraph: {
    title: "Truma Heating Systems UK | Combi 4E, 6E & VarioHeat",
    description: "The motorhome standard for heating and hot water. Explore the full Truma range at Amplios.",
    url: "https://amplios.co.uk/brands/truma",
    images: [{ url: "/images/truma/brand-hero.png" }],
  },
  alternates: { canonical: "https://amplios.co.uk/brands/truma" },
};

const TOC = [
  { id: "intro", label: "The motorhome standard" },
  { id: "combi", label: "Truma Combi Range" },
  { id: "varioheat", label: "Truma VarioHeat" },
  { id: "control", label: "Smart Control: iNet X" },
  { id: "why-truma", label: "Why choose Truma?" },
  { id: "shop", label: "Shop Truma" },
];

const MENTIONED_PRODUCTS = [
  { name: "Truma Combi 4E Kit", brand: "Truma", price: 184500, slug: "truma-combi-4e-lpg-electric-air-water-heater" },
  { name: "Truma VarioHeat Eco", brand: "Truma", price: 99500, slug: "truma-varioheat-eco-compact-gas-heater" },
  { name: "Truma iNet X Panel", brand: "Truma", price: 24500, slug: "truma-inet-x-central-control-panel" },
];

export default function TrumaBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/truma/brand-hero.png"
            alt="Premium campervan interior with Truma heating"
            fill
            className="object-cover opacity-50 grayscale-[0.2]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-obsidian/80 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // AUTHORISED UK STOCKIST
            </span>
            <h1 className="font-display text-5xl lg:text-8xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-8">
              TRUMA:<br /><span className="text-brand-orange">THE HEATING</span><br />STANDARD
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Since 1949, Truma has been the heating system of choice for European motorhome manufacturers. 
              Reliable, quiet, and engineered for the extremes.
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
                Engineering comfort since 1949
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
                <p>
                  Truma is more than just a heating brand; it is the benchmark for comfort in the leisure vehicle industry. 
                  Based in Putzbrunn, Germany, Truma has spent over 70 years perfecting the art of climate control in 
                  confined spaces.
                </p>
                <p>
                  Their Combi system — combining space heating and hot water in a single compact unit — is fitted 
                  as standard by almost every premium motorhome manufacturer in Europe. For van builders, Truma 
                  represents a "fit and forget" level of reliability that budget alternatives simply cannot match.
                </p>
              </div>
            </section>

            {/* COMBI RANGE */}
            <section id="combi" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Flame className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  Truma Combi Range
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-brand-carbon border border-brand-border p-8">
                  <h3 className="font-display text-xl uppercase text-brand-white mb-4">Combi 4E</h3>
                  <p className="font-sans text-brand-grey text-sm mb-6 leading-relaxed">
                    The 4kW variant is ideal for small to medium van builds (MWB/LWB). It provides rapid cabin heating 
                    and 10 litres of hot water, operating on gas, electricity, or both simultaneously.
                  </p>
                  <Link href="/guides/truma/combi-4e-guide" className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                    View Guide <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="bg-brand-carbon border border-brand-border p-8">
                  <h3 className="font-display text-xl uppercase text-brand-white mb-4">Combi 6E</h3>
                  <p className="font-sans text-brand-grey text-sm mb-6 leading-relaxed">
                    Designed for large expedition vehicles or long-wheelbase vans with high insulation requirements. 
                    6kW of power ensures warmth even in sub-zero alpine conditions.
                  </p>
                  <Link href="/guides/truma/combi-4e-guide" className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                    View Guide <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>

            {/* VARIOHEAT */}
            <section id="varioheat" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Zap className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  Truma VarioHeat
                </h2>
              </div>
              <div className="bg-brand-carbon border border-brand-border p-10 flex flex-col lg:flex-row gap-10 items-center">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="font-display text-2xl uppercase text-brand-white mb-4">Compact Space Heating</h3>
                  <p className="font-sans text-brand-grey text-base leading-relaxed mb-8">
                    The VarioHeat is the lightweight, space-saving alternative for builders who don't require 
                    integrated hot water. It's exceptionally quiet and features an 'Eco' mode for near-silent 
                    operation at night.
                  </p>
                  <Link href="/guides/truma/varioheat-guide" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                    VarioHeat Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="w-full lg:w-1/3 aspect-square bg-brand-obsidian border border-brand-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">VarioHeat Visual</span>
                </div>
              </div>
            </section>

            {/* INET X */}
            <section id="control" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Smartphone className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  Smart Control: iNet X
                </h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed max-w-3xl">
                <p>
                  The iNet X System is Truma's vision for the smart van. It allows you to control your heating, 
                  hot water, and air conditioning from a central touchscreen or via the Truma app on your phone. 
                  It's retrofit-compatible and provides detailed error diagnostics in plain English.
                </p>
                <Link href="/guides/truma/inet-x-review" className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                  Read the iNet X Review <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </section>

            {/* WHY TRUMA */}
            <section id="why-truma" className="mb-24 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10">
                Why choose Truma?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Service Network", desc: "The largest network of approved technicians in the UK and Europe." },
                  { title: "Warranty", desc: "Up to 5 years parts and labour warranty when installed by an authorised partner." },
                  { title: "Resale Value", desc: "Vans with Truma systems command a premium on the resale market." },
                  { title: "Quiet Operation", desc: "Significantly quieter than budget diesel heaters, perfect for wild camping." },
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
                <Link href="/guides/compare/truma-vs-webasto" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma vs Webasto →</Link>
                <Link href="/guides/truma/combi-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
                <Link href="/guides/compare/truma-vs-chinese-diesel-heater" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma vs Chinese Diesel →</Link>
              </div>
            </div>

          </div>

          <TrumaSidebar items={TOC} currentPage="/brands/truma" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
