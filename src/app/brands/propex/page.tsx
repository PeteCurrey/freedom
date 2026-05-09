import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Shield, Zap, Flame, Droplets, CheckCircle, Gauge, Thermometer } from "lucide-react";

export const metadata: Metadata = {
  title: "Propex UK | Authorised Dealer | LPG Gas Heating | Amplios",
  description: "Propex Heating and Leisure are the UK's leading manufacturer of LPG air heaters. Explore the HS2000 and HS2800 ranges for clean, dry heat.",
  openGraph: {
    title: "Propex UK | Authorised Dealer | Amplios",
    description: "Explore the Propex HS2000 and HS2800 LPG heaters. UK made, reliable, and efficient.",
    url: "https://amplios.co.uk/brands/propex",
  },
  alternates: { canonical: "https://amplios.co.uk/brands/propex" },
};

const STATS = [
  { value: "UK", label: "Made in Britain" },
  { value: "LPG", label: "Clean Combustion" },
  { value: "30 YR", label: "Heritage" },
  { value: "5.9A", label: "Start-up Draw" },
];

const WHY_PROPEX = [
  {
    icon: Flame,
    title: "Clean Heat",
    body: "Unlike diesel heaters, Propex LPG heaters produce a dry, clean heat that is virtually free from the carbon buildup issues common to diesel burners.",
  },
  {
    icon: Shield,
    title: "Minimal Maintenance",
    body: "LPG is a cleaner fuel. A Propex heater can run for years without requiring a service or 'decoke', making it the reliable choice for occasional users.",
  },
  {
    icon: Zap,
    title: "Low Battery Impact",
    body: "With a very low electrical draw (approx 1.4A when running), a Propex heater won't drain your leisure battery even during long winter nights.",
  },
  {
    icon: Gauge,
    title: "Safety First",
    body: "Integrated gas safety shut-off and high-limit switches ensure that the unit operates safely in all conditions, compliant with R67 and BS EN 1949.",
  },
  {
    icon: Thermometer,
    title: "Silent Operation",
    body: "The HS2000 uses a high-efficiency centrifugal fan that is significantly quieter than many diesel alternatives, especially at low speeds.",
  },
];

const PRODUCT_RANGE = [
  {
    name: "HS2000 Heatsource",
    desc: "The industry standard for small to medium campervans. Compact and reliable.",
    href: "/store/heating-climate?sub=gas-heaters",
  },
  {
    name: "HS2800 Heatsource",
    desc: "High-output 2.8kW model for larger motorhomes and coach-built vehicles.",
    href: "/store/heating-climate?sub=gas-heaters",
  },
  {
    name: "HS2000E (Electric)",
    desc: "Dual-fuel model that can run on 230V mains hookup or LPG gas.",
    href: "/store/heating-climate?sub=gas-heaters",
  },
  {
    name: "Malaga Water Heaters",
    desc: "High-capacity gas and electric storage water heaters for full off-grid showering.",
    href: "/store/water-plumbing?sub=water-heaters",
  },
  {
    name: "Thermostat Controls",
    desc: "Genuine Propex digital and analogue thermostats for precise climate control.",
    href: "/store/heating-climate?sub=accessories",
  },
];

const MENTIONED_PRODUCTS = [
  { name: "Propex HS2000 Heatsource Kit", brand: "Propex", price: 54500, slug: "propex-hs2000-gas-heater-kit" },
  { name: "Propex HS2800 Heatsource", brand: "Propex", price: 69500, slug: "propex-hs2800-gas-heater" },
  { name: "Propex Digital Thermostat", brand: "Propex", price: 8500, slug: "propex-digital-thermostat" },
];

export default function PropexBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 bg-brand-carbon">
          <Image
            src="/images/cat-climate.png" // Placeholder
            alt="Propex LPG heating solutions"
            fill
            className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-obsidian via-brand-obsidian/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/80 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 pb-20 pt-40">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // BRITISH ENGINEERING
          </span>
          <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            PROPEX <span className="text-brand-orange">HEATING</span>
          </h1>
          <p className="font-display text-xl lg:text-2xl text-brand-grey italic mb-2">
            Clean. Efficient. British Made.
          </p>
          <p className="font-sans text-brand-grey/80 text-base mb-8 max-w-xl">
            The legendary HS2000 range has provided warmth to generations of UK campers. Reliable LPG heating that just works, year after year.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/store/heating-climate"
              className="inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold"
            >
              Shop Propex Range <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/guides/propex/hs2000-gas-heating-guide"
              className="inline-flex items-center gap-3 border border-brand-border text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all font-bold"
            >
              Technical Guides
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO 2-COL */}
      <section className="py-20 border-t border-brand-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">
                // THE GAS ALTERNATIVE
              </span>
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-6">
                Why LPG makes sense for your build
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  While diesel heaters have grown in popularity, Propex LPG heaters remain the gold standard for many professional converters. By using the same gas supply as your hob and oven, you simplify your fuel management and benefit from a significantly cleaner combustion process.
                </p>
                <p>
                  Propex units are designed and manufactured right here in the UK. This means technical support is only a phone call away, and spare parts are readily available. For those building a van for weekend use or shorter trips, the lower maintenance requirements of gas heating often outweigh the convenience of diesel.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-brand-carbon border border-brand-border p-6 flex flex-col items-center justify-center text-center group hover:border-brand-orange transition-colors">
                  <span className="font-display text-4xl text-brand-orange mb-2 group-hover:scale-110 transition-transform">{stat.value}</span>
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY PROPEX GRID */}
      <section className="py-20 bg-brand-carbon border-y border-brand-border">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">
              // ENGINEERING ADVANTAGE
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
              The Propex Difference
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_PROPEX.map((item) => (
              <div key={item.title} className="bg-brand-obsidian border border-brand-border p-6 hover:border-brand-orange/40 transition-colors">
                <item.icon className="w-6 h-6 text-brand-orange mb-4" />
                <h3 className="font-display text-sm uppercase tracking-tight text-brand-white mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
            {/* Guide Cross-link */}
            <div className="bg-brand-obsidian border border-brand-orange/40 p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-2 block">Decision Support</span>
                <h3 className="font-display text-sm uppercase tracking-tight text-brand-white mb-3">
                  Gas vs Diesel
                </h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  Confused between a Propex and a Webasto? We break down the costs, noise levels, and installation complexity of both systems.
                </p>
              </div>
              <Link href="/guides/compare/truma-vs-chinese-diesel" className="inline-flex items-center gap-2 mt-4 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                Read the comparison <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE GRID */}
      <section className="py-20 border-b border-brand-border">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">
              // THE HEATING ECOSYSTEM
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
              Shop by Propex category
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCT_RANGE.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex items-start gap-4 p-5 bg-brand-carbon border border-brand-border hover:border-brand-orange transition-all"
              >
                <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-sm uppercase tracking-tight text-brand-white group-hover:text-brand-orange transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-brand-grey text-[12px] leading-relaxed">{cat.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-grey/30 group-hover:text-brand-orange ml-auto flex-shrink-0 mt-0.5 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter text-white mb-8">
            British Made <span className="text-brand-orange italic">Warmth.</span>
          </h2>
          <p className="font-sans text-brand-grey text-xl max-w-2xl mx-auto mb-12">
            Experience the reliability of clean LPG heating. Trusted by UK van builders for over 30 years.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/store/heating-climate" className="bg-brand-orange text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold shadow-2xl">
              Browse All Propex
            </Link>
            <Link href="/planner" className="border border-brand-border text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
              AI Build Planner
            </Link>
          </div>

          <div className="mt-24">
            <RelatedProducts products={MENTIONED_PRODUCTS} />
            
            <div className="mt-20 flex flex-wrap justify-center gap-8">
              <Link href="/guides/propex/hs2000-gas-heating-guide" className="font-mono text-[10px] text-brand-grey hover:text-brand-orange uppercase tracking-widest transition-colors flex items-center gap-2">
                HS2000 Product Guide <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/guides/propex/hs2000-installation" className="font-mono text-[10px] text-brand-grey hover:text-brand-orange uppercase tracking-widest transition-colors flex items-center gap-2">
                Installation Guide <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
